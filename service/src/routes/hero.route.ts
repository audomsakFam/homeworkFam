import { Router } from "express";
import { HeroController } from "../controllers/hero.controller";
import { HeroService } from "../services/hero.service";
import { heroClient } from "../config/grpc-client";

const router = Router();

const heroService = new HeroService(heroClient);
const heroController = new HeroController(heroService);

router.get("/:id", heroController.findOne);
router.post("/", heroController.create);
router.get("/search/:text", heroController.search);

export default router;
