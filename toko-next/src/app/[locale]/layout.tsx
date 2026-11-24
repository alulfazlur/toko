import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/site-header";
import { toLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import "../globals.css";

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
    const locale = toLocale((await params).locale);
    setRequestLocale(locale);

    return (
        <html lang={locale}>
            <body className="min-h-screen bg-background text-foreground antialiased">
                <NextIntlClientProvider>
                    <SiteHeader />
                    <main className="mx-auto max-w-6xl px-4 py-8">
                        {children}
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
