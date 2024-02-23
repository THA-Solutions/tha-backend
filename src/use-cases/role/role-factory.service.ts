import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from 'src/core/dto';
import { Role } from 'src/core/entities';

@Injectable()
export class RoleFactoryService {
  constructor() {}

  async createNewRole(createRoleDto: CreateRoleDto) {
    const newRole = new Role();

    newRole.name = createRoleDto.name;

    return newRole;
  }

  async updateRole(updateRoleDt: UpdateRoleDto) {
    const updatedRole = new Role();

    if (updateRoleDt.name) {
      updatedRole.name = updateRoleDt.name;
    }

    return updatedRole;
  }
}
