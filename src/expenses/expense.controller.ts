import { Body, Controller, Param, Post, Put, Req } from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { Expense } from "./expense.entity";
import type { CreateExpenseDTO } from "./dto/create-expense.dto";
import type { Request } from "express";
import { JWTPayloadDTO } from "src/auth/dto/jwt-payload.dto";

@Controller({ path: 'expense' })
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Body() dto: CreateExpenseDTO, 
    @Req() request: Request
  ): Promise<Expense> {
    const payload = request['user'] as JWTPayloadDTO;
    return await this.expenseService.createExpense(dto, payload.sub);
  }

  @Put(':id')
  async approveExpense(
    @Param('id') expenseId: number, 
    @Req() request: Request
  ): Promise<Expense> {
    const payload = request['user'] as JWTPayloadDTO;
    return await this.expenseService.approveExpense(expenseId, payload.role);
  }
}