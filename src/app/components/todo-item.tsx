'use client';

type TodoItemProps = {
  id: string;
  title: string;
  completed: boolean;
};

export function TodoItem({ id, title, completed }: TodoItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-4 bg-gray-600 border border-gray-800 rounded-md transition-opacity opacity-100`}
    >
      <form>
        <button type="submit" className="flex-shrink-0">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors bg-blue-600 border-blue-600 ${
              completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
            }`}
          >
            {completed && (
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
      </form>

      <span
        className={`flex-1 transition-all ${
          completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {title}
      </span>

      <form>
        <button
          type="submit"
          className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
