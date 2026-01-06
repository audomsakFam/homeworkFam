import express from "express";
import menuRoutes from "./routes/menu.routes";

export const app = express();

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
