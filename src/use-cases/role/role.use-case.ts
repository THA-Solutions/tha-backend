import { Injectable } from '@nestjs/common';
import { RoleFactoryService } from './role-factory.service';
import { CreateRoleDto, UpdateRoleDto } from '../../core/dto/request/role.dto';
import { RoleRepository } from 'src/frameworks/data-services/database';

@Injectable()
export class RoleService {
  constructor(
    private roleFactoryService: RoleFactoryService,
    private roleService: RoleRepository,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    if (await this.roleService.findByField('name', createRoleDto.name)) {
      throw new Error('Role already exists');
    }
    const role = await this.roleFactoryService.createNewRole(createRoleDto);

    return this.roleService.create(role);
  }

  async findAll() {
    return await this.roleService.findAll();
  }

  async findOne(id: string) {
    return await this.roleService.findById(id);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleService.findById(id);

    if (!role) {
      throw new Error('Role doesn´t exists');
    }

    const updateRole = await this.roleFactoryService.updateRole(updateRoleDto);

    return await this.roleService.update(id, updateRole);
  }

  async remove(id: string) {
    const role = await this.roleService.findById(id);

    if (!role) {
      throw new Error('Role doesn´t exists');
    }

    return this.roleService.delete(id);
  }
}
