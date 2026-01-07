import { promisify } from "util";
import { HeroInput, HeroServiceClient } from "../../../serverg-rpc/shared/models/hero";

export class HeroService {
  private findOneRpc: any;
  private createRpc: any;
  private searchRpc: any;

  constructor(private client: HeroServiceClient) {
    this.findOneRpc = promisify(this.client.findOne).bind(this.client);
    this.createRpc = promisify(this.client.createHero).bind(this.client);
    this.searchRpc = promisify(this.client.search).bind(this.client);
  }

  async getHeroById(id: string) {
    return await this.findOneRpc({ id });
  }

  async createNewHero(data: HeroInput) {
    return await this.createRpc(data);
  }

  async searchHeroes(text: string) {
    console.log(text);
    return await this.searchRpc({ text });
  }
}
