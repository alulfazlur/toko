import { useTranslations } from "next-intl";
import { LinkButton } from "@/components/shared/link-button"
import { Link } from "@/i18n/navigation"
import { LocaleSwitcher } from "./locale-switcher";

export const SiteHeader = () => {
    const t = useTranslations("Header");
    return (
        <header className="border-b">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="text-lg font-semibold">
                    {t("home")}
                </Link>
                <div className="flex items-center gap-2">
                    <LinkButton href="/cart" variant="ghost">
                        {t("cart")}
                    </LinkButton>
                    <LocaleSwitcher />
                </div>
            </nav>
        </header>
    )
}