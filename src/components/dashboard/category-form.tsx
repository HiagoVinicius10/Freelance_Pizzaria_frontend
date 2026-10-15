"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@base-ui/react"
import { createCategoryAction } from "@/actions/categories"
import { useRouter } from "next/navigation"



export function CategoryForm() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    async function handleCreateCategory(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const result = await createCategoryAction(formData)

        if(result.success){
            setOpen(false)
            router.refresh();
            return;
        }else{
            return result.error
        }
    }

    function cancelCreateCategory(){
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center justify-center bg-brand-primary py-2 sm:px-5 rounded font-medium hover:bg-white hover:text-black duration-200 cursor-pointer">
                <Plus className="w-5 h-5 mr-2" />
                Nova Categoria
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-medium text-center"> Criar nova categoria </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleCreateCategory} className="space-y-6 mt-3">
                    <div className="flex flex-col gap-2">
                        <Label> Name da categoria </Label>
                        <Input
                            className="border border-app-border p-3"
                            placeholder="Digite o nome da categoria..."
                            name="name"
                            id="name"
                            type="text"
                            required
                        />
                    </div>

                    <div className="flex gap-4 justify-end">
                        <Button
                            onClick={cancelCreateCategory}
                            className="cursor-pointer border border-app-border py-1 px-2 rounded hover:font-bold duration-300 "
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="cursor-pointer bg-brand-primary py-1 px-6 rounded text-white hover:text-black duration-300" >
                            Criar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
