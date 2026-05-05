'use client';

import { useEffect, useRef } from 'react';

const initialState = { error: '', success: false };

export function AddTodoForm() {
  const state = initialState;
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} className="mb-8">
      <div className="flex gap-2">
        <input
          name="title"
          type="text"
          placeholder="What needs to be done?"
          required
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 disabled:opacity-50"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Add
        </button>
      </div>
      {state?.error && (
        <div className="text-red-600 text-sm mt-2">{state.error}</div>
      )}
    </form>
  );
}
