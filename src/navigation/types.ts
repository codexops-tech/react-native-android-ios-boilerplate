export type RootStackParamList = {
    Home: undefined;
    NowPlaying: { stationId: string };
    GenreStations: {
        genreId: string;
        genreName: string;
        genreSlug: string;
    };
    // ... existing types ...
}; 