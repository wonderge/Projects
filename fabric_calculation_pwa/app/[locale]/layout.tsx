import { Metadata, Viewport } from "next"
import { ReactNode } from "react"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/globals.css';

export const viewport: Viewport = {
  themeColor: "#fff"
}

export const metadata: Metadata = {
  title: "FabricCalculation",
  description: "FabricCalculation app",
  icons: { icon: '/icon.ico' },
  manifest: "/manifest.json",
  other: { google: "notranslate" }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale()
  const messages = await getMessages()
  return (
    <html lang={locale} translate="no" className="notranslate">
      <body className="gray">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous" async></script>
      </body>
    </html>
  )
}
export default RootLayout