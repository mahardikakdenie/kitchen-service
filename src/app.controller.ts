import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderCreatedEvent } from './shared/order.dto';
import { AppService } from './app.service';

@Controller()
export class KitchenController {
  // Constructor can be added here if needed for dependency injection
  constructor(private readonly appService: AppService) {}
  @MessagePattern('order_created')
  processOrder(data: OrderCreatedEvent) {
    console.log(
      `[${new Date().toISOString()}] 🍳 Memulai proses pesanan:`,
      data.orderId,
    );

    void this.appService.updateStatus(data.orderId, 'progress');

    // Simulasi proses memasak
    return { status: 'Order processed in kitchen' };
  }
}
