import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { OrderProduct } from './OrderProduct';

@Entity()
@Unique('order_uk', ['orderNumber'])
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNumber: string;

  @Column()
  orderDate: Date;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 2, scale: 2, default: 0 })
  discount: number;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct, {
    cascade: true
  })
  orderProducts: OrderProduct[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
