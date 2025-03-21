import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataStore, UserRole } from '../auth/auth.entity';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(DataStore)
    private userRepository: Repository<DataStore>,
  ) {}

  async getAllUsers() {
    try {
      return await this.userRepository.find({
        select: ['id', 'username', 'role'],
      });
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserRole(id: number, role: string) {
  
    const validRoles = Object.values(UserRole);
    
    if (!validRoles.includes(role as UserRole)) {
      throw new HttpException(
        `Invalid role. Valid roles are: ${validRoles.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const user = await this.userRepository.findOne({ where: { id } });
      
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      user.role = role;
      await this.userRepository.save(user);
      
      return {
        message: 'User role updated successfully',
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update user role',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}