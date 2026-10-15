"use server";

import { apiClient } from "@/lib/api";
import { removeToken, setToken } from "@/lib/auth";
import { LoginProps } from "@/lib/types";
import { redirect } from "next/navigation";

export async function registerAction(
    prevState: { success: boolean, error: string, redirectTo?: string} | null,
    formData: FormData
){

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try{
        const data = {
            name: name,
            email: email,
            password: password 
         }
     
    
        await apiClient("/users",{
            method: "POST",
            body: JSON.stringify(data),
        });

    return { success: true , error: "", redirectTo: "/login"}
    }catch(error){
        if(error instanceof Error){
            return { success: false, error: error.message }
        }

        return{ success: false, error: "Error ao criar conta"};
    } 
    
};


export async function loginAction(
    prevState: { success: boolean, error: string, redirectTo?: string} | null,
    formData: FormData
) {

    try{
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const data = {
            email: email,
            password: password
        }

    const response = await apiClient<LoginProps>("/session", {
        method: "POST",
        body: JSON.stringify(data)
    })

    await setToken(response.token)

    return { success: true, error: "", redirectTo: "/dashboard"}
    }catch(error){
        if(error instanceof Error){
            return{ success: false, error: error.message || "Error ao fazer o login"}
        }

        return { success: false, error: "Error ao fazer o login"};
    }
    
}

export async function logOutAction (){
    await removeToken();
    redirect("/login")
}