import { CreatePurchaseDto } from './create-purchase.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto){}
