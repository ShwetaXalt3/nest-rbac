import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    CONTENTCREATOR  = 'contentcreator',
    INFLUENCER  = 'influncer',
      AGENT = 'agent'
  }

@Entity()
export class DataStore{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique: true})
    @IsNotEmpty({ message: 'Username is required' })
    @IsString({ message: 'Username must be a string' })
    @Length(4, 20, { message: 'Username must be between 4 and 20 characters' })
    username : string;

    @Column()
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @Length(6, 10, { message: 'Password must be at least 6 characters long' })
    password : string;

    @Column({default:'user'})
    role : string;
}


 