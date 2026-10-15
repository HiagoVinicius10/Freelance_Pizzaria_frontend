"use client"
import { deleteProduct } from "@/actions/products";
import { Button } from "@base-ui/react"
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";


interface DeleteProductID{
    productID: string;
}


export function DeleteProduct({ productID }: DeleteProductID){
    const router = useRouter();

    async function handleDeleteProduct(){
      const result = await deleteProduct(productID)

      if(result.success){
        alert(" PRODUTO DELETADO COM SUCESSO ")
        router.refresh();
      }else if(result.error !== ""){
        alert(" ERRO AO DELETAR UM PRODUTO " + result)
      }
      
    }

    return(
        <Button 
        onClick={handleDeleteProduct}
        className="bg-red-500 py-1 px-2 rounded cursor-pointer hover:scale-105 duration-200">
            <Trash2 className=" w-5 h-5 bg-red-500 rounded-2xl " />
        </Button>
    )
}