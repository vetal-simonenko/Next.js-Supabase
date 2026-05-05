'use client';

import { useTransition } from 'react';
import { signOut } from '../actions/auth';

export function SignOutButton() {
    const [isPending, startTransition] = useTransition();

    function handleSignOut() {
        startTransition(async () => {
            await signOut();
        });
    }

    return (
        <button
            type="button"
            onClick={handleSignOut}
            disabled={isPending}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
            {isPending ? 'Signing out...' : 'Sign Out'}
        </button>
    );
}