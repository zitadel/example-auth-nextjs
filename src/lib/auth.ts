import { type NextAuthConfig, NextAuth } from '@zitadel/next-auth';
import Zitadel from '@auth/core/providers/zitadel';
import { randomUUID } from 'crypto';
import * as oidc from 'openid-client';
import type { JWT } from '@auth/core/jwt';
import { ZITADEL_SCOPES } from './scopes';

/**
 * Automatically refreshes an expired access token using the refresh token.
 *
 * When a user's access token expires (typically after 1 hour), this function
 * seamlessly exchanges the refresh token for a new access token, allowing the
 * user to continue using the application without having to log in again.
 *
 * This is essential for maintaining long-lived sessions and preventing users
 * from being unexpectedly logged out during active use of the application.
 *
 * ## How Token Refresh Works
 *
 * 1. **Token Expiry Detection**: Auth.js automatically checks if the access token has expired
 * 2. **Refresh Request**: Uses the refresh token to request new tokens from ZITADEL
 * 3. **Token Update**: Updates the JWT with the new access token and expiry time
 * 4. **Seamless Experience**: User continues without interruption
 *
 * ## Error Handling
 *
 * If the refresh fails (e.g., refresh token expired, user permissions revoked),
 * the function sets an error flag that forces the user to sign in again.
 *
 * @param token - The current JWT containing the refresh token and other session data
 * @returns Promise resolving to updated JWT with new tokens or error state
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
  if (!token.refreshToken) {
    console.error('No refresh token available for refresh');
    return { ...token, error: 'RefreshAccessTokenError' };
  }
  try {
    const config = await oidc.discovery(
      new URL(process.env.ZITADEL_DOMAIN!),
      process.env.ZITADEL_CLIENT_ID!,
      process.env.ZITADEL_CLIENT_SECRET,
    );
    const tokenEndpointResponse = await oidc.refreshTokenGrant(
      config,
      token.refreshToken as string,
    );
    return {
      ...token,
      accessToken: tokenEndpointResponse.access_token,
      expiresAt: tokenEndpointResponse.expires_in
        ? Date.now() + tokenEndpointResponse.expires_in * 1000
        : Date.now() + 3600 * 1000,
      refreshToken: tokenEndpointResponse.refresh_token ?? token.refreshToken,
      error: undefined,
    };
  } catch (error) {
    console.error('Token refresh failed:', error);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}

/**
 * Constructs a secure logout URL for ZITADEL with CSRF protection.
 *
 * This function creates a proper logout URL that terminates the user's session
 * both in your application and in ZITADEL. It includes security measures to
 * prevent Cross-Site Request Forgery (CSRF) attacks during the logout process.
 *
 * ## Security Features
 *
 * - **State Parameter**: Random UUID for CSRF protection
 * - **ID Token Hint**: Tells ZITADEL which session to terminate
 * - **Post-Logout Redirect**: Where to send the user after logout
 *
 * ## Logout Flow
 *
 * 1. User clicks "logout" in your app
 * 2. Your app calls this function to get the logout URL
 * 3. User is redirected to ZITADEL's logout endpoint
 * 4. ZITADEL terminates the session and redirects back to your app
 * 5. Your app validates the state parameter for security
 *
 * @param idToken - The user's ID token from their current session (used to identify which session to terminate)
 * @returns Promise containing the logout URL to redirect to and state value for validation
 */
export async function buildLogoutUrl(
  idToken: string,
): Promise<{ url: string; state: string }> {
  const config = await oidc.discovery(
    new URL(process.env.ZITADEL_DOMAIN!),
    process.env.ZITADEL_CLIENT_ID!,
    process.env.ZITADEL_CLIENT_SECRET,
  );
  const state = randomUUID();
  const urlObj = oidc.buildEndSessionUrl(config, {
    id_token_hint: idToken,
    post_logout_redirect_uri: process.env.ZITADEL_POST_LOGOUT_URL!,
    state,
  });
  return { url: urlObj.toString(), state };
}

export const authOptions: NextAuthConfig = {
  providers: [
    Zitadel({
      issuer: process.env.ZITADEL_DOMAIN!,
      clientId: process.env.ZITADEL_CLIENT_ID!,
      clientSecret: process.env.ZITADEL_CLIENT_SECRET!,
      authorization: { params: { scope: ZITADEL_SCOPES } },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.SESSION_DURATION) || 3600,
  },
  secret: process.env.SESSION_SECRET,
  pages: { signIn: '/auth/login', error: '/auth/error' },
  callbacks: {
    /**
     * Controls where users are redirected after successful authentication.
     *
     * This callback runs after a user successfully signs in and determines
     * their destination. By default, Auth.js would redirect to the page they
     * came from, but this override ensures all users go to the profile page.
     *
     * @param baseUrl - Your application's base URL (e.g., https://yourdomain.com)
     * @returns The URL to redirect the user to after successful login
     */
    async redirect({ baseUrl }) {
      const postLoginUrl = process.env.ZITADEL_POST_LOGIN_URL || '/profile';
      return postLoginUrl.startsWith('http')
        ? postLoginUrl
        : `${baseUrl}${postLoginUrl}`;
    },
    /**
     * Manages JWT token lifecycle including storage and automatic refresh.
     *
     * This callback runs every time a JWT is accessed and handles:
     * 1. **Initial Login**: Stores tokens from the authentication provider
     * 2. **Token Expiry Check**: Determines if access token needs refreshing
     * 3. **Automatic Refresh**: Calls refresh function when token expires
     *
     * ## When This Runs
     * - Every time getSession() is called
     * - Before each authenticated API request
     *
     * ## Token Storage Strategy
     * - ID Token: Used for logout and user identification
     * - Access Token: Used for API calls to ZITADEL
     * - Refresh Token: Used to get new access tokens
     * - Expiry Time: Used to determine when refresh is needed
     *
     * @param token - Current JWT token object
     * @param account - Authentication provider data (only present on initial login)
     * @param user - User object (only present on initial login)
     * @returns Updated JWT token with fresh tokens or error state
     */
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          idToken: account.id_token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 3600 * 1000,
          error: undefined,
        };
      }
      if (Date.now() < (token.expiresAt as number)) return token;
      return refreshAccessToken(token);
    },
    /**
     * Shapes the session object that your application receives.
     *
     * This callback transforms the internal JWT token into the session object
     * that your application code can access via getSession().
     *
     *
     * ## Security Note
     *
     * Only include data in the session that your frontend needs. Sensitive
     * tokens like refresh tokens should NOT be exposed to the client.
     *
     *
     *
     * ## Available Data
     * - **idToken**: For logout functionality
     * - **accessToken**: For API calls (if needed on the client-side)
     * - **error**: To handle token refresh failures
     *
     * @param session - The base session object from Auth.js
     * @param token - The JWT token containing all stored data
     * @returns The session object that your application will receive
     */
    async session({ session, token }) {
      session.idToken = token.idToken;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};

export const { handlers, getSession, signInUrl, signOutUrl } =
  NextAuth(authOptions);
