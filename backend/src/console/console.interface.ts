export interface Game {
  gameName: string;
  year: number;
  genre: string;
}

export interface Console {
  id: string;
  name: string;
  releaseYear: number;
  manufacturer: string;
  topGames: Game[];
}
