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

const Wrapper = styled.div`
    height: 200vh;
    background: black;
    overflow-x: hidden;
`;
const CardsWrapper = styled.div`
    width: 100%;
`;
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
    // // slider에서 클릭한 영화의 Id 가져오기
    // const clickedMovieId =
    //     detailMovieMatch?.params.Id &&
    //     nowPlaying?.results.find(
    //         // 문자열 앞에 +를 붙이면 숫자열이 된다 => +"string"
    //         (movie) => String(movie.id) === detailMovieMatch.params.Id
    //     );
    // <></> : fragment -> 많은 요소를 공통된 부모 없이 연이어서 리턴할 때 사용

    return (
        <Wrapper>
            {nowPlayingLoding && topRatedLoding && upComingLoding ? (
                <Loading />
            ) : (
                <>
                    <Banner
                        backdrop_path={nowPlaying?.results[0].backdrop_path}
                        title={nowPlaying?.results[0].title}
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
                                        top="100px"
                                    />
                                </CardsContainer>
                                <CardsContainer>
                                    <Cards
                                        data={upComing}
                                        cardsName="Up Coming"
                                        tagName="UpComing"
                                        cut={0}
                                        top="400px"
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
