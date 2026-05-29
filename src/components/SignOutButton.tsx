import type { FC } from 'react';

// noinspection JSUnusedGlobalSymbols
export const SignOutButton: FC = () => (
  <form action="/api/auth/logout" method="POST">
    <button
      type="submit"
      className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-red-600"
    >
      Sign out
    </button>
  </form>
);
