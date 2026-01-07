import { Request, Response } from "express";
import { HeroService } from "../services/hero.service";

export class HeroController {
  constructor(private heroService: HeroService) {}

  findOne = async (req: Request, res: Response) => {
    try {
      if (!req.params.id) throw new Error("400 bad request");
      const response = await this.heroService.getHeroById(req.params.id);
      res.status(200).send(response);
    } catch (err: any) {
      console.log(err);
      res.status(500).send({ error: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const response = await this.heroService.createNewHero(req.body);
      res.status(201).send(response);
    } catch (err: any) {
      console.log(err);
      res.status(500).send({ error: err.message });
    }
  };

  search = async (req: Request, res: Response) => {
    try {
      if (!req.params.text) throw new Error("400 bad request");
      const response = await this.heroService.searchHeroes(req.params.text);
      res.status(200).send(response);
    } catch (err: any) {
      console.log(err);
      res.status(500).send({ error: err.message });
    }
  };
}
