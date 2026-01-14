import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Expense, ExpenseStatus } from "./expense.entity";
import { Repository } from "typeorm";
import { Role, User } from "src/users/user.entity";
import { CreateExpenseDTO } from "./dto/create-expense.dto";

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>
  ) {}

  async createExpense(dto: CreateExpenseDTO, userId: number): Promise<Expense> {
    const status = Number(dto.amount) < 1000
      ? ExpenseStatus.APPROVED
      : ExpenseStatus.PENDING;

    const user = { 
      id: userId 
    } as User;

    const expense = this.expenseRepository.create({
      description: dto.description,
      amount: dto.amount,
      status: status,
      user: user
    });

    return await this.expenseRepository.save(expense);
  }

  async approveExpense(expenseId: number, role: Role): Promise<Expense> {
    if (role !== Role.MANAGER) {
      throw new Error('User with role different than manager cannot approve expenses');
    }

    const expense = await this.expenseRepository.findOneBy({ id: expenseId });
    if (!expense) {
      throw new Error('Expense not found');
    }

    expense.status = ExpenseStatus.APPROVED;

    return await this.expenseRepository.save(expense);
  }
}