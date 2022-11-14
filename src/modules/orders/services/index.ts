import { OrderRepository } from '../repositories';
import { OrderProduct } from '../../../typeorm/entities/OrderProduct';
import { Order } from '../../../typeorm/entities/Order';

export class OrderService {
    protected orderRepo: OrderRepository;
    constructor() {
        this.orderRepo = new OrderRepository();
    }
    /**
     * @desc Create new order
     * @param {Order} order object that contain incoming order details
     * @returns {boolean}
     */
    public async createOne(order: Order): Promise<Order> {
        return await this.orderRepo.createOne(order)
    }

    /**
     * @desc Create order update bulk products in a order
     * @param {OrderProduct[]} orderProducts array of products objects for order
     * @returns {boolean}
     */
    public async createOrUpdateOrderProducts(orderProducts: OrderProduct[]): Promise<boolean> {
        const { raw } = await this.orderRepo.createOrUpdateOrderProducts(orderProducts)
        if (raw.length > 0) {
            return true
        }
        return false
    }

}
