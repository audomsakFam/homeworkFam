import { Controller } from '@nestjs/common';
import { HerosService } from './heros.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class HerosController {
  constructor(private readonly herosService: HerosService) {}

  @GrpcMethod('HeroService', 'Search')
  async search(data: { text: string }) {
    const result = await this.herosService.search(data.text);
    console.log('Data sending from NestJS:', JSON.stringify(result, null, 2)); // ดูว่ามี highlightedName ไหม
    return { heroes: result };
  }

  @GrpcMethod('HeroService', 'FindOne')
  async findOne(data: { id: string }) {
    console.log(data.id);
    const hero = await this.herosService.findOne(data.id);
    if (!hero) {
      return {};
    }
    return hero;
  }

  @GrpcMethod('HeroService', 'CreateHero')
  async createHero(data: { name: string; power: string }) {
    return await this.herosService.create(data.name, data.power);
  }
}
