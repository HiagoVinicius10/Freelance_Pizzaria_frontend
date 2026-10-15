import { ProductForm } from "@/components/dashboard/product-form"
import { apiClient } from "@/lib/api"
import { getToken } from "@/lib/auth"
import { CategoriesProps, ProductsProps } from "@/lib/types"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Package } from "lucide-react"
import { DeleteProduct } from "@/components/deleteProduct/deleteProduct"


export default async function Products() {
    const token = await getToken()

    const categories = await apiClient<CategoriesProps[]>("/category",{
        token: token!
    });

    const products = await apiClient<ProductsProps[]>("/products",{
        token: token!
    });

    // Função para  formatar o preço
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price / 100);
    }

    return(
        <div className=" space-y-4 sm:space-y-6 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 ">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold"> Produtos </h1>
                <p className=" text-sm sm:text-base text-gray-500 italic">
                     Gerencie seus produtos
                </p>
            </div>

            <ProductForm categories={categories}/>
          </div>

            {products.length !== 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => {
                    return(
                        <Card key={product.id} className="bg-app-card border-app-border transition-shadow hover:shadow-md overflow-hidden text-white"
                        >

                        <div className="relative w-full h-48">
                            <Image
                            src={product.banner}
                            alt={product.name}
                            fill
                            loading="eager"
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                            <CardTitle className="flex gap-2 items-center text-base md:text-lg text-white text-[22px] "> 
                            <Package className="w-5 h-5"/>
                            <span> {product.name} </span>
                            </CardTitle>

                            <DeleteProduct productID={ product.id} />
                            </div>

                            
                        </CardHeader>
                        <CardContent className="space-y-2">

                             <CardDescription className="text-xs"> {product.description} </CardDescription>

                            <div className="flex items-center justify-between pt-2 border-t border-app-border">
                                <span className="text-brand-primary font-medium text-lg">
                                    {formatPrice(product.price)}
                                </span>
                                {product.category && (
                                    <span className="text-xs bg-app-background px-2 py-1 rounded">
                                        {product.name}
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    )
                })}
            </div>
            )}
        </div>
    )
}