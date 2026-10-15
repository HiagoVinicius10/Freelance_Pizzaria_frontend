"use client"

import { LogOut, Menu, Package, ShoppingCart, Tags } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { logOutAction } from "@/actions/auth"

interface userNameProps{
    userName: string;
}


const menuItems = [
    {
        title: "Pedidos",
        href: "/dashboard",
        icon: ShoppingCart,
    },
    {
        title: "Produtos",
        href: "/dashboard/products",
        icon: Package,
    },
    {
        title: "categorias",
        href: "/dashboard/categories",
        icon: Tags,
    },
]

export function MobileSidebar({userName}: userNameProps){
    const pathName = usePathname();
    const [ open, setOpen ] = useState(false);


    return(
       <div className="lg:hidden">
            <header className="sticky top-0 z-50 border-b border-app-border bg-app-card ">
                <div className="h-16 flex items-center justify-center px-4">
                    
                <Sheet open={open} onOpenChange={setOpen} >
                    <SheetTrigger className="absolute left-6">
                        <Menu className="w-8 h-8  cursor-pointer hover:bg-white hover:text-black rounded duration-200 p-1"/>
                    </SheetTrigger>
                    
                <h2 className=" text-white font-bold text-2xl "> 
                    Pizzaria
                    <span className="text-brand-primary">
                        Cardoso
                    </span>
                </h2>

                <SheetContent 
                    side="left" 
                    className=" bg-app-sidebar border-app-border text-white"
                    >
                        <SheetHeader className=" border-b border-app-border"> 
                            <SheetTitle className="text-white mb-2 text-xl"> Menu </SheetTitle> 
                            <SheetDescription> Olá! { userName } </SheetDescription>
                        </SheetHeader>

                <nav className=" flex flex-col gap-2 p-4 ">
                    {menuItems.map((menuItems) => {
                    const Icon = menuItems.icon;
                    const isActive = pathName === menuItems.href
                    
                    return(
                        <Link
                         key={menuItems.title}
                         href={menuItems.href}
                         className={cn("text-white text-sm flex items-center gap-4 mt-3 font-medium rounded-md transition-colors duration-300 p-2", 
                            isActive ? "bg-brand-primary text-white" : "hover:bg-gray-400 "
                         )}>
                            <Icon className="w-7 h-7 "/>
                             {menuItems.title} 
                        </Link>
                    )
                })}
            </nav>

            <div className="absolute bottom-0 w-full border-t-4 border-app-border p-4">
                <form action={logOutAction} className="flex items-center ">
                    <button 
                    type="submit"
                    className="flex gap-6 items-center font-bold text-lg text-white cursor-pointer hover:scale-110 duration-300">
                         <LogOut size={22}/>
                         Sair 
                    </button>
                </form>
            </div>

                    </SheetContent>
                </Sheet>
                </div>
            </header>
       </div>
    )
}