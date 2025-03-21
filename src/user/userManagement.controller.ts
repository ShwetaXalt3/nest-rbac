import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserManagementService } from './userManagement.service';
import { AdminGuard } from '../guards/adminguard';

@Controller('admin/users')
@UseGuards(AdminGuard)
export class UserManagementController {
  constructor(private userManagementService: UserManagementService) {}

  @Get()
  async getAllUsers() {
    return this.userManagementService.getAllUsers();
  }

  @Put(':id/role')                             
  async updateUserRole(
    @Param('id') id: number,
    @Body('role') role: string,                 
  ) {
    return this.userManagementService.updateUserRole(id, role);
  }
}