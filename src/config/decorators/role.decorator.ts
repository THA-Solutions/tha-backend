import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/use-cases/auth/enums';

export const ROLE_KEY = 'role';

export const Roles = (...role: Role[]) => SetMetadata(ROLE_KEY, role);
