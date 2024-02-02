// 메인 화면
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath, useWindowDimensions } from "../utils";

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
// 홈 화면의 메인 배너
const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // 배경 이미지에 그라데이션과 영화 포스터 두 개를 동시에 적용
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        url(${(props) => props.bgPhoto});
    background-size: cover;
`;
// 배너에 들어갈 영화 제목
const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 48px;
`;
// 배너에 들어갈 영화 줄거리
const OverView = styled.p`
    width: 50%;
    font-size: 20px;
`;
// 배너 하단에 들어갈 영화 포스터 슬라이드
const SliderWrapper = styled.div`
    position: relative;
    top: -100px;
`;
// 슬라이드에 들어갈 div
const Slider = styled(motion.div)`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    position: absolute;
`;
// Slider 안에 들어갈 영화 포스터 div
const SliderPoster = styled(motion.div)<{ bgPhoto: string }>`
    height: 200px;
    background-color: white;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    // 첫번째 슬라이더의 포스터는 오른쪽으로 커지게
    &:first-child {
        transform-origin: center left;
    }
    // 마지막 슬라이더의 포스터는 왼쪽으로 커지게
    &:last-child {
        transform-origin: center right;
    }
`;
// Slider 안의 영화 정보
const SliderPosterInfo = styled(motion.div)`
    width: 100%;
    padding: 10px;
    position: absolute;
    bottom: 0;
    background-color: ${(props) => props.theme.black.darker};
    opacity: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;
// SLider 안의 영화 포스터 애니메이션 설정
const sliderPosterVariants = {
    normal: { scale: 1 },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.35,
            duration: 0.2,
            type: "tween",
        },
    },
};
// Slider 안의 영화 정보 애니메이션 설정
const SliderPosterInfoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.35,
            duration: 0.2,
            type: "tween",
        },
    },
};
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
    // 현재 윈도우 사이트의 너비
    const width = useWindowDimensions();

    // <></> : fragment -> 많은 요소를 공통된 부모 없이 연이어서 리턴할 때 사용
    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner
                        onClick={increaseIndex}
                        // 영화 포스터 전달
                        bgPhoto={makeImagePath(
                            data?.results[0].backdrop_path || ""
                        )}
                    >
                        {/* API로 가져온 리스트 중 첫번째 영화 */}
                        <Title>{data?.results[0].title}</Title>
                        <OverView>{data?.results[0].overview}</OverView>
                    </Banner>
                    <SliderWrapper>
                        {/* 요소가 생기거나 사라질 때 효과 부여 */}
                        {/* onExitComplete : 애니메이션이 완전히 끝날 때 실행 */}
                        <AnimatePresence
                            initial={false}
                            onExitComplete={toggleLeaving}
                        >
                            <Slider
                                key={index}
                                initial={{ x: width + 10 }}
                                animate={{ x: 0 }}
                                exit={{ x: -width - 10 }}
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
                                        <SliderPoster
                                            key={movie.id}
                                            variants={sliderPosterVariants}
                                            initial="normal"
                                            whileHover={"hover"}
                                            transition={{ type: "tween" }}
                                            bgPhoto={makeImagePath(
                                                movie.backdrop_path ||
                                                    movie.poster_path,
                                                "w500"
                                            )}
                                        >
                                            {/* 부모의 variants가 자동으로 상속된다 */}
                                            <SliderPosterInfo
                                                variants={
                                                    SliderPosterInfoVariants
                                                }
                                            >
                                                <h4>{movie.title}</h4>
                                            </SliderPosterInfo>
                                        </SliderPoster>
                                    ))}
                            </Slider>
                        </AnimatePresence>
                    </SliderWrapper>
                </>
            )}
        </Wrapper>
    );
}
export default Home;
