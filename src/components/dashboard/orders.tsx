"use client"

import { apiClient } from "@/lib/api";
import { Order } from "@/lib/types";
import { Button } from "@base-ui/react";
import { Eye, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/formart";
import { DetailOrderModal } from "./detailOrder-modal-form";


interface OrdersProps{
    token: string;
}

export default function Orders({ token }:OrdersProps) {
    const [ loading, setLoading ] = useState(true);
    const [ orders, setOrders ] = useState<Order[]>([]);
    const [ selectOrder, setSelectOrder ] = useState<null | string>(null)

    const fetchOrders = async () => {
        try{
            const response = await apiClient<Order[]>("/orders?draft=false", {
                method: "GET",
                cache: "no-store",
                token: token
            })

            const pedingOrders = response.filter((order) => !order.status)

            setOrders(pedingOrders);
            setLoading(false);
        }catch(error){
            setLoading(false)
        }
    };

    useEffect(() => {
        async function loadOrders(){
           await fetchOrders()
        }

        loadOrders();
    },[])

    const calculateTotal = (order: Order) => {
        if(!order.items) return 0;

        return order.items.reduce((total, item) => {
            return total + item.product.price * item.amount;
        },0)
    }

    return(
    <div className=" space-y-4 sm:space-y-6 p-8">
        <div className="flex flex-col items-center sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold"> Pedidos em produção </h1>
              <p className=" text-sm sm:text-base text-gray-500 italic"> Gerencie os pedidos da cozinha </p>
          </div>

        <Button onClick={fetchOrders} className=" rounded transition-transform duration-200 active:rotate-360 cursor-pointer hover:scale-110 flex items-center justify-center">
            <RefreshCcw className="w-6 h-6"/>
        </Button>
        </div>

        {loading ? (
            <div>
                <p className="text-xl text-gray-500 text-center"> Carregando pedidos... </p>
            </div>
        ) : orders.length === 0 ? (
            <div>
                <h1 className="text-xl text-gray-500 text-center">
                    Nenhum pedido encontrado no momento
                </h1>
            </div>
        ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((order) => (
                    <Card key={order.id} className="bg-app-card border border-app-border">  
                            <CardHeader>
                                <div className=" flex items-center justify-between text-white border-app">
                                <CardTitle className=" font-medium text-lg sm:text-xl"> 
                                    Mesa {order.table} 
                                </CardTitle>
                                <Badge variant="destructive" className="text-xs select-auto">
                                     Produção 
                                </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3 sm:space-y-4 mt-auto">
                                <div>
                                {order.items && order.items.length > 0 && (
                                    <div className="space-y-1">
                                        {order.items.slice(0, 2).map((items) => (
                                            <p key={items.id} className="text-gray-500 text-xs sm:text-sm ">
                                               - {items.amount} x {items.product.name}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                </div>

                                <div className="border-t border-app-border flex flex-col sm:flex-row xl:flex-row items-center justify-between pt-5 gap-3"
                                >
                                    <div className="text-sm sm:text-base font-medium self-start">
                                        <p className="text-gray-500"> Total </p>
                                        <p className="font-bold text-red-500">
                                            {formatPrice(calculateTotal(order))} 
                                        </p>
                                    </div>

                                   <Button 
                                   onClick={() => setSelectOrder(order.id)}
                                   className="bg-brand-primary text-white hover:bg-brand-primary/70 duration-300 py-1.5 px-2.5 rounded-md flex items-center justify-center w-full sm:w-auto cursor-pointer">
                                        Detalhes
                                   </Button>
                                </div>
                            </CardContent>
                    </Card>
                ))}
            </div>
         )}
        <DetailOrderModal
        orderId={selectOrder}
        onClose={ async () => {
           setSelectOrder(null)
           await fetchOrders()
        }}
        token={token}
        />
    </div>
    )
}