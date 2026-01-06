import { Module } from '@nestjs/common';
import { HerosService } from './heros.service';
import { HerosController } from './heros.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200', // URL ของ ES ของคุณ
    }),
  ],
  controllers: [HerosController],
  providers: [HerosService],
})
export class HerosModule {}
