"use client"

import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
 } from "@/components/ui/card"

import { Label } from "../ui/label"
import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useActionState, useEffect } from "react"
import { registerAction } from "@/actions/auth"
import { useRouter } from "next/navigation"

export function RegisterForm (){
    const [ state, formAction, isPeding ] = useActionState(registerAction, null)
    const router = useRouter();

    useEffect(() => {
        if(state?.success && state?.redirectTo){
            router.replace(state?.redirectTo)
        }
    }, [state, router])

    return(
        <Card className="w-full max-w-md mx-auto bg-app-card text-white border border-app-border">
          <CardHeader>
            <CardTitle className=" font-bold flex items-center justify-center text-3xl sm:text-4xl "> Pizzaria <span className="text-brand-primary"> Cardoso </span> </CardTitle>
            <CardDescription className="text-center">
                Se você ainda não é cadastrado, cadastre-se
            </CardDescription>
         
          </CardHeader>
          <CardContent>
            <form action={formAction}>
                <div className="flex flex-col gap-1 mb-4">       
                <Label htmlFor="name">
                    Nome:
                </Label>
                <Input 
                className="text-white bg-app-card border border-app-border px-2 rounded h-10"
                id="name"
                type="text"
                name="name"
                placeholder="Digite o seu nome..."
                required
                minLength={3}
                />
                </div>

                <div className="flex flex-col gap-1 mb-4">       
                <Label htmlFor="email">
                    Email:
                </Label>
                <Input 
                className="text-white bg-app-card border border-app-border px-2 rounded h-10"
                id="email"
                type="email"
                name="email"
                placeholder="Digite o seu email..."
                required
                />
                </div>

                <div className="flex flex-col gap-1">       
                <Label htmlFor="password">
                    Senha:
                </Label>
                <Input 
                className="text-white bg-app-card border border-app-border px-2 rounded h-10"
                id="password"
                type="password"
                name="password"
                placeholder="Digite a sua senha..."
                required
                />
                </div>

                <Button
                type="submit"
                className="w-full bg-brand-primary my-4 h-11 rounded cursor-pointer hover:scale-103 duration-300 text-base font-bold "> 
                    {isPeding ? "Carregando conta..." : "Criar conta "}
                </Button>
                <p className="flex items-center justify-center gap-1"> 
                    Já tem uma conta? <Link href="/login" className="text-blue-500">Faça login </Link> 
                </p>
            </form>
          </CardContent>
        </Card>
    )
}