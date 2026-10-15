"use client"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useEffect, useState } from "react"
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Order } from "@/lib/types";
import { apiClient } from "@/lib/api";
import { formatPrice } from "@/lib/formart";
import { finishOrderAction } from "@/actions/orders";
import { useRouter } from "next/navigation";

interface OrderModalPrpos {
    orderId: string | null;
    onClose: () => Promise<void>
    token: string;
}


export function DetailOrderModal({ orderId, onClose, token }: OrderModalPrpos) {
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const fetchOrder = async () => {
        if (!orderId) {
            setOrder(null)
            return;
        }

        try {
            setLoading(true)

            const response = await apiClient<Order>(`/order/detail?order_id=${orderId} `, {
                method: "GET",
                token: token
            })

            setOrder(response)

            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        async function loadOrder() {
            await fetchOrder()
        }
        loadOrder();
    }, [orderId])


    const calcuteTotal = () => {
        if (!order?.items) return 0;
        return order.items.reduce((total, item) => {
            return total + item.product.price * item.amount;
        }, 0)
    }

    async function handleFinishOrder(){
        if(!orderId)return;

        const result = await finishOrderAction(orderId)

        if(!result.success){
            alert(result.error)
            return;
        }

        if(result.success){
            router.refresh();
            onClose();
        }
    }

    return (
        <Dialog open={orderId !== null} onOpenChange={() => onClose()}>
            <DialogContent className="bg-app-background border border-app-border text-white">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl xl:text-2xl font-medium text-center text-white">
                        Detalhes do pedido
                    </DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div>
                        <p className="text-xl text-gray-500 text-center"> Carregando... </p>
                    </div>
                ) : order ? (
                    <div>
                        <div>
                            <section className="text-white flex items-center justify-between p-2">
                                <div className="space-y-1">
                                    <p className="text-xs font-extralight">
                                        Número da mesa
                                    </p>
                                    <p className="text-base font-bold">
                                        Mesa {order.table}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-extralight">
                                        Cliente
                                    </p>
                                    <p className="text-base font-bold">
                                        {order.name || "Sem nome"}
                                    </p>
                                </div>
                            </section>

                            <div className="space-y-1 flex items-center justify-center flex-col">
                                <p className="text-xs font-extralight">
                                    Status
                                </p>
                                <Badge variant="destructive" className="text-xs select-auto">
                                    Produção
                                </Badge>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-bold mb-2"> Itens do pedido </h2>
                            <div className="space-y-3">
                                {order.items && order.items.length > 0 ? (
                                    order.items.map((item) => {
                                        const subtotal = item.product.price * item.amount;

                                        return (
                                            <div
                                                key={item.id}
                                                className="bg-app-background rounded-lg p-4 border border-app-border"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h4 className=" font-semibold text-base mb-1">
                                                            {item.product.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-400 mt-2">
                                                            {item.product.description}
                                                        </p>
                                                        <p className="text-sm text-gray-400 mt-2">
                                                            {formatPrice(item.product.price)} x {item.amount}
                                                        </p>
                                                    </div>

                                                    <div className="text-right ml-4">
                                                        <p className="text-sm text-gray-400 mb-1 ">
                                                            Quantidade: {item.amount}
                                                        </p>
                                                        <p className="text-lg font-extralight">
                                                            SubTotal: {formatPrice(subtotal)}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <h1 className="text-xl text-gray-500 text-center">
                                        Nenhum pedido encontrado no momento
                                    </h1>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-app-border pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold"> Total </span>
                                <span className="text-xl font-bold text-brand-primary"> {formatPrice(calcuteTotal())} </span>
                            </div>
                        </div>
                    </div>
                ) : null}

                <DialogFooter className="flex gap-3 sm:gap-3">
                    <Button
                        onClick={() => onClose()}
                        className="cursor-pointer border border-black text-black bg-transparent py-1 px-2 rounded hover:text-white duration-300 font-bold"
                    >
                        Fechar
                    </Button>
                    <Button
                    onClick={handleFinishOrder}
                        disabled={loading}
                        className="cursor-pointer bg-brand-primary py-1 px-6 rounded text-white hover:bg-brand-primary/30 duration-300" >
                        Finalizar pedido
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}