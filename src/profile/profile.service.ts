import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataStore } from '../auth/auth.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(DataStore)
    private userRepository: Repository<DataStore>,
  ) {}

  async getUserProfile(user: any) {
    
     
    return  await this.userRepository.findOne({ where: { id: user.id } });
  }
}
