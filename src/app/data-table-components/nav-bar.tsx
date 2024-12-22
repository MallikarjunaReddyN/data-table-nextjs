import Link from "next/link"
import { GitHubLogoIcon, TableIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {ModeToggle} from "@/app/data-table-components/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export function NavBar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className=" flex h-14 items-center">
                <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
                    <TableIcon className="size-4" aria-hidden="true" />
                    <span className="hidden font-bold md:inline-block">Data Table</span>
                </Link>
                <nav className="flex flex-1 gap-2 items-center md:justify-end">
                    <Button variant="ghost" size="icon" className="size-8" asChild>
                        <Link
                            aria-label="GitHub repo"
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubLogoIcon className="size-4" aria-hidden="true" />
                        </Link>
                    </Button>
                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/avatars/03.png" alt="@shadcn" />
                                    <AvatarFallback>SC</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">shadcn</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        m@example.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Profile
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Settings
                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Log out
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </div>
        </header>
    )
}