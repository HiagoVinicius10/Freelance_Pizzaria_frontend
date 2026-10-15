import { RegisterForm } from "@/components/forms/register-form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function register () {
    const user = await getUser()
    
    if(user){
        redirect("/dashboard")
    }

    return(
        <main className="bg-app-background min-h-screen flex items-center justify-center px-4 py-8 ">
            <div className="w-full flex justify-center" >
               <RegisterForm />
            </div>
        </main>
    )
}