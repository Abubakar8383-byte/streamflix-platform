export type Movie = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  year: number;
  runtime: string;
  rating: number;
  ageRating: string;
  genres: string[];
  cast: {
    name: string;
    character: string;
    avatarUrl: string;
  }[];
  parentsGuide: {
    violence: { level: string; score: number };
    sexNudity: { level: string; score: number };
    profanity: { level: string; score: number };
    alcoholDrugs: { level: string; score: number };
    frightening: { level: string; score: number };
    summary: string;
  };
};

export const movies: Movie[] = [
  {
    id: "blade-runner-2049",
    title: "Blade Runner 2049",
    tagline: "There's still a page left to be written.",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    posterUrl: "https://image.tmdb.org/t/p/w500/gA9L1Av43939zB4X43p1.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/sA2yP22.jpg",
    trailerUrl: "https://www.youtube-nocookie.com/embed/gCcx85zbxz4?autoplay=1",
    year: 2017,
    runtime: "2h 44m",
    rating: 8.0,
    ageRating: "16+",
    genres: ["Sci-Fi", "Mystery", "Action"],
    cast: [
      { name: "Ryan Gosling", character: "K", avatarUrl: "https://image.tmdb.org/t/p/w185/lyUy148.jpg" },
      { name: "Harrison Ford", character: "Rick Deckard", avatarUrl: "https://image.tmdb.org/t/p/w185/743.jpg" }
    ],
    parentsGuide: {
      violence: { level: "Moderate", score: 65 },
      sexNudity: { level: "Moderate", score: 55 },
      profanity: { level: "Moderate", score: 45 },
      alcoholDrugs: { level: "Mild", score: 20 },
      frightening: { level: "Moderate", score: 60 },
      summary: "Contains sci-fi violence, intense combat, and brief nudity."
    }
  },
  {
    id: "the-batman",
    title: "The Batman",
    tagline: "Unmask the truth.",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    posterUrl: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25m1rM.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/5P8L3z31R23.jpg",
    trailerUrl: "https://www.youtube-nocookie.com/embed/mqqft2x_Aa4?autoplay=1",
    year: 2022,
    runtime: "2h 56m",
    rating: 7.7,
    ageRating: "16+",
    genres: ["Action", "Crime", "Drama"],
    cast: [
      { name: "Robert Pattinson", character: "Bruce Wayne / Batman", avatarUrl: "https://image.tmdb.org/t/p/w185/862.jpg" }
    ],
    parentsGuide: {
      violence: { level: "Severe", score: 85 },
      sexNudity: { level: "Mild", score: 15 },
      profanity: { level: "Moderate", score: 50 },
      alcoholDrugs: { level: "Mild", score: 30 },
      frightening: { level: "Severe", score: 80 },
      summary: "Gritty dark thriller featuring strong violence and disturbing scenes."
    }
  },
  {
    id: "interstellar",
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    description: "When Earth becomes uninhabitable, a team of ex-NASA pilots travel through a wormhole in search of a new home for humanity.",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2Q2L21.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/xJH32.jpg",
    trailerUrl: "https://www.youtube-nocookie.com/embed/zSWdZVtXT7E?autoplay=1",
    year: 2014,
    runtime: "2h 49m",
    rating: 8.7,
    ageRating: "13+",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    cast: [
      { name: "Matthew McConaughey", character: "Cooper", avatarUrl: "https://image.tmdb.org/t/p/w185/123.jpg" }
    ],
    parentsGuide: {
      violence: { level: "Mild", score: 30 },
      sexNudity: { level: "None", score: 0 },
      profanity: { level: "Mild", score: 35 },
      alcoholDrugs: { level: "None", score: 0 },
      frightening: { level: "Severe", score: 75 },
      summary: "Intense space peril, catastrophic disasters, and emotional distress."
    }
  }
];
  
