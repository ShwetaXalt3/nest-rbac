// import { Module } from '@nestjs/common';

// import { AuthModule } from './auth/auth.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserManagementModule } from './user/userManagement.module';
// import { ProfileModule } from './profile/profile.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//              type : "postgres",
//              host : "localhost",
//              port : 5433,
//              username : "postgres",
//              password : "123456",
//              database : "postgres",
//              autoLoadEntities : true,
//             synchronize : true
//     }),
//     AuthModule,
//     UserManagementModule,
//     ProfileModule],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManagementModule } from './user/userManagement.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: "postgresql://postgres.mbocgeifyqznznzfitas:Rbac@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false }
    }),
    
    AuthModule,
    UserManagementModule,
    ProfileModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
