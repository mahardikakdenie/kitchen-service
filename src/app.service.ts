/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/orders.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAllOrders() {
    return this.orderRepository.find();
  }

  async updateStatus(
    id: string | number | undefined,
    status: string,
  ): Promise<Order> {
    if (id === undefined || id === null) {
      throw new Error('ID is required');
    }

    const numericId = parseInt(id.toString(), 10);

    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }

    const order = await this.orderRepository.findOneBy({ id: numericId });

    if (!order) {
      throw new Error('Order not found');
    }

    order.status = status;
    return this.orderRepository.save(order);
  }
}
