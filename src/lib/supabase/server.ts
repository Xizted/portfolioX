import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClientServer() {
  const cookieStore = await cookies();

  const authToken = cookieStore.get('auth_token');
  if (!authToken) {
    console.warn('No auth token found in cookies');
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Retornar todas las cookies del cliente
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            // Establecer las cookies en el cliente
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            console.error('Error setting cookies:', error);
          }
        },
      },
    }
  );
}
