import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Product } from './Product';
import { User } from './User';

@Entity()
@Unique('user_product_rating_uk', ['userId', 'productId'])
export class UserProductRating {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  userId: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  userRating: number;

  @ManyToOne(() => Product, product => product.productRatings)
  product: Product;

  @ManyToOne(() => User, user => user.userRatings)
  user: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}