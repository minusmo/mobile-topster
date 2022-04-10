
export const getAlbumsByArtistandAlbumName = (query: string, country: string): string => {
  return `https://api.spotify.com/v1/search/?q=album:${query}%20OR%20artist:${query}&type=album&market=${country}&limit=50`;
}
export const getAlbumsByAlbumName = (query:string, country:string):string => {
  return `https://api.spotify.com/v1/search/?q=${query}&type=album&market=${country}&limit=50`;
}