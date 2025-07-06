import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: process.env.RABBITMQ_URLS
          ? [process.env.RABBITMQ_URLS]
          : ['amqp://guest:guest@localhost:5672'],
        queue: process.env.RABBITMQ_QUEUE_PROCESS ?? '',
        noAck: false,
        queueOptions: {
          durable: true,
          arguments: {
            'x-queue-type': 'quorum',
          },
        },
      },
    },
  );
  app.get(DataSource);
  await app.listen();
}
void bootstrap();
