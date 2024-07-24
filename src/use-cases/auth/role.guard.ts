import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from 'src/config/decorators/public.decorator';
import { Role } from './enums';
import { ROLE_KEY } from 'src/config/decorators/role.decorator';
import { RoleService } from './role.service';

export class TokenDto {
  id: string;
  role: Role;
}

@Injectable()
export class RoleGuard implements CanActivate {

  private defaultRoles = {
              Supplier: 'Supplier',
              Customer: 'Customer',
              Integrator: 'Integrator',
              User: 'User',
  };

  constructor(
    private reflector: Reflector,
    private roleService: RoleService,
  ) {}
  async canActivate(context: ExecutionContext) {
    if (
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
    ) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    let request = context.switchToHttp().getRequest();

    let roleToken = this.extractTokenFromHeader(request);

    const role =
      roleToken != 'null' && roleToken && roleToken != 'guest'
        ? await this.roleService.findById(roleToken).then(async (role) => {
          if (!role) {
            if (this.defaultRoles[roleToken]) {
              return await this.roleService.create({
                name: this.defaultRoles[roleToken],
              } as any).then((role) => {
                return role.name;
              })
            }
            else {
              return Role.GUEST
            }
          }
            return role.name;
          })
        : 'guest';


    const hasRole = requiredRoles.some((reqRole) =>
      reqRole.includes(role as Role),
    );

    if (!hasRole) {
      return false;
    }
    
    for (const requiredRole of requiredRoles) {
      const result = this.roleService.isAuthorized({
        currentRole: (role as Role) || Role.GUEST,
        requiredRole: requiredRole,
      });


      if (result) {
        return true;
      }
    }
    return false;
  }

  private extractTokenFromHeader(request: any): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
