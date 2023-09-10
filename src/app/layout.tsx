import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import NavBar from './components/navbar/navbar'

const poppins = Poppins(
  {
  subsets: ["latin"], 
  weight: ["100" , "200" , "300" , "400" , "500" , "600"], 
  variable: "--font-poppins"
  }
)

export const metadata: Metadata = {
  title: 'Box Office',
  description: 'Share your love for films and discover new ones to love'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" className={poppins.variable}>
      <body>
        <NavBar/>
          {children}
        </body>
    </html>
    </ClerkProvider>
  )
  }


