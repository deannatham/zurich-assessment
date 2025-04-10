import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

describe('BillingController', () => {
  let controller: BillingController;

  // TODO #1: this is just as an example to use mock services
  /*
  const mockBillingService = {
    // all methods go here under here i.e.
    findAll: async () => [{ id: 'id'}],
    findOne: async () => ({ id: 'id'})
  }*/

  // TODO #2: this is an example if you want to mock a method in the service
  /*const mockFindOne = jest.fn();

  // then replace the method in the mockBillingService in TODO #1 to:
  const mockBillingService = {
    findOne: mockFindOne,
  };*/

  beforeEach(async () => {
    // TODO #2: reset the mock in each test
    // jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingController],
      providers: [BillingService],
      // instead of above, replace with below:
      // providers: [{ provide: BillingService, useValue: mockBillingService }]
    }).compile();

    controller = module.get<BillingController>(BillingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // TODO #1: this is an example of a unit test
  /*
  describe('findOne', () => {
    it('should return correct response', async () => {
      const episodeId = 'id';
      const result = await controller.findOne(episodeId);
      expect(result).toEqual({ id: 'id' });
    });
  });
  */

  // TODO #2: this is an example of a unit test if you use the mock function
  /*describe('findOne', () => {
    const episodeId = 'id';
    const mockResult = { id: episodeId, name: 'my episode' };

    // test if the controller handler returns the mocked result
    beforeEach(() => {
      mockFindOne.mockResolvedValue(mockResult);
    });

    // test if the controller calls the service with the correct values
    it('should call the service with correct params', () => {
      await controller.findOne(episodeId);
      expect(mockFindOne).toHaveBeenCalledWith(episodeId);
    });

    it('should return correct response', async () => {
      const result = await controller.findOne(episodeId);
      expect(result).toEqual(mockResult);
    });
  });*/

  // TODO #3: you can put everything in another describe method that tests for positive
  // scenario, then another describe for negative scenario i.e.:
  /*describe('findOne', () => {
    describe('when episode is found', () => {
      // insert prev code here
    });

    describe('when episode is not found', () => {
      const episodeId = 'id2';

      beforeEach(() => {
        mockFindOne.mockResolvedValue(null);
      });

      it('should throw an error', async () => {
        await expect(controller.findOne(episodeId)).rejects.toThrow(
          'Episode not found',
        );
      });
    });
  });*/
});
