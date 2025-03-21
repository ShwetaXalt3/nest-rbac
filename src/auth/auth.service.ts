import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataStore } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(DataStore)
    private userRepository: Repository<DataStore>,
    private JwtService  : JwtService
  ) { }

 
  

  async registration(username: string, password: string, role: string): Promise<DataStore> {
    if (role.toLowerCase() === "admin") {
      throw new HttpException(
        "You can only register as a user. Admins must assign roles.",
        HttpStatus.FORBIDDEN
      );
    }
    const existing = await this.userRepository.findOne({ where: { username } })
    if (existing) {
      throw new Error('User already exists')
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({ username, password: hashedPassword, role });
      return this.userRepository.save(user);
    } catch (err) {
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } })

    if (!user) {
      throw new HttpException('Invalid Username', HttpStatus.UNAUTHORIZED);

    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
    }
    
    const payload = {username : user.username , id : user.id , role: user.role};
    const token = this.JwtService.sign(payload);
    
      return {
        token: token,
        user: user
      };
      

  }
}
