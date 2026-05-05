'use client';
import { useActionState } from 'react';
import { signIn } from '@/app/actions/auth';

const initialState = { error: '' };

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(signIn, initialState);

    return (
        <form className="space-y-4" action={formAction}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>

            {state?.error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                    {state.error}
                </div>
            )}

            <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                disabled={isPending}
            >
                Sign In
            </button>
        </form>
    );
}