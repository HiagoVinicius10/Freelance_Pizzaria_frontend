import { logOutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth";
import { LogOut, ShieldX } from "lucide-react";
import { redirect } from "next/navigation";





export default async function AccessDenied() {

    const user = await getUser()

    if(!user){
        redirect("/login")
    }

    return(
        <div className="min-h-screen flex items-center justify-center p-4 bg-app-background">
            <Card className="bg-app-card border-app-border text-white max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center mb-4 ">
                        <ShieldX className="w-16 h-16 text-brand-primary"/>
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        Acesso Negado!
                    </CardTitle>

                    <CardContent className="space-y-4">
                        <CardDescription className="text-gray-300 text-center">
                            Você não tem permissão para acessar o painel administrador
                        </CardDescription>

                        <p className="text-sm text-gray-400 text-center">
                            Se você acredita que isso é um erro, por favor, consulta o responsável pelo o sistema.   
                        </p>

                        <form action={logOutAction} className="flex justify-center pt-2">
                            <Button 
                            type="submit"   
                            className="w-full bg-red-500 border-app-border text-white text-base flex gap-3 cursor-pointer hover:bg-red-500/55">
                                <LogOut className="w-6 h-6"/>
                                Sair
                            </Button>
                        </form>
                    </CardContent>


                </CardHeader>
            </Card>
        </div>
    )
}