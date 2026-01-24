'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function SignOutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
    };

    return (
        <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-white transition-colors"
        >
            Sign out
        </button>
    );
}
