'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/app/lib/server';

export async function createTodo(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const title = formData.get('title') as string;

    if (!title.trim()) {
        return { error: 'Title is required' };
    }

    const { error } = await supabase.from('todos').insert({
        title,
        user_id: user.id,
        completed: false,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/');

    return { success: true };
}

export async function toggleTodo(id: string) {
    const supabase = await createClient();

    const { data: todo } = await supabase
        .from('todos')
        .select('completed')
        .eq('id', id)
        .single();

    if (!todo) {
        return { error: 'Todo not found' };
    }

    const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/');
    return { success: true };
}

export async function deleteTodo(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/');
    return { success: true };
}