import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataStore } from '../auth/auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([DataStore]),
JwtModule.register({
  secret : 'secret',
  signOptions : {expiresIn : '1h'}
})],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
