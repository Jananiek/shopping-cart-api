import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { OrderProduct } from './OrderProduct';
import { UserProductRating } from './UserProductRating';

@Entity()
@Unique('product_uk', ['productCode'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productCode: string;

  @Column()
  productName: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  averageRating: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, default: 0 })
  discount: number;

  @OneToMany(() => UserProductRating, productRating => productRating, {
    cascade: true
  })
  productRatings!: UserProductRating[];

  @OneToMany(() => OrderProduct, orderProduct => orderProduct, {
    cascade: true
  })
  orderProducts!: OrderProduct[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}