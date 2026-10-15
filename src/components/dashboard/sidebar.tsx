"use client"

import { Package, ShoppingCart, Tags, LogOut} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { logOutAction } from "@/actions/auth"

interface sideBarProps{
    userName: string
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



export function Sidebar({ userName }: sideBarProps ){
    const pathName = usePathname();


    return(
        <aside className=" hidden lg:flex flex-col h-screen w-64 border-r border-app-border bg-app-sidebar">
            <div className="border-b border-app-border p-6">
                <h2 className=" text-white font-bold text-2xl "> 
                    Pizzaria
                    <span className="text-brand-primary">
                        Cardoso
                    </span>
                </h2>
                <p className="text-gray-500 text-base"> Olá {userName}</p>
            </div>

            <nav className=" flex-1 p-4 ">
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

            <div className="border-t-4 border-app-border p-4">
                <form action={logOutAction} className="flex items-center ">
                    <button 
                    type="submit"
                    className="flex gap-6 items-center font-bold text-lg text-white cursor-pointer hover:scale-110 duration-300">
                         <LogOut size={22}/>
                         Sair 
                    </button>
                </form>
            </div>

           
        </aside>
    )
}