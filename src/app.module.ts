import { Module } from '@nestjs/common';
import { KitchenController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [KitchenController],
  providers: [AppService],
})
export class AppModule {}
