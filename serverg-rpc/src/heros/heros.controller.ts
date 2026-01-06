import { Controller } from '@nestjs/common';
import { HerosService } from './heros.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class HerosController {
  constructor(private readonly herosService: HerosService) {}

  @GrpcMethod('HeroService', 'FindOne')
  findOne(data: { id: number }) {
    const heros = [
      { id: 1, name: 'Ironman', power: 'Tech' },
      { id: 2, name: 'Thor', power: 'Thunder' },
    ];
    return heros.find((h) => h.id === data.id);
  }
}
