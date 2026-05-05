import { AddTodoForm } from './components/add-todo-form';
import { TodoItem } from './components/todo-item';
import { SignOutButton } from './components/signOutButton';
import { createClient } from './lib/server';

export default async function HomePage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: todos } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">My Todos</h1>
                        <p className="text-gray-600">Logged in as: {user?.email}</p>
                    </div>

                    <SignOutButton />
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