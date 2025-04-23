// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { setCookie } from 'cookies-next';
import { createClientServer } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClientServer();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (data?.session?.access_token) {
      setCookie('access_token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
    }

    return NextResponse.json({ message: 'Login successful', user: data.user });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
