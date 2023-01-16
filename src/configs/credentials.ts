export abstract class UserInfo {
   static username: string = "064c5a84d81a49048660883f0b4fee52";
   static password: string = "921f1b7184164a8798d7d43b1adef4bc";
}

export abstract class API {
   static  SPOTIFY_AUTH_API: string = "https://accounts.spotify.com/api/token";
   static  spotifyQueryApi(artist: string = "", country: string = "us" ): string { return `https://api.spotify.com/v1/search/?q=${artist}&type=album&market=${country}&limit=50`; }
}

export abstract class GoogleAnalytics {
    static GAID: string = "UA-90376709-3";
}