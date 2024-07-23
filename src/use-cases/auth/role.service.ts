import { Injectable } from '@nestjs/common';

import { Role } from './enums';
import { RoleRepository } from 'src/frameworks/data-services/database';

interface IsAuthorizedParams {
  currentRole: Role;
  requiredRole: Role;
}

@Injectable()
export class RoleService {
  private hierarchy: Map<Role, number> = new Map();

  constructor(private roleRepository: RoleRepository) {
    this.buildRoles([
      Role.GUEST,
      Role.USER,
      Role.CUSTOMER,
      Role.DISTRIBUTOR,
      Role.INTEGRATOR,
      Role.ADMIN,
    ]);
  }

  private buildRoles(roles: Role[]) {
    roles.forEach((role, index) => {
      this.hierarchy.set(role, index + 1); // Começa em 1 para garantir que cada papel tenha uma prioridade única
    });
  }

  public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
    const priorityCurrentRole = this.hierarchy.get(currentRole);
    const priorityRequiredRole = this.hierarchy.get(requiredRole);

    return (
      priorityCurrentRole !== undefined &&
      priorityRequiredRole !== undefined &&
      priorityCurrentRole >= priorityRequiredRole
    );
  }

  async findById(id: string) {
    const role = await this.roleRepository.findById(id);
    return role;
  }

  async create(data) {
    const role = await this.roleRepository.create(data);

    return role;
  }
  
}
