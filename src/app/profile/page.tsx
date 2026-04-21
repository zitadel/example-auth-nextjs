'use client';

import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
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
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading your session…</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <main className="flex-1 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
                <p className="text-green-700 mt-1">
                  You have successfully completed the PKCE authentication flow.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              🔐 OAuth 2.0 PKCE Flow Completed
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Congratulations! You have successfully completed the OAuth 2.0
              PKCE (Proof Key for Code Exchange) authentication flow. This
              demonstrates how modern applications securely authenticate users
              with Zitadel.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What is PKCE?
                </h2>
                <p className="text-gray-700 mb-4">
                  PKCE is a security extension to OAuth 2.0 that protects
                  against authorization code interception attacks. It&apos;s
                  especially important for public clients like single-page
                  applications and mobile apps.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Key Benefits:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
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
                      className="w-4 h-4 text-green-500 mr-2"
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
                      className="w-4 h-4 text-green-500 mr-2"
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Flow Steps Completed
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
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
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
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
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
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
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
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
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
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
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Session Information
            </h2>
            <p className="text-gray-600 mb-6">
              Below is the authentication data stored in your session after a
              successful PKCE flow:
            </p>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono leading-relaxed">
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
