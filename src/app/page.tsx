// noinspection JSUnusedGlobalSymbols
'use client';

import { signIn } from '@zitadel/next-auth/react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header isAuthenticated={false} />
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h1 className="mb-6 text-4xl font-bold text-gray-900">
                PKCE Authentication Demo
              </h1>
              <p className="mb-8 text-xl text-gray-600">
                This application demonstrates a PKCE authentication flow with
                Zitadel. Perfect for learning OAuth 2.0 security patterns and
                integrating with your own application.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <svg
                      className="h-5 w-5 text-blue-600"
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
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                      Secure by Design
                    </h3>
                    <p className="text-gray-600">
                      PKCE prevents authorization code interception attacks
                      without requiring client secrets.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                      Standards Compliant
                    </h3>
                    <p className="text-gray-600">
                      Built on OAuth 2.0 and OpenID Connect specifications for
                      maximum compatibility.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
                    <svg
                      className="h-5 w-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                      Developer Friendly
                    </h3>
                    <p className="text-gray-600">
                      Quick to integrate with comprehensive documentation and
                      examples.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="rounded-lg border border-gray-200 bg-white p-8">
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-6 flex h-32 w-80 items-center justify-center rounded-lg bg-white">
                      <Image
                        src="/openid-logo.svg"
                        alt="OpenID"
                        width={288}
                        height={112}
                        className="h-28 w-72"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => signIn('zitadel')}
                    className="mb-6 flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700"
                  >
                    <svg
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Login</span>
                  </button>
                  <div className="text-center">
                    <p className="mb-4 text-sm text-gray-500">
                      What happens when you click the button:
                    </p>
                    <div className="space-y-2 text-left">
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                          1
                        </span>
                        Generate code verifier & challenge
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                          2
                        </span>
                        Redirect to Zitadel authorization
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                          3
                        </span>
                        Exchange code for tokens
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-600">
                          ✓
                        </span>
                        Access granted securely
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                    Powered by
                    <span className="font-semibold text-gray-700">Zitadel</span>
                    •
                    <a
                      href="https://zitadel.com/docs/guides/integrate/oauth-recommended-flows"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Learn more about PKCE
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
