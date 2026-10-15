import { CategoryForm } from "@/components/dashboard/category-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { apiClient } from "@/lib/api"
import { getToken } from "@/lib/auth"
import { CategoriesProps } from "@/lib/types"
import { Tags } from "lucide-react"



export default async function Categories() {
    const token = await getToken()
    const categorries = await apiClient<CategoriesProps[]>("/category",{
        token: token!
    })

    return(
        <div className=" space-y-4 sm:space-y-6 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 ">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold"> Categorias </h1>
                <p className=" text-sm sm:text-base text-gray-500 italic"> Organize os produtos em categories </p>
            </div>

            <CategoryForm/>
          </div>

            {categorries.length !== 0 && (
            <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categorries.map((category) =>{
                return (
                <Card key={category.id} className="bg-app-card border border-app-border transition-shadow hover:shadow-md ">
                    <CardHeader>
                        <Tags size={24}/>
                        <CardTitle className="text-white text-[22px] "> {category.name} </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <CardDescription className="text-xs"> ID: {category.id} </CardDescription>
                    </CardContent>
                </Card>
                )
            })}
            </div>
            )}
        </div>
    )
}