import { promisify } from "util";

export abstract class BaseGrpcService<TClient> {
  constructor(protected readonly client: TClient) {}

  protected createRpc<TReq, TRes>(
    methodName: keyof TClient
  ): (request: TReq) => Promise<TRes> {
    const method = (this.client as any)[methodName];

    if (!method) {
      throw new Error(`Method ${String(methodName)} not found on gRPC client`);
    }

    return promisify(method).bind(this.client);
  }
}
