import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'order.process',
        noAck: false,
        queueOptions: {
          durable: true,
          arguments: {
            'x-queue-type': 'quorum', // <- tambahkan ini
          },
        },
      },
    },
  );
  await app.listen();
}
void bootstrap();
