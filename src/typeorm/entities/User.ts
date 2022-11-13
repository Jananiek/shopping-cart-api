import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { UserProductRating } from './UserProductRating';

@Entity()
@Unique('user_uk', ['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  userName: string;

  @Column({ default: null })
  firstName: string;

  @Column({ default: null })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  mobile: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
  public roles?: Record<string, number>;

  @OneToMany(() => UserProductRating, userRating => userRating, {
    cascade: true,
  })
  userRatings!: UserProductRating[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}