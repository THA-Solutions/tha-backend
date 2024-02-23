import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../use-cases/auth/auth.service';
import { SignInDto } from 'src/core/dto/request/signIn.dto';
import { Public } from 'src/config/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() signInDto: SignInDto) {
    const user = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    return user;
  }
}
