'use client';

import { useActionState, useEffect, useRef, useTransition } from 'react';
import { createTodo } from '@/app/actions/todos';

const initialState = { error: '' };

export function AddTodoForm() {
  const [state, formAction] = useActionState(createTodo, initialState);
  const [isPending, startTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await formAction(formData);
    });
  }

  return (
      <form ref={formRef} className="mb-8" action={handleSubmit}>
        <div className="flex gap-2">
          <input
              name="title"
              type="text"
              placeholder="What needs to be done?"
              required
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 disabled:opacity-50"
              disabled={isPending}
          />
          <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isPending}
          >
            {isPending ? 'Adding' : 'Add'}
          </button>
        </div>
        {state?.error && (
            <div className="text-red-600 text-sm mt-2">{state.error}</div>
        )}
      </form>
  );
}