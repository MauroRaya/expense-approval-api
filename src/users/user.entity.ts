import { Expense } from "src/expenses/expense.entity";
import { 
  Column, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn 
} from "typeorm";

export const Role = {
  EMPLOYEE: 'EMPLOYEE',
  MANAGER: 'MANAGER'
} as const;

export type Role =
  typeof Role[keyof typeof Role];

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.EMPLOYEE
  })
  role: Role;

  @OneToMany(
    () => Expense, 
    expense => expense.user
  )
  expenses: Expense[]
}