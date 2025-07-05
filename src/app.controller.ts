import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderCreatedEvent } from './shared/order.dto';

@Controller()
export class KitchenController {
  @MessagePattern('order_created')
  processOrder(data: OrderCreatedEvent) {
    console.log(`[Kitchen] Processing order ID: ${data.orderId}`);
    console.log(`[Kitchen] Order Status : ${data.product.status}`);

    // // update status to 'processing'
    // data.product.status = 'processing';
    // console.log(`[Kitchen] Updated Order Status : ${data.product.status}`);

    // Simulasi proses memasak
    return { status: 'Order processed in kitchen' };
  }
}
