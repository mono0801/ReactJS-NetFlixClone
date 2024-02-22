// TV 상영 프로그램 소개 화면
import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { PathMatch, useMatch } from "react-router-dom";
import styled from "styled-components";
import {
    getAiringTodayTves,
    getTopRatedTves,
    getTves,
    IGetTvResult,
} from "../api";
import Banner from "../Components/Banner";
import Loading from "../Components/Loading";
import TvDetail from "../Components/Detail/TvDetail";
import Cards from "../Components/List/TvCards";

const Wrapper = styled.div`
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

function Tv() {
    // themoviedb.org로 부터 가져온 영화 정보
    const { data: popular, isLoading: popularLoding } = useQuery<IGetTvResult>(
        ["tvs", "popular"],
        getTves
    );
    const { data: topRated, isLoading: topRatedLoding } =
        useQuery<IGetTvResult>(["tvs", "topRated"], getTopRatedTves);
    const { data: airingToday, isLoading: airingTodayLoding } =
        useQuery<IGetTvResult>(["movies", "AiringToday"], getAiringTodayTves);
    // 현재 우리가 어느 route에 있는지 확인한다
    const detailTvMatch: PathMatch<string> | null =
        useMatch("/tv/:category/:Id");

    // <></> : fragment -> 많은 요소를 공통된 부모 없이 연이어서 리턴할 때 사용
    return (
        <Wrapper>
            {popularLoding && topRatedLoding && airingTodayLoding ? (
                <Loading />
            ) : (
                <>
                    <Banner
                        category="tv"
                        videoId={popular?.results[0].id}
                        backdrop_path={popular?.results[0].backdrop_path}
                        title={popular?.results[0].name}
                        overview={popular?.results[0].overview}
                    />
                    {popular && topRated && airingToday ? (
                        <>
                            <CardsWrapper>
                                <CardsContainer>
                                    <Cards
                                        data={popular}
                                        cardsName="Popular"
                                        tagName="Popular"
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
                                        data={airingToday}
                                        cardsName="Airing Today"
                                        tagName="AiringToday"
                                        cut={0}
                                        top="400px"
                                    />
                                </CardsContainer>
                            </CardsWrapper>
                        </>
                    ) : null}
                    <AnimatePresence>
                        {detailTvMatch ? (
                            <TvDetail
                                videoId={String(detailTvMatch.params.Id)}
                            />
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}

export default Tv;
