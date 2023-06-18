export const HEADER_IMAGE = (gameId) => {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameId}/header.jpg`;
};

export const BACKGROUND_IMAGE =
  'https://media.contentapi.ea.com/content/dam/masseffect/images/2020/10/mele-hero-large-keyart-16x9-xl.jpg.adapt.crop16x9.1920w.jpg';

export const API_KEY = '777E368255E8B993B39D50433499C608';
export const USER_ID = '76561198983167428';

export const FETCH_ALL_GAMES = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${USER_ID}&format=json`;
