import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Criticality - STEM Career Consulting',
  description: 'Reach criticality in your STEM career with personalized guidance, research opportunities, and academic transformation. From setbacks to success at national labs and PhD programs.',
  keywords: 'STEM consulting, career guidance, research opportunities, academic transformation, PhD preparation, national labs, Oak Ridge, NIST',
  authors: [{ name: 'Criticality STEM Consulting' }],
  creator: 'Criticality STEM Consulting',
  publisher: 'Criticality STEM Consulting',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://swansone4.github.io/tutoring'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Criticality - STEM Career Consulting',
    description: 'Reach criticality in your STEM career with personalized guidance and research opportunities.',
    url: 'https://swansone4.github.io/tutoring',
    siteName: 'Criticality',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Criticality STEM Career Consulting',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Criticality - STEM Career Consulting',
    description: 'Reach criticality in your STEM career with personalized guidance and research opportunities.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2c3e50" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-academic antialiased">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#2c3e50',
              color: '#fff',
              fontFamily: 'Times New Roman, serif',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
} 