import { promisify } from "util";
import {
  Hero,
  HeroById,
  HeroInput,
  HeroList,
  HeroServiceClient,
  SearchQuery,
} from "../../../serverg-rpc/shared/models/hero";
import { BaseGrpcService } from "./base-grpc.service";

export class HeroService extends BaseGrpcService<HeroServiceClient> {
  private findOneRpc = this.createRpc<HeroById, Hero>("findOne");
  private createRpcMethod = this.createRpc<HeroInput, Hero>("createHero");
  private searchRpc = this.createRpc<SearchQuery, HeroList>("search");

  async getHeroById(id: string) {
    return await this.findOneRpc({ id });
  }

  async createNewHero(data: HeroInput) {
    return await this.createRpcMethod(data);
  }

  async searchHeroes(text: string) {
    console.log(text);
    return await this.searchRpc({ text });
  }
}
