import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/authguard';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Request() req) {
    return this.profileService.getUserProfile(req.user);
  }
}
