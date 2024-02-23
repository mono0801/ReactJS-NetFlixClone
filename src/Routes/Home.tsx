// 메인 화면
import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { PathMatch, useMatch } from "react-router-dom";
import styled from "styled-components";
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
import { useWindowDimensions } from "../utils";

const Wrapper = styled.div`
    min-width: 530px;
    height: 200vh;
    background: black;
    overflow-x: hidden;
`;
// Card list 전체를 감싸는 Div
const CardsWrapper = styled.div`
    height: 100vh;
    width: 100%;
`;
// 각각의 Card list를 감싸는 Div
const CardsContainer = styled.div`
    margin-bottom: 25px;
`;

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
    const width = useWindowDimensions();

    return (
        <Wrapper>
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
                            <CardsWrapper>
                                <CardsContainer>
                                    <Cards
                                        data={nowPlaying}
                                        cardsName="Now Playing"
                                        tagName="NowPlaying"
                                        cut={1}
                                        top="-200px"
                                    />
                                </CardsContainer>
                                <CardsContainer>
                                    <Cards
                                        data={topRated}
                                        cardsName="Top Rated"
                                        tagName="TopRated"
                                        cut={0}
                                        top="-175px"
                                    />
                                </CardsContainer>
                                <CardsContainer>
                                    <Cards
                                        data={upComing}
                                        cardsName="Up Coming"
                                        tagName="UpComing"
                                        cut={0}
                                        top="-150px"
                                    />
                                </CardsContainer>
                            </CardsWrapper>
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
        </Wrapper>
    );
}
export default Home;
