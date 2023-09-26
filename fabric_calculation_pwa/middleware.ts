import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const handler = (req: NextRequest) => {
  req.cookies.delete("NEXT_LOCALE")
  return createMiddleware({
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localeDetection: true,
  })(req)
}

export default handler

export const config= {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}