import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { OrderProduct } from './OrderProduct';
import { User } from './User';

@Entity()
@Unique('order_uk', ['orderNumber'])
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  orderNumber: string;

  @Column()
  orderDate: Date;

  @Column()
  userId: number;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct, {
    cascade: true
  })
  orderProducts!: OrderProduct[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
