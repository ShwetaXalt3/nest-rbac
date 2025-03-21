import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { DataStore } from '../auth/auth.entity';
import { UserManagementController } from './userManagement.controller';
import { UserManagementService } from './userManagement.service';
import { AdminGuard } from '../guards/adminguard';

@Module({
  imports: [
    TypeOrmModule.forFeature([DataStore]),
    JwtModule.register({
      secret: 'secret', 
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService, AdminGuard],
})
export class UserManagementModule {}