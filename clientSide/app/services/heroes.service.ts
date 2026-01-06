import { apiRequest } from "../lib/api-client";

export const heroesService = {
  async getHero(id: number) {
    const res = await apiRequest(`http://localhost:9000/api/hero/${id}`, {
      cache: "no-cache",
    });
    console.log("hero: ", res);
    return res;
  },
};
