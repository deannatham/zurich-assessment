import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { QueryBillingDto } from './dto/query-billing.dto';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { DeleteBillingDto } from './dto/delete-billing.dto';
import { NotFoundException } from '@nestjs/common';

describe('BillingController', () => {
  let controller: BillingController;

  const mockBillingService = {
    getBilling: jest.fn(),
    createBilling: jest.fn(),
    updateBilling: jest.fn(),
    deleteBilling: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingController],
      providers: [{ provide: BillingService, useValue: mockBillingService }],
    }).compile();

    controller = module.get<BillingController>(BillingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBilling', () => {
    it('should return billing record', async () => {
      const query: QueryBillingDto = {
        productCode: 4000,
        location: 'Malaysia',
        page: 1,
        limit: 1,
      };

      const mockData = [
        {
          id: 'uuid',
          email: 'testing@gmail.com',
          firstName: 'test',
          lastName: 'ting',
          productCode: 4000,
          location: 'Malaysia',
          premiumPaid: 100,
        },
      ];
      const mockMeta = { total: 1, page: 1, limit: 1, totalPages: 1 };
      const mockResult = { data: mockData, meta: mockMeta };
      mockBillingService.getBilling.mockResolvedValue(mockResult);

      const result = await controller.getBilling(query);
      expect(result).toBe(mockResult);
      expect(mockBillingService.getBilling).toHaveBeenCalledWith(query);
    });

    it('should throw NotFoundException when no records found', async () => {
      const query: QueryBillingDto = {};
      mockBillingService.getBilling.mockRejectedValue(
        new NotFoundException('Premium paid not found'),
      );

      await expect(controller.getBilling(query)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createBilling', () => {
    it('should create billing record', async () => {
      const input: CreateBillingDto = {
        email: 'test@gmail.com',
        firstName: 'test',
        lastName: 'testing',
        productCode: 4000,
        location: 'Malaysia',
        premiumPaid: 100,
      };
      const mockResult = { id: 'uuid' };
      mockBillingService.createBilling.mockResolvedValue(mockResult);

      const result = await controller.createBilling(input);
      expect(result).toBe(mockResult);
      expect(mockBillingService.createBilling).toHaveBeenCalledWith(input);
    });
  });

  describe('editBilling', () => {
    it('should update billing record', async () => {
      const input: UpdateBillingDto = {
        id: 'uuid',
        location: 'East Malaysia',
        premiumPaid: 200,
      };
      const productCode = 4000;

      const mockResult = { id: 'uuid' };
      mockBillingService.updateBilling.mockResolvedValue(mockResult);

      const result = await controller.updateBilling(productCode, input);
      expect(result).toBe(mockResult);
      expect(mockBillingService.updateBilling).toHaveBeenCalledWith(
        input,
        productCode,
      );
    });

    it('should throw NotFoundException if no record is updated', async () => {
      const input: UpdateBillingDto = {
        id: 'uuid',
        location: 'Singapore',
        premiumPaid: 200,
      };

      mockBillingService.updateBilling.mockRejectedValue(
        new NotFoundException('No billing record found to update'),
      );
      await expect(controller.updateBilling(4000, input)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteBilling', () => {
    it('should delete billing record', async () => {
      const input: DeleteBillingDto = {
        id: 'uuid',
        productCode: 4000,
      };
      const mockResult = { id: 'uuid' };
      mockBillingService.deleteBilling.mockResolvedValue(mockResult);

      const result = await controller.deleteBilling(input);
      expect(result).toEqual(mockResult);
      expect(mockBillingService.deleteBilling).toHaveBeenCalledWith(input);
    });

    it('should throw NotFoundException if no record is deleted', async () => {
      const input: DeleteBillingDto = {
        id: 'uuid',
        productCode: 4000,
      };

      mockBillingService.deleteBilling.mockRejectedValue(
        new NotFoundException('No billing record found to delete'),
      );
      await expect(controller.deleteBilling(input)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
