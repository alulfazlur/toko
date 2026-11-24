"use client";

import { hasLocale, useLocale, useTranslations } from "next-intl";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing"

const LOCALE_LABELS: Record<Locale, string> = {
    "en": "English",
    "id": "Indonesia",
}

export const LocaleSwitcher = () => {
    const t = useTranslations("Header");
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter()

    const onChange = (value: string) => {
        if (!hasLocale(routing.locales, value)) {
            throw new Error(`Unknown locale: ${locale}`);
        }
        router.replace(pathname, { locale: value })
    }

    return (
        <NativeSelect
            aria-label={t("language")}
            value={locale}
            onChange={(e) => onChange(e.target.value)}
        >
            {routing.locales.map((value) => (
                <NativeSelectOption key={value} value={value}>
                    {LOCALE_LABELS[value]}
                </NativeSelectOption>
            ))}
        </NativeSelect>
    );
};
