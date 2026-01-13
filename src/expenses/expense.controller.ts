import { Body, Controller, Post } from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { Expense } from "./expense.entity";
import type { CreateExpenseDTO } from "./dto/create-expense.dto";
import { User } from "src/users/user.entity";

@Controller({ path: 'expense' })
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(@Body() dto: CreateExpenseDTO, user: User): Promise<Expense> {
    return await this.expenseService.createExpense(dto, user);
  }
}