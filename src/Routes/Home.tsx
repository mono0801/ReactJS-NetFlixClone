// 메인 화면
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { PathMatch, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { useWindowDimensions } from "../utils";
import { IoIosArrowDropright } from "react-icons/io";
import Card from "../Components/Card";
import Modal from "../Components/Modal";
import Banner from "../Components/Banner";

const Wrapper = styled.div`
    background: black;
    overflow-x: hidden;
    padding-bottom: 200px;
`;
// API 로딩 중일 때 표시
const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
// 배너 하단에 들어갈 영화 포스터 슬라이드
const SliderWrapper = styled.div`
    margin-left: 60px;
    margin-right: 60px;
    position: relative;
    top: -200px;
`;
// 영화 포스터 슬라이드 상단
const Sliderheader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
// 영화 포스터 슬라이드 상단에 들어갈 슬라이더 이름
const SliderTitle = styled.h4`
    font-size: 150%;
`;
// 영화 포스터 슬라이드 화살표
const SliderArrow = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 150%;
    cursor: pointer;
`;
// 슬라이드에 들어갈 div
const Slider = styled(motion.div)`
    margin-top: 15px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    position: absolute;

    // 첫번째 슬라이더의 포스터는 오른쪽으로 커지게
    div:first-child {
        transform-origin: center left;
    }
    // 마지막 슬라이더의 포스터는 왼쪽으로 커지게
    div:last-child {
        transform-origin: center right;
    }
`;
// 슬라이드에서 한 번에 보여줄 영화 갯수
const offset = 6;

function Home() {
    // themoviedb.org로 부터 가져온 영화 정보
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"],
        getMovies
    );
    // SliderWrapper에서 현재 Slider가 무엇인지 식별
    const [index, setIndex] = useState(0);
    // index 증가
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;

            toggleLeaving();
            // 가져온 영화 갯수
            const totalMovies = data.results.length - 1;
            // 가져온 영화 갯수 / 6 : 보여줘야될 Slider 갯수
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            // index가 Slider 갯수를 넘을 경우 0으로 초기화
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    // slider 애니메이션 중첩 실행 방지
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    // 현재 윈도우 사이트의 너비 반환하는 함수
    const width = useWindowDimensions();
    // 현재 우리가 어느 route에 있는지 확인한다
    const detailMovieMatch: PathMatch<string> | null =
        useMatch("/movies/:movieId");
    // slider에서 클릭한 영화의 Id 가져오기
    const clickedMovieId =
        detailMovieMatch?.params.movieId &&
        data?.results.find(
            // 문자열 앞에 +를 붙이면 숫자열이 된다 => +"string"
            (movie) => String(movie.id) === detailMovieMatch.params.movieId
        );

    // <></> : fragment -> 많은 요소를 공통된 부모 없이 연이어서 리턴할 때 사용
    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner
                        backdrop_path={data?.results[0].backdrop_path}
                        title={data?.results[0].title}
                        overview={data?.results[0].overview}
                    />
                    <SliderWrapper>
                        <Sliderheader>
                            <SliderTitle>Now Playing</SliderTitle>
                            <SliderArrow onClick={increaseIndex}>
                                <IoIosArrowDropright />
                            </SliderArrow>
                        </Sliderheader>
                        {/* 요소가 생기거나 사라질 때 효과 부여 */}
                        {/* onExitComplete : 애니메이션이 완전히 끝날 때 실행 */}
                        <AnimatePresence
                            initial={false}
                            onExitComplete={toggleLeaving}
                        >
                            <Slider
                                key={index}
                                initial={{ x: width }}
                                animate={{ x: 0 }}
                                exit={{ x: -width }}
                                transition={{ type: "tween", duration: 1 }}
                            >
                                {/* 첫번째 영화는 배너에 사용했으므로 제외 */}
                                {data?.results
                                    .slice(1)
                                    .slice(
                                        // 6개씩 나눠서 보여줌
                                        offset * index,
                                        offset * index + offset
                                    )
                                    .map((movie) => (
                                        <Card
                                            key={movie.id}
                                            category={"movie"}
                                            keyword={null}
                                            id={movie.id}
                                            backdrop_path={movie.backdrop_path}
                                            poster_path={movie.poster_path}
                                            title={movie.title}
                                        />
                                    ))}
                            </Slider>
                        </AnimatePresence>
                    </SliderWrapper>
                    <AnimatePresence>
                        {detailMovieMatch && clickedMovieId ? (
                            <Modal
                                category="movie"
                                keyword={null}
                                detailMatch={detailMovieMatch}
                                backdrop_path={clickedMovieId.backdrop_path}
                                poster_path={clickedMovieId.poster_path}
                                title={clickedMovieId.title}
                                overview={clickedMovieId.overview}
                            />
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}
export default Home;
