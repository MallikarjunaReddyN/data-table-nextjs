import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "@radix-ui/react-icons";
import {categories, incomeType} from "@/app/data-table-components/data";

export function CreateNewDialog() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        size="sm"
                        className="ml-auto hidden h-8 lg:flex"
                    >
                        <PlusIcon className="mr-2 h-4 w-4" />
                        New
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create task</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to create a new task.
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    New
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Create task</DrawerTitle>
                    <DrawerDescription>
                        Fill in the details below to create a new task.
                    </DrawerDescription>
                </DrawerHeader>
                <ProfileForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="label">Label</Label>
                <Input type="email" id="label" defaultValue=""/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="note">Note</Label>
                <Input id="note" defaultValue=""/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Category"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {categories.map(category => (
                                <SelectItem
                                    key={category.value}
                                    value={category.value}
                                    className="capitalize"
                                >
                                    {category.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {incomeType.map(type => (
                                <SelectItem
                                    key={type.value}
                                    value={type.value}
                                    className="capitalize"
                                >
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" defaultValue=""/>
            </div>
            <Button type="submit">Save changes</Button>
        </form>
    )
}
