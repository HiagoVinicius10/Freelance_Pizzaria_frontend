"use server"

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";



export const finishOrderAction = async (orderId: string) => {

    if(!orderId){
        return { success: false, error: " FALHA AO FINALIZAR O PEDIDO "};
    }

    try{
        const token = await getToken();
    
        if(!token){
            return { success: false, error: " FALHA AO FINALIZAR O PEDIDO "};
        }

        const data = {
            order_id: orderId  
        }

        await apiClient("/order/finish", {
            method: "PUT",
            body: JSON.stringify(data),
            token: token
        })

        revalidatePath("/dashboard")

        return { success: true, error: ""};

    }catch(error){
        if(error instanceof Error){
            return {success: false, error: error.message}
        }
        return { success: false, error: " FALHA AO FINALIZAR O PEDIDO "};
    }
}