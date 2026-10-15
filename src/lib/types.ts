export interface UserProps{
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    createAt: string;
}

export interface LoginProps{
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    token: string;
}

export interface CategoriesProps{
    id: string;
    name: string;
    createAt: string;
}

export interface ProductsProps{
    id: string;
    name: string;
    description: string;
    price: number;
    banner: string;
    disabled: boolean;
    category_id: string;
    createAt: string;
    category?: {
        id: string;
        name: string;
    };
}

export interface Order{
    id: string;
    table: number;
    name: string;
    status: boolean; // False =  produção, True = finalizado
    draft: true; // True = rascunho, False = enviar para produção
    createAt: string;
    items?: Items[]
}

export interface Items{
    id: string;
        amount: number;
        product:{
            id: string;
            name: string;
            description: string;
            price: number;
            banner: string;
        }
}