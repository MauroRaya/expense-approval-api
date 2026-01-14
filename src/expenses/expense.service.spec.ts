import { Repository } from "typeorm";
import { ExpenseService } from "./expense.service";
import { Expense, ExpenseStatus } from "./expense.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Role } from "src/users/user.entity";

describe('ExpenseService', () => {
  let service: ExpenseService;
  let repo: jest.Mocked<Repository<Expense>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        {
          provide: getRepositoryToken(Expense),
          useValue: {
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();
  
    service = module.get(ExpenseService);
    repo = module.get(getRepositoryToken(Expense));
  });

  it('expect approved when create expense below 1000', async () => {
    const user: any = { role: Role.EMPLOYEE };

    repo.create.mockImplementation((e) => e as Expense);
    repo.save.mockImplementation(async (e) => e as Expense);

    const result = await service.createExpense({
      description: 'expense below 1000',
      amount: '999.99'
    }, user);

    expect(result.status).toBe(ExpenseStatus.APPROVED);
  });

  it('expect pending when create expense equal 1000', async () => {
    const user: any = { role: Role.EMPLOYEE };

    repo.create.mockImplementation((e) => e as Expense);
    repo.save.mockImplementation(async (e) => e as Expense);

    const result = await service.createExpense({
      description: 'expense equal 1000',
      amount: '1000'
    }, user);

    expect(result.status).toBe(ExpenseStatus.PENDING);
  });

  it('expect pending when create expense above 1000', async () => {
    const user: any = { role: Role.EMPLOYEE };

    repo.create.mockImplementation((e) => e as Expense);
    repo.save.mockImplementation(async (e) => e as Expense);

    const result = await service.createExpense({
      description: 'expense equal 1000',
      amount: '1000.01'
    }, user);

    expect(result.status).toBe(ExpenseStatus.PENDING);
  });

  it('expect exception when user with role different than manager attempts approval', async () => {
    repo.create.mockImplementation((e) => e as Expense);
    repo.save.mockImplementation(async (e) => e as Expense);

    const expense = await service.createExpense({
      description: 'random expense',
      amount: '1000.01'
    }, 1);

    await expect(
      service.approveExpense(expense.id, Role.EMPLOYEE)
    ).rejects.toThrow();
  });

  it('expect approved status when user with manager role attempts approval', async () => {
    repo.findOneBy.mockImplementation(async (e) => e as Expense);
    repo.create.mockImplementation((e) => e as Expense);
    repo.save.mockImplementation(async (e) => e as Expense);

    const expense = await service.createExpense({
      description: 'random expense',
      amount: '1000.01'
    }, 1);

    const result = await service.approveExpense(expense.id, Role.MANAGER);

    expect(result.status).toBe(ExpenseStatus.APPROVED);
  });
});