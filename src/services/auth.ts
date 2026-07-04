import { supabase } from '../lib/supabaseClient'

export async function signUpStudent(
  name: string,
  email: string,
  password: string,
  branch: string,
  year: number
) {
  if (!email.endsWith('@igdtuw.ac.in')) {
    throw new Error('Please use your college email address')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  if (error) throw error
  const user = data.user
  if (!user) throw new Error('Signup failed')

  // insert into students table
  const { error: insertError } = await supabase.from('students').insert([
    {
      id: user.id,
      name,
      email,
      branch,
      year
    }
  ])
  if (insertError) throw insertError

  return user
}

export async function loginStudent(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data.user
}

export async function logoutStudent() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
