// Tv Card 리스트를 보여줄 Slider
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { styled } from "styled-components";
import { IGetTvResult } from "../../api";
import { useWindowDimensions } from "../../utils";
import Card from "./Card";

// 배너 하단에 들어갈 영화 포스터 슬라이드
const CardsWrapper = styled.div`
    margin-left: 60px;
    margin-right: 60px;
    position: relative;
`;
// 영화 포스터 슬라이드 상단
const Cardsheader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
// 영화 포스터 슬라이드 상단에 들어갈 슬라이더 이름
const CardsTitle = styled.h4`
    font-size: 150%;
`;
// 영화 포스터 슬라이드 화살표
const CardsArrow = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 150%;
    cursor: pointer;
`;
// 슬라이드에 들어갈 div
const Slider = styled(motion.div)<{ offset: number }>`
    margin-top: 15px;
    width: 1440px;
    display: grid;
    grid-template-columns: repeat(${(props) => props.offset}, 200px);
    gap: 40px;
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
// 영화 포스터 슬라이드 화살표 애니메이션 설정
const CardsArrowVariant = {
    nomal: {
        scale: 1,
    },
    hover: {
        scale: 1.25,
        transition: {
            duration: 0.2,
        },
    },
};

/**
 * Card 목록을 뵤여주는 Slider 리스트
 * @param data API로 가져온 비디오 리스트
 * @param cardsName Cards 상단에 표시할 이름
 * @param tagName Cards의 이름 : 띄어쓰기 X
 * * @param cut 앞에서부터 cut에 설정한 숫자까지의 Card를 보여주지 않음
 * - 2라고 할 경우 앞에서부터 2번째까지는 리스트에 보여주지 않음
 * - Banner로 영화 1개가 쓰이므로 1을 설정함
 * @param top Cards의 x좌표 위치를 설정 : ex) -200px로 입력
 * @returns 상세 정보창 Div
 */
function TvCards({
    data,
    cardsName,
    tagName,
    cut,
    top,
}: {
    data: IGetTvResult;
    cardsName: string;
    tagName: string;
    cut: number;
    top: string;
}) {
    // SliderWrapper에서 현재 Slider가 무엇인지 식별
    const [index, setIndex] = useState(0);
    // slider 애니메이션 중첩 실행 방지
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    // 현재 윈도우 사이트의 너비 반환하는 함수
    const width = useWindowDimensions();
    // offset : 한 슬라이드에 보여줄 Card 갯수
    let offset = 7;
    // 반응형으로 설정
    if (1830 <= window.innerWidth) {
        offset = 7;
    } else if (1600 <= window.innerWidth && window.innerWidth < 1830) {
        offset = 6;
    } else if (1350 <= window.innerWidth && window.innerWidth < 1600) {
        offset = 5;
    } else if (1100 <= window.innerWidth && window.innerWidth < 1350) {
        offset = 4;
    } else if (850 <= window.innerWidth && window.innerWidth < 1100) {
        offset = 3;
    } else if (600 <= window.innerWidth && window.innerWidth < 850) {
        offset = 2;
    } else {
        offset = 1;
    }
    // 가져온 영화 갯수
    const totalMovies = data.results.length - 1;
    // 가져온 영화 갯수 / 6 : 보여줘야될 Slider 갯수
    const maxIndex = Math.ceil(totalMovies / offset) - 1;
    // index 증가
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;

            toggleLeaving();

            // index가 Slider 갯수를 넘을 경우 0으로 초기화
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };

    return (
        <CardsWrapper style={{ top: top }}>
            <Cardsheader>
                <CardsTitle>
                    {cardsName + " - " + (index + 1) + " / " + (maxIndex + 1)}
                </CardsTitle>
                <CardsArrow
                    onClick={increaseIndex}
                    variants={CardsArrowVariant}
                    whileHover="hover"
                    initial="normal"
                >
                    <IoIosArrowDropright />
                </CardsArrow>
            </Cardsheader>
            {/* 요소가 생기거나 사라질 때 효과 부여 */}
            {/* onExitComplete : 애니메이션이 완전히 끝날 때 실행 */}
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Slider
                    key={index}
                    offset={offset}
                    initial={{ x: width }}
                    animate={{ x: 0 }}
                    exit={{ x: -width }}
                    transition={{ type: "tween", duration: 1 }}
                >
                    {/* 첫번째 영화는 배너에 사용했으므로 제외 */}
                    {data?.results
                        .slice(cut)
                        .slice(
                            // 6개씩 나눠서 보여줌
                            offset * index,
                            offset * index + offset
                        )
                        .map((movie) => (
                            <Card
                                key={movie.id}
                                category={"tv"}
                                keyword={null}
                                tagName={tagName}
                                id={movie.id}
                                backdrop_path={movie.backdrop_path}
                                poster_path={movie.poster_path}
                                title={movie.name}
                            />
                        ))}
                </Slider>
            </AnimatePresence>
        </CardsWrapper>
    );
}

export default TvCards;