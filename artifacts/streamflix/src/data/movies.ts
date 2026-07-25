export type CastMember = {
  name: string;
  character: string;
  avatarUrl: string;
};

export type Movie = {
  id: string;
  title: string;
  tagline: string;
  description: string;

  year: number;
  runtime: string;
  rating: number;

  genres: string[];

  posterUrl: string;
  backdropUrl: string;

  cast: CastMember[];

  featured?: boolean;

  // NEW
  trailerUrl?: string;
  director?: string;
  writers?: string[];
  ageRating?: string;

  parentsGuide?: {
    violence: string;
    sexNudity: string;
    profanity: string;
    alcoholDrugsSmoking: string;
    frighteningScenes: string;
    summary: string;
  };
};

const generateCast = (seed: string): CastMember[] => [
  { name: `John ${seed}son`, character: "Protagonist", avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=John${seed}` },
  { name: `Jane Doe${seed}`, character: "Co-Star", avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=Jane${seed}` },
  { name: `Max ${seed}well`, character: "Antagonist", avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=Max${seed}` },
  { name: `Sara ${seed}smith`, character: "Sidekick", avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=Sara${seed}` },
];

export const movies: Movie[] = [
  {
    id: "m1",
    title: "Neon Echoes",
    tagline: "The future is listening.",
    description: "In a sprawling cyberpunk metropolis, a renegade hacker discovers a signal that could unravel the fabric of their digitized reality. Hunted by corporate mercenaries, they must decode the ultimate truth before their world is formatted.",
    year: 2042,
    rating: 8.7,
    runtime: "2h 15m",
    genres: ["Sci-Fi", "Action", "Thriller"],
    posterUrl: "https://picsum.photos/seed/m1/400/600",
    backdropUrl: "https://picsum.photos/seed/m1-bg/1280/720",
    cast: generateCast("Neon"),
    featured: true
  },
  {
    id: "m2",
    title: "Shadow Protocol",
    tagline: "Trust no one.",
    description: "An elite operative is burned by their own agency and left for dead. Now, they must navigate a global conspiracy while staying one step ahead of the very people who trained them.",
    year: 2023,
    rating: 7.9,
    runtime: "2h 05m",
    genres: ["Action", "Thriller"],
    posterUrl: "https://picsum.photos/seed/m2/400/600",
    backdropUrl: "https://picsum.photos/seed/m2-bg/1280/720",
    cast: generateCast("Shadow"),
    featured: true
  },
  {
    id: "m3",
    title: "The Last Symphony",
    tagline: "Music was their only escape.",
    description: "Set against the backdrop of a war-torn continent, a renowned cellist finds solace and an unexpected connection with an enemy soldier through their shared love of music.",
    year: 2022,
    rating: 9.1,
    runtime: "2h 30m",
    genres: ["Drama", "Romance"],
    posterUrl: "https://picsum.photos/seed/m3/400/600",
    backdropUrl: "https://picsum.photos/seed/m3-bg/1280/720",
    cast: generateCast("Symphony")
  },
  {
    id: "m4",
    title: "Cosmic Drift",
    tagline: "Lost in the void.",
    description: "A deep-space exploration vessel is knocked off course by a mysterious anomaly. The crew must survive the harsh realities of unknown space while battling their own internal fractures.",
    year: 2024,
    rating: 8.3,
    runtime: "2h 45m",
    genres: ["Sci-Fi", "Drama"],
    posterUrl: "https://picsum.photos/seed/m4/400/600",
    backdropUrl: "https://picsum.photos/seed/m4-bg/1280/720",
    cast: generateCast("Cosmic")
  },
  {
    id: "m5",
    title: "Midnight Heist",
    tagline: "Take it all.",
    description: "A crew of master thieves plans an impossible heist at the world's most secure casino. The catch? They only have one hour before the vault seals forever.",
    year: 2021,
    rating: 7.5,
    runtime: "1h 55m",
    genres: ["Action", "Comedy"],
    posterUrl: "https://picsum.photos/seed/m5/400/600",
    backdropUrl: "https://picsum.photos/seed/m5-bg/1280/720",
    cast: generateCast("Heist")
  },
  {
    id: "m6",
    title: "Whispering Pines",
    tagline: "Some secrets never stay buried.",
    description: "A family retreats to a secluded cabin in the woods, only to realize the forest around them is alive with an ancient, malevolent force that feeds on their fears.",
    year: 2023,
    rating: 6.8,
    runtime: "1h 48m",
    genres: ["Horror", "Thriller"],
    posterUrl: "https://picsum.photos/seed/m6/400/600",
    backdropUrl: "https://picsum.photos/seed/m6-bg/1280/720",
    cast: generateCast("Pines")
  },
  {
    id: "m7",
    title: "Urban Legends",
    tagline: "The myths are real.",
    description: "A detective in a modern metropolis starts seeing patterns in a series of bizarre crimes that mirror the city's darkest urban myths.",
    year: 2020,
    rating: 7.2,
    runtime: "2h 10m",
    genres: ["Thriller", "Drama"],
    posterUrl: "https://picsum.photos/seed/m7/400/600",
    backdropUrl: "https://picsum.photos/seed/m7-bg/1280/720",
    cast: generateCast("Urban")
  },
  {
    id: "m8",
    title: "Solar Flare",
    tagline: "The sun is angry.",
    description: "When a massive solar flare threatens to wipe out Earth's technology, a team of brilliant scientists races against time to build a shield that could save humanity.",
    year: 2025,
    rating: 8.0,
    runtime: "2h 20m",
    genres: ["Sci-Fi", "Action"],
    posterUrl: "https://picsum.photos/seed/m8/400/600",
    backdropUrl: "https://picsum.photos/seed/m8-bg/1280/720",
    cast: generateCast("Solar")
  },
  {
    id: "m9",
    title: "Love in the Time of AI",
    tagline: "Can an algorithm calculate love?",
    description: "In a world where romance is strictly curated by advanced algorithms, two rebels decide to date the old-fashioned way, risking social exile.",
    year: 2024,
    rating: 7.7,
    runtime: "1h 50m",
    genres: ["Romance", "Comedy", "Sci-Fi"],
    posterUrl: "https://picsum.photos/seed/m9/400/600",
    backdropUrl: "https://picsum.photos/seed/m9-bg/1280/720",
    cast: generateCast("LoveAI")
  },
  {
    id: "m10",
    title: "The Silent Peak",
    tagline: "Survive the climb.",
    description: "A documentary crew follows the world's greatest mountaineer as they attempt an unclimbed, notoriously deadly peak in the Himalayas.",
    year: 2022,
    rating: 8.9,
    runtime: "1h 45m",
    genres: ["Documentary", "Action"],
    posterUrl: "https://picsum.photos/seed/m10/400/600",
    backdropUrl: "https://picsum.photos/seed/m10-bg/1280/720",
    cast: generateCast("Peak")
  },
  {
    id: "m11",
    title: "Velvet Nights",
    tagline: "Glamour has a price.",
    description: "A sweeping drama about the rise and fall of a jazz club empire in the 1920s, full of passion, betrayal, and unforgettable music.",
    year: 2021,
    rating: 8.5,
    runtime: "2h 40m",
    genres: ["Drama", "Romance"],
    posterUrl: "https://picsum.photos/seed/m11/400/600",
    backdropUrl: "https://picsum.photos/seed/m11-bg/1280/720",
    cast: generateCast("Velvet")
  },
  {
    id: "m12",
    title: "Fractured Minds",
    tagline: "Reality is subjective.",
    description: "A brilliant psychologist begins to suffer from the same terrifying hallucinations as their patients, leading them down a dark path to uncover a hidden conspiracy.",
    year: 2023,
    rating: 8.1,
    runtime: "2h 08m",
    genres: ["Thriller", "Horror"],
    posterUrl: "https://picsum.photos/seed/m12/400/600",
    backdropUrl: "https://picsum.photos/seed/m12-bg/1280/720",
    cast: generateCast("Fractured")
  },
  {
    id: "m13",
    title: "Kings of the Asphalt",
    tagline: "Born to race.",
    description: "Underground street racers go head-to-head in a cross-country rally where the winner takes all, and the losers lose everything.",
    year: 2024,
    rating: 7.4,
    runtime: "2h 12m",
    genres: ["Action", "Drama"],
    posterUrl: "https://picsum.photos/seed/m13/400/600",
    backdropUrl: "https://picsum.photos/seed/m13-bg/1280/720",
    cast: generateCast("Kings")
  },
  {
    id: "m14",
    title: "Laughing Matter",
    tagline: "Stand up or fall down.",
    description: "A struggling stand-up comedian accidentally becomes the leader of a massive political movement after a viral rant.",
    year: 2023,
    rating: 7.8,
    runtime: "1h 58m",
    genres: ["Comedy", "Drama"],
    posterUrl: "https://picsum.photos/seed/m14/400/600",
    backdropUrl: "https://picsum.photos/seed/m14-bg/1280/720",
    cast: generateCast("Laughing")
  },
  {
    id: "m15",
    title: "Beneath the Ice",
    tagline: "Cold dark depths.",
    description: "Researchers at an Antarctic station discover something ancient frozen in the ice. As it thaws, they realize it isn't dead.",
    year: 2022,
    rating: 7.6,
    runtime: "1h 52m",
    genres: ["Horror", "Sci-Fi"],
    posterUrl: "https://picsum.photos/seed/m15/400/600",
    backdropUrl: "https://picsum.photos/seed/m15-bg/1280/720",
    cast: generateCast("Beneath")
  },
  {
    id: "m16",
    title: "The Art of War",
    tagline: "History written in blood.",
    description: "An epic historical drama detailing the strategic genius and brutal reality of one of the greatest military campaigns in history.",
    year: 2021,
    rating: 8.8,
    runtime: "3h 05m",
    genres: ["Drama", "Action", "Documentary"],
    posterUrl: "https://picsum.photos/seed/m16/400/600",
    backdropUrl: "https://picsum.photos/seed/m16-bg/1280/720",
    cast: generateCast("ArtWar")
  },
  {
    id: "m17",
    title: "Cybernetic Hearts",
    tagline: "Love transcends hardware.",
    description: "An android designed for war begins to develop consciousness and falls in love with the mechanic tasked with disassembling them.",
    year: 2025,
    rating: 8.2,
    runtime: "2h 00m",
    genres: ["Sci-Fi", "Romance"],
    posterUrl: "https://picsum.photos/seed/m17/400/600",
    backdropUrl: "https://picsum.photos/seed/m17-bg/1280/720",
    cast: generateCast("Cybernetic")
  },
  {
    id: "m18",
    title: "Neon Shadows",
    tagline: "The glow hides the truth.",
    description: "A neon-drenched noir thriller about a private eye who uncovers a sprawling syndicate while searching for a missing pop star.",
    year: 2023,
    rating: 7.9,
    runtime: "2h 15m",
    genres: ["Thriller", "Action"],
    posterUrl: "https://picsum.photos/seed/m18/400/600",
    backdropUrl: "https://picsum.photos/seed/m18-bg/1280/720",
    cast: generateCast("Shadows2")
  },
  {
    id: "m19",
    title: "The Chef's Table",
    tagline: "A taste of perfection.",
    description: "A fast-paced dramedy following an obsessive head chef trying to earn their third Michelin star while their personal life falls apart.",
    year: 2024,
    rating: 8.6,
    runtime: "1h 45m",
    genres: ["Drama", "Comedy"],
    posterUrl: "https://picsum.photos/seed/m19/400/600",
    backdropUrl: "https://picsum.photos/seed/m19-bg/1280/720",
    cast: generateCast("Chef")
  },
  {
    id: "m20",
    title: "Ocean's Edge",
    tagline: "The deep holds secrets.",
    description: "A gripping documentary exploring the uncharted depths of the Mariana Trench and the terrifying, beautiful creatures that live there.",
    year: 2022,
    rating: 9.0,
    runtime: "1h 35m",
    genres: ["Documentary"],
    posterUrl: "https://picsum.photos/seed/m20/400/600",
    backdropUrl: "https://picsum.photos/seed/m20-bg/1280/720",
    cast: generateCast("Ocean")
  }
];

export const categories = [
  { id: "trending", title: "Trending Now", movies: movies.slice(0, 8) },
  { id: "action", title: "Action & Thriller", movies: movies.filter(m => m.genres.includes("Action") || m.genres.includes("Thriller")) },
  { id: "drama", title: "Drama", movies: movies.filter(m => m.genres.includes("Drama")) },
  { id: "top-rated", title: "Top Rated", movies: [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10) },
  { id: "new", title: "New Releases", movies: movies.filter(m => m.year >= 2024) },
];
