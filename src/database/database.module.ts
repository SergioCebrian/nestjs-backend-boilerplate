import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@database/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        GOOGLE_AUTH_CLIENT_ID: configService.get('GOOGLE_AUTH_CLIENT_ID'),
        GOOGLE_AUTH_CLIENT_SECRET: configService.get(
          'GOOGLE_AUTH_CLIENT_SECRET',
        ),
        autoLoadEntities: true,
        logging: Boolean(configService.get('DB_LOG')),
        synchronize: Boolean(configService.get('DB_SYNC')),
        extra: { charset: 'utf8mb4_unicode_ci' }, // Define charset utf8mb4 if you want to be able to store emoji in database.
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class DatabaseModule {}
