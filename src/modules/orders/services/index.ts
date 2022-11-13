import { OrderRepository } from '../repositories';
import { OrderProduct } from '../../../typeorm/entities/OrderProduct';
import { Order } from '../../../typeorm/entities/Order';

export class OrderService {
    protected orderRepo: OrderRepository;
    constructor() {
        this.orderRepo = new OrderRepository();
    }

    public async createOne(order: Order): Promise<Order> {
        return await this.orderRepo.createOne(order)
    }

    public async createOrUpdateOrderProducts(orderProducts: OrderProduct[]): Promise<boolean> {
        const { raw } = await this.orderRepo.createOrUpdateOrderProducts(orderProducts)
        if (raw.length > 0) {
            return true
        }
        return false
    }

}
