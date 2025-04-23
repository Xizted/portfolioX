import { createClientServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'


export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClientServer()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  return children
}