import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Hero } from 'shared/models/hero';

@Injectable()
export class HerosService {
  constructor(private readonly esService: ElasticsearchService) {}

  async findOne(id: string): Promise<Hero | null> {
    try {
      const res = await this.esService.get<Hero>({
        index: 'hero',
        id: id,
      });

      return {
        ...(res._source as Hero),
        id: res._id,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async search(text: string): Promise<Hero[]> {
    const res = await this.esService.search({
      index: 'hero',
      query: {
        multi_match: {
          query: text,
          fields: ['name', 'power'],
          type: 'phrase_prefix',
        },
      },
      highlight: {
        fields: {
          name: {},
          power: {},
        },
        pre_tags: ['<b class="text-indigo-600 underline">'],
        post_tags: ['</b>'],
      },
    });

    return res.hits.hits.map((item) => {
      const source = item._source as Hero;
      const hName = item.highlight?.name ? item.highlight.name[0] : source.name;
      const hPower = item.highlight?.power
        ? item.highlight.power[0]
        : source.power;

      return {
        ...source,
        id: item._id,
        name: source.name,
        power: source.power,
        highlightedName: hName,
        highlightedPower: hPower,
      };
    });
  }

  async create(name: string, power: string): Promise<Hero> {
    const res = await this.esService.index({
      index: 'hero',
      document: { name, power },
    });

    return {
      id: res._id,
      name,
      power,
      highlightedName: name,
      highlightedPower: power,
    };
  }
}
