import { Module } from '@nestjs/common';
import { KitchenController } from './app.controller';
import { AppService } from './app.service';
import { Order } from './entity/orders.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigModule, AppConfigService } from './commons/decorators/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => {
        return {
          type: configService.DB_TYPE,
          host: configService.DB_HOST,
          port: configService.DB_PORT,
          username: configService.DB_USER,
          password: configService.DB_PASS,
          database: configService.DB_NAME,
          synchronize: false,
          logging: false,
          extra: {
            min: 0,
            max: 20,
            idleTimeoutMillis: 10000,
          },
          connectTimeoutMS: 10000,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        } as TypeOrmModuleOptions;
      },
    }),
    TypeOrmModule.forFeature([Order]),
    AppConfigModule,
  ],
  controllers: [KitchenController],
  providers: [AppService],
})
export class AppModule {}
