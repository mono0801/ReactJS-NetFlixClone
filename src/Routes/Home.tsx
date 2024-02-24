// 메인 화면
import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { PathMatch, useMatch } from "react-router-dom";
import {
    getMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    IGetMoviesResult,
} from "../api";
import Banner from "../Components/Banner";
import Loading from "../Components/Loading";
import Cards from "../Components/List/MovieCards";
import MovieDetail from "../Components/Detail/MovieDetail";
import * as style from "../css/style";

function Home() {
    // themoviedb.org로 부터 가져온 영화 정보
    const { data: nowPlaying, isLoading: nowPlayingLoding } =
        useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const { data: topRated, isLoading: topRatedLoding } =
        useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRatedMovies);
    const { data: upComing, isLoading: upComingLoding } =
        useQuery<IGetMoviesResult>(["movies", "upComing"], getUpcomingMovies);
    // 현재 우리가 어느 route에 있는지 확인한다
    const detailMovieMatch: PathMatch<string> | null = useMatch(
        "/movies/:category/:Id"
    );

    return (
        <style.Wrapper>
            {nowPlayingLoding && topRatedLoding && upComingLoding ? (
                <Loading />
            ) : (
                <>
                    <Banner
                        category="movie"
                        videoId={nowPlaying?.results[0].id}
                        backdrop_path={nowPlaying?.results[0].backdrop_path}
                        title={nowPlaying?.results[0].title}
                        // title={width + ""}
                        overview={nowPlaying?.results[0].overview}
                    />
                    {nowPlaying && topRated && upComing ? (
                        <>
                            <style.CardsWrapper>
                                <style.CardsContainer>
                                    <Cards
                                        data={nowPlaying}
                                        cardsName="Now Playing"
                                        tagName="NowPlaying"
                                        cut={1}
                                        top="-200px"
                                    />
                                </style.CardsContainer>
                                <style.CardsContainer>
                                    <Cards
                                        data={upComing}
                                        cardsName="Up Coming"
                                        tagName="UpComing"
                                        cut={0}
                                        top="-175px"
                                    />
                                </style.CardsContainer>
                                <style.CardsContainer>
                                    <Cards
                                        data={topRated}
                                        cardsName="Top Rated"
                                        tagName="TopRated"
                                        cut={0}
                                        top="-150px"
                                    />
                                </style.CardsContainer>
                            </style.CardsWrapper>
                        </>
                    ) : null}
                    <AnimatePresence>
                        {detailMovieMatch ? (
                            <MovieDetail
                                videoId={String(detailMovieMatch.params.Id)}
                            />
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </style.Wrapper>
    );
}
export default Home;
