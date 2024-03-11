import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '../core/dto/request/role.dto';

import { RoleService } from '../use-cases/role/role.use-case';

import { Role } from '../use-cases/auth/enums';
import { Roles } from 'src/config/decorators/role.decorator';
import { Public } from 'src/config/decorators/public.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(Role.ADMIN)
  @Public()
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return await this.roleService.create(createRoleDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get()
  @Roles(Role.ADMIN)
  @Public()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      return await this.roleService.update(id, updateRoleDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
