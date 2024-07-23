import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/config/decorators/public.decorator';
import { Roles } from 'src/config/decorators/role.decorator';
import { CreateReviewDto, UpdateReviewDto } from 'src/core/dto';
import { Role } from 'src/use-cases/auth/enums';
import { ReviewService } from 'src/use-cases/review/review.use-case';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Roles(Role.CUSTOMER, Role.DISTRIBUTOR, Role.INTEGRATOR)
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @Public()
  findAll(@Param('id_inverter') id_inverter: string) {
    return this.reviewService.findAll(id_inverter);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.CUSTOMER, Role.DISTRIBUTOR, Role.INTEGRATOR)
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @Roles(Role.CUSTOMER, Role.DISTRIBUTOR, Role.INTEGRATOR)
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
