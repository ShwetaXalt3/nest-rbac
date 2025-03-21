import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/guards/authguard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataStore } from 'src/auth/auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
       imports : [
        TypeOrmModule.forFeature([DataStore]),
        JwtModule.register({
          secret : 'secret',
          signOptions : { expiresIn : '1h'}
        })

       ],

  controllers: [ProfileController],
  providers: [ProfileService , AuthGuard]
})
export class ProfileModule {}
