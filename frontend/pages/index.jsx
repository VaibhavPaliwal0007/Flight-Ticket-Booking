import { Inter } from 'next/font/google'

import SignInForm from '@/components/auth/SignInForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
       <SignInForm/>
  )
}
