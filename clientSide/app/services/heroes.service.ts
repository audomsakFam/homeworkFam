import { apiRequest } from "../lib/api-client";
import { Heroes } from "../types";

export const heroesService = {
  async getHero(id: string) {
    const res = await apiRequest(`http://localhost:9000/api/hero/${id}`, {
      cache: "no-cache",
    });
    console.log("hero: ", res);
    return res;
  },

  async searchHero(text: string) {
    const res = await apiRequest<{ heroes: Heroes[] }>(
      `http://localhost:9000/api/hero/search/${text}`
    );
    console.log("hero: ", res);
    return res.heroes;
  },
};
