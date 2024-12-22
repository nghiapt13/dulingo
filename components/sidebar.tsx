import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SideBarItem } from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"
import { Loader } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
    className?: string;
};

export const Sidebar = async ({ className }: Props) => {
    const user = await currentUser();
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
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">DuoLingo</h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SideBarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
                <SideBarItem label="Leaderboard" href="/leaderboard" iconSrc="/leaderboard.svg" />
                <SideBarItem label="Quests" href="/quests" iconSrc="/quests.svg" />
                <SideBarItem label="Shop" href="/shop" iconSrc="/shop.svg" />
            </div>
            <div className="flex items-center justify-center gap-x-2 mb-4">
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
                            {user?.fullName || "Anon"}
                        </span>

                        <span className="text-xs font-semibold">
                            {user?.primaryEmailAddress?.emailAddress}
                        </span>
                    </div>
                </ClerkLoaded>
                {/* <div className="flex flex-col items-center max-[380px]:text-xs text-sm lg:text-xs mb-4 pt-4 border-t-2">
                    <p className="whitespace-nowrap justify-center flex items-center gap-1">
                        Made with
                        <Image
                            src="/heart.svg"
                            alt="Love"
                            height={10}
                            width={10}
                            className="animate-ping inline mx-1"
                        />
                        by{" "}
                        <span className="green-text-gradient font-black">
                            Trung Nghia Pham
                        </span>
                    </p>

                    <p className="whitespace-nowrap">
                        &copy; {new Date().getFullYear()}, All rights reserved.
                    </p>
                </div> */}
            </div>
        </div>
    )
}