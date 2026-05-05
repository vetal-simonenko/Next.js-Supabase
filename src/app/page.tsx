import { AddTodoForm } from './components/add-todo-form';
import { TodoItem } from './components/todo-item';

export default async function HomePage() {
  const todos: any[] = [];
  const user = { email: 'TODO' }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Todos</h1>
            <p className="text-gray-600">Logged in as: {user.email}</p>
          </div>
          <form>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Sign Out
            </button>
          </form>
        </div>

        <AddTodoForm />

        <div className="space-y-2">
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">
              No todos yet. Add one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
