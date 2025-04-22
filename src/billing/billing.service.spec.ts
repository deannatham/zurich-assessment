import { Test, TestingModule } from '@nestjs/testing';
import { BillingService } from './billing.service';
import { Billing } from './entity/billing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryBillingDto } from './dto/query-billing.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { DeleteBillingDto } from './dto/delete-billing.dto';

describe('BillingService', () => {
  let service: BillingService;

  const mockBillingRepository = {
    findAndCount: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingService,
        {
          provide: getRepositoryToken(Billing),
          useValue: mockBillingRepository,
        },
      ],
    }).compile();

    service = module.get<BillingService>(BillingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBilling', () => {
    it('should return paginated billing records', async () => {
      const input: QueryBillingDto = { page: 1, limit: 10 };
      const mockResult = [{ id: 'uuid' }] as Billing[];
      mockBillingRepository.findAndCount.mockResolvedValue([mockResult, 1]);

      const result = await service.getBilling(input);
      expect(result.data).toEqual(mockResult);
      expect(result.meta).toEqual({ ...input, total: 1, totalPages: 1 });
    });

    it('should throw NotFoundException when no records found', async () => {
      mockBillingRepository.findAndCount.mockResolvedValue([[], 0]);
      await expect(service.getBilling({})).rejects.toThrow(NotFoundException);
    });
  });

  describe('createBilling', () => {
    it('should create a new billing record and return its id', async () => {
      const input: CreateBillingDto = {
        email: 'test@testing.com',
        firstName: 'test',
        lastName: 'testing',
        productCode: 4000,
        location: 'Malaysia',
        premiumPaid: 100,
      };

      const mockEntity = { ...input, id: 'uuid' };
      mockBillingRepository.save.mockResolvedValue(mockEntity);

      const result = await service.createBilling(input);
      expect(result).toEqual({ id: 'uuid' });
    });
  });

  describe('updateBilling', () => {
    it('should update a billing record and return the id', async () => {
      const input: UpdateBillingDto = {
        id: 'uuid',
        location: 'Singapore',
        premiumPaid: 300,
      };
      mockBillingRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.updateBilling(input, 4000);
      expect(result).toEqual({ id: 'uuid' });
    });

    it('should throw NotFoundException if no record is updated', async () => {
      const input: UpdateBillingDto = {
        id: 'uuid',
        location: 'Singapore',
        premiumPaid: 300,
      };

      mockBillingRepository.update.mockResolvedValue({ affected: 0 });

      await expect(service.updateBilling(input, 4000)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteBilling', () => {
    it('should delete a billing a record and return the id', async () => {
      const input: DeleteBillingDto = {
        id: 'uuid',
        productCode: 4000,
      };

      mockBillingRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.deleteBilling(input);
      expect(result).toEqual({ id: 'uuid' });
    });

    it('should throw NotFoundException if no record is deleted', async () => {
      const input: DeleteBillingDto = {
        id: 'uuid',
        productCode: 4000,
      };

      mockBillingRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.deleteBilling(input)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
