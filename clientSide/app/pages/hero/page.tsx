import { heroesService } from "@/app/services/heroes.service";

const HeroPage = async () => {
  const hero = await heroesService.getHero(1);
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <h1>{JSON.stringify(hero, null, 2)}</h1>
    </div>
  );
};

export default HeroPage;
