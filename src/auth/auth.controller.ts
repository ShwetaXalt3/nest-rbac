import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('app')
export class AuthController {
    constructor(private userService: AuthService) {}
    
    @Post('register')
    async register(
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('role') role: string
    ) {
        try {
            await this.userService.registration(username, password, role);
            return { message: "Registration successful" };
        } catch (error) {
            throw new HttpException(
                error.message || 'Internal Server Error',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    @Post('login')
    async login(
        @Body('username') username: string,
        @Body('password') password: string,
    ) {
        try {
            const result = await this.userService.login(username, password);
            
            return {        
                message: 'Login Successful',
                 result : result
            };
        } catch (err) {
            throw new HttpException(
                err.message || 'Internal Server Error',
                err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}