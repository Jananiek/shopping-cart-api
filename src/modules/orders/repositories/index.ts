import { getRepository, InsertResult, UpdateResult } from "typeorm";
import { Order } from "../../../typeorm/entities/Order";
import { OrderProduct } from "../../../typeorm/entities/OrderProduct";

export class OrderRepository {
    async createOne(order: Order): Promise<Order> {
        const orderRepository = getRepository(Order);
        const orderObject = orderRepository.create(order);
        return orderRepository.save(orderObject);
    }

    async createOrUpdateOrderProducts(orderProducts: OrderProduct[]): Promise<UpdateResult | InsertResult> {
        return await getRepository(OrderProduct).upsert(orderProducts, [
            'productId', 'orderId'
        ]);
    }

}