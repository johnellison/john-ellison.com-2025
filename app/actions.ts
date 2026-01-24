'use server';

import { saveSubscriber } from '@/lib/supabase';

export async function subscribe(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const source = (formData.get('source') as string) || 'footer';

    if (!email || !email.includes('@')) {
        return { success: false, message: 'Please enter a valid email address.' };
    }

    const result = await saveSubscriber(email, source);

    if (result.success) {
        return { success: true, message: 'Thanks for subscribing!' };
    } else {
        // Determine if it was a duplicate (which we treat as success visually but log differently?)
        // Actually upsert treats it as success.
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}
