// Mock movie data for testing
export const mockMovie = {
  id: 550,
  title: 'Fight Club',
  original_title: 'Fight Club',
  overview:
    'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
  poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  backdrop_path: '/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg',
  release_date: '1999-10-15',
  vote_average: 8.4,
  vote_count: 26280,
  popularity: 61.416,
  adult: false,
  video: false,
  genre_ids: [18, 53, 35],
};

export const mockMovieDetails = {
  ...mockMovie,
  runtime: 139,
  status: 'Released',
  tagline: 'Mischief. Mayhem. Soap.',
  budget: 63000000,
  revenue: 100853753,
  genres: [
    { id: 18, name: 'Drama' },
    { id: 53, name: 'Thriller' },
    { id: 35, name: 'Comedy' },
  ],
  production_companies: [
    {
      id: 508,
      name: 'Regency Enterprises',
      logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png',
      origin_country: 'US',
    },
  ],
};

export const mockMovieList = [
  mockMovie,
  {
    id: 551,
    title: 'The Matrix',
    overview: 'A computer hacker learns about the true nature of reality.',
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop_path: '/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    release_date: '1999-03-31',
    vote_average: 8.2,
    vote_count: 24280,
  },
  {
    id: 552,
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through dream-sharing technology.',
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    release_date: '2010-07-16',
    vote_average: 8.4,
    vote_count: 33280,
  },
];

export const mockMovieCredits = {
  id: 550,
  cast: [
    {
      id: 819,
      name: 'Edward Norton',
      character: 'The Narrator',
      profile_path: '/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg',
      order: 0,
    },
    {
      id: 287,
      name: 'Brad Pitt',
      character: 'Tyler Durden',
      profile_path: '/cckcYc2v0yh1tc9QjRelptcOBko.jpg',
      order: 1,
    },
    {
      id: 1283,
      name: 'Helena Bonham Carter',
      character: 'Marla Singer',
      profile_path: '/rP8S2e3Th3F2S21QLaQ8owg7v7l.jpg',
      order: 2,
    },
  ],
  crew: [
    {
      id: 7467,
      name: 'David Fincher',
      job: 'Director',
      department: 'Directing',
      profile_path: '/tpEczFclQZeKAiCeKZZ0adRvtfz.jpg',
    },
  ],
};

export const mockMovieVideos = {
  id: 550,
  results: [
    {
      id: '639d5326be6d88007f170f44',
      key: 'BdJKm16Co6M',
      name: 'Fight Club | #TBT Trailer',
      site: 'YouTube',
      size: 1080,
      type: 'Trailer',
      official: true,
      published_at: '2014-10-02T19:20:22.000Z',
    },
    {
      id: '639d5326be6d88007f170f45',
      key: 'SUXWAEX2jlg',
      name: 'Fight Club | Official Trailer',
      site: 'YouTube',
      size: 1080,
      type: 'Trailer',
      official: true,
      published_at: '1999-10-14T19:20:22.000Z',
    },
  ],
};

export const mockGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

