

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const Promo = () => {
    const t = useTranslations('Promo');
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-2">
                <div className="flex items-center gap-x-2">
                    <Image
                        src="/unlimited.svg"
                        alt="Pro"
                        height={26}
                        width={26}
                    />
                    <h3 className="font-bold text-lg">
                        {t('title')}
                    </h3>
                </div>
                <p className="text-muted-foreground">
                    {t('description')}
                </p>
            </div>
            <Button asChild variant="super" className="w-full hover:animate-pulse" size="lg">
                <Link href="/shop">
                    {t('button')}
                </Link>
            </Button>
        </div>
    )
}