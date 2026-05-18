import { type NextAuthConfig, NextAuth } from '@zitadel/next-auth';
import Zitadel from '@auth/core/providers/zitadel';
import { randomUUID } from 'crypto';
import * as oidc from 'openid-client';
import type { JWT } from '@auth/core/jwt';
import { ZITADEL_SCOPES } from './scopes';

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
    async redirect({ baseUrl }) {
      const postLoginUrl = process.env.ZITADEL_POST_LOGIN_URL || '/profile';
      return postLoginUrl.startsWith('http')
        ? postLoginUrl
        : `${baseUrl}${postLoginUrl}`;
    },
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
    async session({ session, token }) {
      session.idToken = token.idToken;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};

export const { handlers, getSession } = NextAuth(authOptions);
