import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@Entity()
@Unique('order_product_uk', ['productId', 'orderId'])
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  productId: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Product, product => product.productRatings)
  product: Product;

  @ManyToOne(() => Order, order => order.orderProducts)
  order: Order;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}