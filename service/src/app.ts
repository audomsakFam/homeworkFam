import express, { response } from "express";
import menuRoutes from "./routes/menu.routes";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

export const app = express();
const packageDef = protoLoader.loadSync("../hero.proto");
const heroProto = grpc.loadPackageDefinition(packageDef).hero as any;
const client = new heroProto.HeroService(
  "localhost:8000",
  grpc.credentials.createInsecure()
);

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

app.get("/api/hero/:id", (req, res) => {
  const id = parseInt(req.params.id);

  client.findOne({ id }, (err: { message: any; }, response: any) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(response);
  });
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
