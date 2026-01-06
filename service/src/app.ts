import express, { response } from "express";
import menuRoutes from "./routes/menu.routes";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {
  HeroServiceClient,
  HeroById,
  HERO_PACKAGE_NAME,
  HERO_SERVICE_NAME,
  HeroInput,
  SearchQuery,
} from "../../serverg-rpc/shared/models/hero";
import { promisify } from "util";
import path from "path";

export const app = express();

const PROTO_PATH = path.join(process.cwd(), "../serverg-rpc/shared/hero.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDef) as unknown as {
  [key: string]: { [key: string]: any };
};
const client = new proto[HERO_PACKAGE_NAME]![HERO_SERVICE_NAME](
  "localhost:8000",
  grpc.credentials.createInsecure()
) as unknown as HeroServiceClient;

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/menu", menuRoutes);

app.get("/", (req, res) => {
  res.send({ msg: "ok" });
});

const findOneHero = promisify(client.findOne).bind(client);
const createHero = promisify(client.createHero).bind(client);
const searchHero = promisify(client.search).bind(client);

app.get("/hero/:id", async (req, res) => {
  try {
    const request: HeroById = { id: req.params.id };

    const response = await findOneHero(request);

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/hero", async (req, res) => {
  try {
    const request: HeroInput = { name: req.body.name, power: req.body.power };
    const response = await createHero(request);

    res.status(201).json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/hero/search/:text", async (req, res) => {
  try {
    const request: SearchQuery = { text: req.params.text };

    const response = await searchHero(request);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/streaming", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();
  console.log("client connected");

  const test = setInterval(() => {
    res.write(`data: ${JSON.stringify({ hello: "world" })}\n\n`);
  }, 3000);

  res.on("close", () => {
    console.log("client disconnent");
    clearTimeout(test);
    res.end();
  });
});
