import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Profile } from './typeorm/entities/Profile';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '9860200467aA',
      database: 'nestjs_tutorial',
      entities: [User, Profile],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
