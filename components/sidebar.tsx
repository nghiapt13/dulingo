import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SideBarItem } from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import { Loader } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/admin";
import { Separator } from "./ui/separator";
import { CalendarIcon } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { getTranslations } from "next-intl/server";

type Props = {
    className?: string;
};

export const Sidebar = async ({ className }: Props) => {
    const user = await currentUser();
    const t = await getTranslations('SidebarItem');
    return (
        <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image
                        src="/mascot.svg"
                        height={40}
                        width={40}
                        alt="Mascot"
                    />
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Dulingo</h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SideBarItem label={t('learn')} href="/learn" iconSrc="/learn.svg" />
                <SideBarItem label={t('leaderboard')} href="/leaderboard" iconSrc="/leaderboard.svg" />
                <SideBarItem label={t('quest')} href="/quests" iconSrc="/quests.svg" />
                <SideBarItem label={t('shop')} href="/shop" iconSrc="/shop.svg" />
                {isAdmin() && (
                    <SideBarItem label={t('admin')} href="/admin" iconSrc="/admin.svg" />
                )}

            </div>
            <div className="flex items-center justify-center gap-x-2 mb-2">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton
                        appearance={{
                            elements: {
                                userButtonPopoverCard: {
                                    pointerEvents: "initial",
                                    width: "300px",
                                },
                                userButtonAvatarBox: {
                                    height: "40px",
                                    width: "40px",
                                },
                            },
                        }}
                    />
                    <div className="flex flex-col w-full p-2">
                        <span className="text-sm font-bold">
                            {user?.fullName || "User"}
                        </span>
                        <span className="text-xs font-semibold">
                            {user?.primaryEmailAddress?.emailAddress}
                        </span>
                    </div>
                </ClerkLoaded>
            </div>
            <Separator />
            <div className="flex flex-col items-center max-[380px]:text-xs text-sm lg:text-xs mb-4 pt-4 border-t-2">
                <p className="whitespace-nowrap justify-center flex items-center gap-1">
                    Made with
                    <Image
                        src="/heart.svg"
                        alt="Love"
                        height={15}
                        width={15}
                        className="inline mx-1"
                    />
                    by{" "}
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <p className="underline animate-pulse cursor-pointer">NghiaPT</p>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-25">
                            <div className="flex justify-between space-x-2">
                                <Avatar>
                                    <AvatarImage src="/6438.png" />
                                    <AvatarFallback>VC</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">Trung Nghia Pham</h4>
                                    <p className="text-sm">
                                        Freelance Web Developer.
                                    </p>
                                    <div className="flex items-center pt-2">
                                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                                        <span className="text-xs text-muted-foreground">
                                            Started coding since KelvinVo was gay.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </p>
            </div>
        </div>
    )
}