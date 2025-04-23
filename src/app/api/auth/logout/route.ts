// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { deleteCookie } from 'cookies-next';
import { createClientServer } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = await createClientServer();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        { message: 'Error during sign out', error: error.message },
        { status: 400 }
      );
    }

    deleteCookie('access_token', { path: '/' });

    return NextResponse.json(
      { message: 'Successfully logged out' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
