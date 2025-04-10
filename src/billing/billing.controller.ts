import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BillingDto } from './dto/billing.dto';
import { ValidationErrorResponse } from './dto/validation-error-response.dto';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { QueryBillingDto } from './dto/query-billing.dto';
import { RequireRole } from 'src/decorators/require-role.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from './enums/role.enum';
import { DeleteBillingDto } from './dto/delete-billing.dto';

@ApiTags('Billing')
@Controller('billing')
@UseGuards(RoleGuard)
export class BillingController {
  constructor(private billingService: BillingService) {}

  /**
   * Finds all billing records matching the optional query parameters.
   *
   * @param input optional query parameters needed for billing record query
   * @returns a list of billing records matching the query parameters
   */
  @Get()
  @ApiOperation({ summary: 'Fetch premium paid' })
  @ApiOkResponse({
    description: 'Premium paid fetched successfully.',
    type: BillingDto,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: 'Missing role permission' })
  @ApiNotFoundResponse({ description: 'Premium paid not found' })
  @ApiHeader({
    name: 'x-user-role',
    description: 'User role for authorization',
    required: true,
  })
  async getBilling(@Query() input: QueryBillingDto) {
    return await this.billingService.getBilling(input);
  }

  /**
   * Creates a new billing record. This action is only allowed for admin roles.
   *
   * @param input fields needed to create a billing record
   */
  @Post()
  @ApiOperation({ summary: 'Creates a premium paid' })
  @ApiCreatedResponse({ description: 'Premium paid created successfully' })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
    type: ValidationErrorResponse,
  })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiHeader({
    name: 'x-user-role',
    description: 'User role for authorization',
    required: true,
  })
  @RequireRole(Role.ADMIN)
  async createBilling(
    @Body()
    input: CreateBillingDto,
  ) {
    console.log(input.premiumPaid);
    return await this.billingService.createBilling(input);
  }

  /**
   * Updates the billing record. This action is only allowed for admin roles.
   *
   * @param productCode product code
   * @param input fields to be updated
   */
  @Put()
  @ApiOperation({ summary: 'Updates a premium paid' })
  @ApiOkResponse({ description: 'Updates premium paid successfully' })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
    type: ValidationErrorResponse,
  })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiHeader({
    name: 'x-user-role',
    description: 'User role for authorization',
    required: true,
  })
  @RequireRole(Role.ADMIN)
  async editBilling(
    @Query('productCode') productCode: number,
    @Body() input: UpdateBillingDto,
  ) {
    return await this.billingService.updateBilling(input, productCode);
  }

  /**
   * Deletes a billing record according to the billing record id and product code.
   * This action is only allowed for admin roles.
   *
   * @param input query parameters of billing record to be deleted
   */
  @Delete()
  @ApiOperation({ summary: 'Deletes a premium paid' })
  @ApiOkResponse({ description: 'Premium paid deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
    type: ValidationErrorResponse,
  })
  @ApiForbiddenResponse({ description: 'Not allowed' })
  @ApiHeader({
    name: 'x-user-role',
    description: 'User role for authorization',
    required: true,
  })
  @RequireRole(Role.ADMIN)
  async deleteBilling(@Query() input: DeleteBillingDto) {
    return await this.billingService.deleteBilling(input);
  }
}
