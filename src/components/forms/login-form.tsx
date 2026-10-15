"use client"

import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
 } from "@/components/ui/card"
import { Button } from "../ui/button"
import Link from "next/link"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useActionState, useEffect } from "react"
import { loginAction } from "@/actions/auth"
import { useRouter } from "next/navigation"



export function LoginForm(){
    const [state, formAction, isPeding  ] = useActionState(loginAction, null)
    const router = useRouter();

    useEffect(() => {
        if(state?.success && state.redirectTo){
            router.replace(state.redirectTo)
            window.alert(" Seja Bem-vindo !")
        }
    }, [state, router])

    return(
        <Card className="w-full max-w-md mx-auto bg-app-card text-white border border-app-border">
          <CardHeader>
            <CardTitle className=" font-bold flex items-center justify-center text-3xl sm:text-4xl "> Pizzaria <span className="text-brand-primary"> Cardoso </span> </CardTitle>
            <CardDescription className="text-center">
                Preencha os dados para entrar na sua conta
            </CardDescription>
         
          </CardHeader>
          <CardContent>
            <form action={formAction}>
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
                    {isPeding ? "Entrando..." : " Entrar"}
                </Button>

                {state?.error && (
                    <div className="text-red-500 text-xs text-center mb-2">
                        {state.error}
                    </div>
                )}
                <p className="flex items-center justify-center gap-1"> 
                    Ainda não tem uma conta? <Link href="/register" className="text-blue-500">Cadastre-se </Link> 
                </p>
            </form>
          </CardContent>
        </Card>
    )
}