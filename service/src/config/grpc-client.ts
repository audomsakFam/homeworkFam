import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {
  HeroServiceClient,
  HERO_PACKAGE_NAME,
  HERO_SERVICE_NAME,
} from "../../../serverg-rpc/shared/models/hero";
import path from "path";

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
export const heroClient = new proto[HERO_PACKAGE_NAME]![HERO_SERVICE_NAME](
  "localhost:8000",
  grpc.credentials.createInsecure()
) as unknown as HeroServiceClient;
