import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/authguard';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {}
