// noinspection JSUnusedGlobalSymbols
'use client';

import { useEffect } from 'react';
import { signIn, useSession } from '@zitadel/next-auth/react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      void signIn('zitadel', { callbackUrl: '/profile' });
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading your session…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header isAuthenticated={true} />
      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-green-900">
                  Authentication Successful!
                </h2>
                <p className="mt-1 text-green-700">
                  You have successfully completed the PKCE authentication flow.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-8">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
              🔐 OAuth 2.0 PKCE Flow Completed
            </h1>
            <p className="mb-8 text-lg text-gray-700">
              Congratulations! You have successfully completed the OAuth 2.0
              PKCE (Proof Key for Code Exchange) authentication flow. This
              demonstrates how modern applications securely authenticate users
              with Zitadel.
            </p>
            <div className="mb-8 grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  What is PKCE?
                </h2>
                <p className="mb-4 text-gray-700">
                  PKCE is a security extension to OAuth 2.0 that protects
                  against authorization code interception attacks. It&apos;s
                  especially important for public clients like single-page
                  applications and mobile apps.
                </p>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Key Benefits:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    No client secret required
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Prevents code interception
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Dynamic security per flow
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Flow Steps Completed
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-semibold text-white">
                      ✓
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Code Verifier Generated
                      </div>
                      <div className="text-sm text-gray-600">
                        Random cryptographic string created
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-semibold text-white">
                      ✓
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Code Challenge Created
                      </div>
                      <div className="text-sm text-gray-600">
                        SHA256 hash of the verifier
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-semibold text-white">
                      ✓
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Authorization Request
                      </div>
                      <div className="text-sm text-gray-600">
                        Redirected to Zitadel with challenge
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-semibold text-white">
                      ✓
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        User Authentication
                      </div>
                      <div className="text-sm text-gray-600">
                        Successfully authenticated with Zitadel
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-semibold text-white">
                      ✓
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Token Exchange
                      </div>
                      <div className="text-sm text-gray-600">
                        Authorization code + verifier exchanged for tokens
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Session Information
            </h2>
            <p className="mb-6 text-gray-600">
              Below is the authentication data stored in your session after a
              successful PKCE flow:
            </p>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
              <pre className="font-mono text-sm leading-relaxed text-green-400">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
