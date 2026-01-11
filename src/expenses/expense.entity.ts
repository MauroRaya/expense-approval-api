import { User } from 'src/users/user.entity';
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from 'typeorm';

export const ExpenseStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
} as const;

export type ExpenseStatus = 
  typeof ExpenseStatus[keyof typeof ExpenseStatus];

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  amount: string;

  @Column({
    type: 'enum',
    enum: ExpenseStatus,
    default: ExpenseStatus.PENDING
  })
  status: ExpenseStatus

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    () => User, 
    user => user.expenses, 
    { nullable: false }
  )
  user: User
}