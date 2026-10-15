"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Plus, Upload } from "lucide-react"
import { Button } from "@base-ui/react"
import { createProductActions } from "@/actions/products"
import { useRouter } from "next/navigation"
import { CategoriesProps } from "@/lib/types"
import { Textarea } from "../ui/textarea"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from "next/image"

interface ProductFormProps {
    categories: CategoriesProps[]
}

function convertBRLToCents(value: string): number{
    const cleanValue = value.replace(/[R$\s]/g, "").replace(/\./g, "").replace(",", ".")

    const reais = parseFloat(cleanValue) || 0

    return Math.round(reais * 100)
}

export function ProductForm({ categories }: ProductFormProps) {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [priceValue, setPriceValue] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const router = useRouter();

    async function handleCreateProduct(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true)

       if(!imageFile){
        setIsLoading(false)
        return;
       }

       const formData = new FormData()

       const formElement = e.currentTarget;

       const name = (formElement.elements.namedItem("name") as HTMLInputElement)?.value
       const description = (formElement.elements.namedItem("description") as HTMLInputElement)?.value
       const priceInCents = convertBRLToCents(priceValue)

       formData.append("name", name)
       formData.append("description", description)
       formData.append("price", priceInCents.toString())
       formData.append("category_id", selectedCategory)
       formData.append("file", imageFile)


        const result = await createProductActions(formData)

        setIsLoading(false);

        if (result?.success) {
            setOpen(false)
            setSelectedCategory("")
            router.refresh();
            return;
        } else {
            alert(result?.error);
        }
    }

    function cancelCreateProduct() {
        setOpen(false)
    }

    function formatToBrl(value: string){
        const numbers = value.replace(/\D/g,"")

        if(!numbers) return "";

        const amount = parseInt(numbers) / 100;

        return amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
    }

    function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>){
        const formated = formatToBrl(e.target.value)
        setPriceValue(formated)
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0]

        if(file){
            if(file.size > 5 * 1024 * 1024){
                return "Tamanho de Imagem não poder ser maior que 5MB"
            }

            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }

            reader.readAsDataURL(file);
        }
    }

    function clearImagem(){
        setImageFile(null);
        setImagePreview(null);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center justify-center bg-brand-primary py-2 sm:px-5 rounded font-medium hover:bg-white hover:text-black duration-200 cursor-pointer">
                <Plus className="w-5 h-5 mr-2" />
                Novo Produto
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-medium text-center"> Criar novo produto </DialogTitle>
                    <DialogDescription> Criando novo produto... </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCreateProduct} className="space-y-6 mt-3">
                    <div>
                        <Label htmlFor="name" className="mb-2">
                            Nome do produto
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Digite o nome do produto..."
                            type="text"
                            required
                            className="border border-app-border p-3"
                        />
                    </div>

                    <div>
                        <Label htmlFor="price" className="mb-2">
                            Preço
                        </Label>
                        <Input
                            id="price"
                            name="price"
                            required
                            placeholder="Ex: R$ 35,00"
                            className="border border-app-border p-3"
                            value={priceValue}
                            onChange={handlePriceChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="description" className="mb-2">
                            Descrição
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Digite a descrição do produto..."
                            required
                            className="border border-app-border h-11"
                        />
                    </div>

                    <div>
                        <Label htmlFor="category" className="mb-2">
                            Categoria
                        </Label>
                        <Select
                            value={selectedCategory}
                            onValueChange={(selectedCategory) => {
                                if(selectedCategory !== null){
                                    setSelectedCategory(selectedCategory);
                                }
                            }}
                            required
                        >
                            <SelectTrigger className="border-app-border ">
                            <SelectValue placeholder="Selecione uma categoria">
                                {categories.find(
                                    (category) => category.id === selectedCategory
                                )?.name}
                            </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="bg-app-background border-app-border">
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                        className="text-white hover:text-gray-500 cursor-pointer"
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="file" className="mb-2">
                            Imagem do produto
                        </Label>
                        {imagePreview ? (
                            <div className="relative w-full h-48 border border-app-border rounded-lg overflow-hidden">
                                <Image 
                                    src={imagePreview}
                                    alt="Preview da imagem"
                                    fill
                                    className="object-cover"
                                />

                                <Button
                                type="button"
                                onClick={clearImagem}
                                className="absolute top-2 right-4 cursor-pointer hover:scale-105 hover:font-bold duration-300 bg-red-600 rounded py-1 px-3 text-white"
                                >
                                    Excluir
                                </Button>
                            </div>
                        ): (
                            <div className=" border-2 border-dashed border-black rounded p-8 flex flex-col items-center justify-center gap-2">
                                <Upload className="w-8 h-8 mx-auto text-gray-500 mb-2 cursor-pointer"/>
                                <Label htmlFor="file">
                                    Clique para selecionar uma imagem
                                </Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={handleImageChange}
                                required
                                className="hidden"
                             />
                        <p className="text-xs text-gray-500 mt-1">
                            Formatos aceitos: JPG, JPEG, PNG (máx. 4MB)
                        </p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 justify-end">
                        <Button
                            onClick={cancelCreateProduct}
                            className="cursor-pointer border border-app-border py-1 px-2 rounded hover:font-bold duration-300 "
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !selectedCategory}
                            className="cursor-pointer bg-brand-primary py-1 px-6 rounded text-white hover:text-black duration-300 disabled:opacity-60 " >
                            {isLoading ? "Criando..." : "Criar produto"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}