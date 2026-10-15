"use server"

import { apiClient } from "@/lib/api"
import { getToken } from "@/lib/auth"
import { ProductsProps } from "@/lib/types"
import { revalidatePath } from "next/cache"


export async function createProductActions(formData: FormData){
    
    try{
        const token = await getToken()

        if(!token){
            return { success: false, error: "SEM O TOKEN VOCÊ NÃO PODE CRIA um PRODUTO"}
             }


         const response = await apiClient<ProductsProps>("/product",{
            method: "POST",
            body: formData,
            token:token
         })

         if(!response){
            return { success: false, error: "ERRO AO CRIA UM PRODUTO"}
         }

        revalidatePath("/dashboard/products");
        return { success: true, error: ""}
    }catch(error){
        if(error instanceof Error){
            return { success: false, error: error.message};
        }
    }
  
    
}

export async function deleteProduct(productID: string){
     
    try{
        if(!productID){
            return { success: false, error: " FALHA AO DELETAR UM PRODUTO "};
        }

        const token = await getToken();

        if(!token){
        return { success:false, error: "PARA DELETAR UM PRODUTO É PRECISO PASSAR UM TOKEN OU ESTÁ COM UM TOKEN VALIDO"}
    }

    await apiClient(`/product/${productID}`,{
        method: "DELETE",
        token: token
    })

    revalidatePath("/dashboard/products")
    return { success: true, error: ""}
    }catch(error){
        if(error instanceof Error){
            return { success: false, error: error.message};
        }
        return { success: false, error: " ERRO AO DELETAR UM PRODUTO "};
    }
}