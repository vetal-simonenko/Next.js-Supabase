'use client';

import { useOptimistic, useTransition } from 'react';
import { deleteTodo, toggleTodo } from '@/app/actions/todos';

type TodoItemProps = {
  id: string;
  title: string;
  completed: boolean;
};

export function TodoItem({ id, title, completed }: TodoItemProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticCompleted, updateOptimisticCompleted] =
      useOptimistic(completed);

  function handleDeleteTodo() {
    startTransition(async () => {
      await deleteTodo(id);
    });
  }

  function handleToggleTodo() {
    startTransition(async () => {
      updateOptimisticCompleted(!optimisticCompleted);
      await toggleTodo(id);
    });
  }

  return (
      <div
          className={`flex items-center gap-3 p-4 bg-gray-600 border border-gray-800 rounded-md transition-opacity ${
              isPending ? 'opacity-50' : 'opacity-100'
          }`}
      >
        <button
            type="button"
            onClick={handleToggleTodo}
            className="flex-shrink-0"
            disabled={isPending}
        >
          <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  optimisticCompleted
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
              }`}
          >
            {optimisticCompleted && (
                <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                  />
                </svg>
            )}
          </div>
        </button>

        <span
            className={`flex-1 transition-all ${
                optimisticCompleted ? 'line-through text-gray-400' : ''
            }`}
        >
        {title}
      </span>

        <button
            type="button"
            onClick={handleDeleteTodo}
            className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
            disabled={isPending}
        >
          Delete
        </button>
      </div>
  );
}