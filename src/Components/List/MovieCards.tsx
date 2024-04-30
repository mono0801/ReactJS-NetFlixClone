// Movie Card 리스트를 보여줄 Slider
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { IGetMoviesResult } from "../../api";
import { changeOffset, useWindowDimensions } from "../../utils";
import * as Cards from "../../css/Cards";
import Card from "./Card";

/**
 * Card 목록을 보여주는 Slider 리스트
 * @param data API로 가져온 비디오 리스트
 * @param cardsName Cards 상단에 표시할 이름
 * @param tagName Cards의 이름 : 띄어쓰기 X
 * @param cut 앞에서부터 cut에 설정한 숫자까지의 Card를 보여주지 않음
 * - 2라고 할 경우 앞에서부터 2번째까지는 리스트에 보여주지 않음
 * - Banner로 영화 1개가 쓰이므로 1을 설정함
 * @param top Cards의 y좌표 위치를 설정 : ex) -200px로 입력
 * @returns 상세 정보창 Div
 */
function MovieCards({
    data,
    cardsName,
    tagName,
    cut,
    top,
}: {
    data: IGetMoviesResult;
    cardsName: "Now Playing" | "Top Rated" | "Up Coming" | "Popular";
    tagName: "NowPlaying" | "TopRated" | "UpComing" | "Popular";
    cut: number;
    top: string;
}) {
    // SliderWrapper에서 현재 Slider가 무엇인지 식별
    const [index, setIndex] = useState(0);
    // Slider 애니메이션 중첩 실행 방지
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    // Slider 애니메이션이 뒤로가기 인지 앞으로 가기인지 구분
    const isBack = useRef(false);
    // 현재 윈도우 사이트의 너비 반환하는 함수
    const width = useWindowDimensions();
    // offset : 한 슬라이드에 보여줄 Card 갯수
    let offset = 8;
    // 반응형으로 설정
    offset = changeOffset(window.innerWidth);
    // 가져온 영화 갯수
    const totalMovies = data.results.length - 1;
    // 가져온 영화 갯수 / offset : 보여줘야될 Slider 갯수
    const maxIndex = Math.ceil(totalMovies / offset) - 1;
    // 윈도우 너비가 변하면서 현재 Index가 maxIndex를 넘어설 경우 Index를 변경된 maxIndex로 변경
    if (maxIndex < index) {
        toggleLeaving();
        setIndex(maxIndex);
    }
    // index 증가
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;

            toggleLeaving();

            // index가 Slider 갯수를 넘을 경우 0으로 초기화
            setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
            isBack.current = false;
        }
    };
    const decreaseIndex = () => {
        if (data) {
            if (leaving) return;

            toggleLeaving();

            // index가 Slider 갯수를 넘을 경우 0으로 초기화
            setIndex((prev) => (prev == 0 ? maxIndex : prev - 1));
            isBack.current = true;
        }
    };
    // 영화 포스터 슬라이드 애니메이션 설정
    const sliderVariants = {
        hidden: ({ width }: { width: number }) => ({
            x: isBack.current ? -width : width,
        }),
        visible: {
            x: 0,
        },
        exit: ({ width }: { width: number }) => ({
            x: isBack.current ? width : -width,
        }),
    };

    return (
        <Cards.CardsWrapper style={{ top: top }}>
            <Cards.Cardsheader>
                <Cards.CardsTitle>{cardsName}</Cards.CardsTitle>
                <Cards.CardsArrowContainer>
                    <Cards.CardsArrow
                        variants={Cards.CardsArrowVariant}
                        whileHover="hover"
                        initial="normal"
                    >
                        <IoIosArrowDropleft onClick={decreaseIndex} />
                    </Cards.CardsArrow>
                    <Cards.Index>
                        {index + 1 + " / " + (maxIndex + 1)}
                    </Cards.Index>
                    <Cards.CardsArrow
                        variants={Cards.CardsArrowVariant}
                        whileHover="hover"
                        initial="normal"
                    >
                        <IoIosArrowDropright onClick={increaseIndex} />
                    </Cards.CardsArrow>
                </Cards.CardsArrowContainer>
            </Cards.Cardsheader>
            {/* 요소가 생기거나 사라질 때 효과 부여 */}
            {/* onExitComplete : 애니메이션이 완전히 끝날 때 실행 */}
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Cards.Slider
                    key={index}
                    offset={offset}
                    // layoutId={tagName}
                    variants={sliderVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={{ width, isBack }}
                    transition={{ type: "tween", duration: 1 }}
                    style={{ translateX: "-50%" }}
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
                                category={"movie"}
                                keyword={null}
                                tagName={tagName}
                                id={movie.id}
                                backdrop_path={movie.backdrop_path}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                </Cards.Slider>
            </AnimatePresence>
        </Cards.CardsWrapper>
    );
}

export default MovieCards;
