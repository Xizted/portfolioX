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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (data?.session?.access_token) {
      setCookie('access_token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
    }

    // Responder con los datos del usuario registrado
    return NextResponse.json({
      message: 'Registration successful',
      user: data.user,
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
