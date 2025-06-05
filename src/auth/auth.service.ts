import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prismaService: PrismaService;
  @Inject()
  private readonly jwtService: JwtService;

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');
    const payload = { email: user.email, userId: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
