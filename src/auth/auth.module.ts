import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataStore } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [TypeOrmModule.forFeature([DataStore]),
  JwtModule.register({
    secret : 'secret',
    signOptions : {expiresIn : '1h'}
  }),

],
  providers: [AuthService],
  controllers: [AuthController ]
})
export class AuthModule {}
