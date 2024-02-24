// Home과 Tv의 Card Slide Css
import { motion } from "framer-motion";
import { styled } from "styled-components";

// 배너 하단에 들어갈 Card 슬라이드
export const CardsWrapper = styled.div`
    height: 300px;
    align-items: center;
    margin-left: 60px;
    margin-right: 60px;
    position: relative;
`;
// Card 슬라이드 상단
export const Cardsheader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
// Card 슬라이드 상단에 들어갈 슬라이더 이름
export const CardsTitle = styled.h4`
    font-size: 150%;
    font-weight: bolder;
`;
// Card 슬라이드 화살표를 감싸는 Div
export const CardsArrowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
// Card 슬라이드 화살표 전체를 감싸는 Div
export const CardsArrow = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 175%;
    cursor: pointer;
`;
// 슬라이드의 Index가 현재 몇번째인지 알려주는 span
export const Index = styled.span`
    font-size: 125%;
    font-weight: bolder;
    margin: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
// 슬라이드에 들어갈 div
export const Slider = styled(motion.div)<{ offset: number }>`
    margin-top: 15px;
    display: grid;
    grid-template-columns: repeat(${(props) => props.offset}, 200px);
    gap: 24px;
    position: absolute;
    left: 50%;

    // 첫번째 슬라이더의 포스터는 오른쪽으로 커지게
    div:first-child {
        transform-origin: center left;
    }
    // 마지막 슬라이더의 포스터는 왼쪽으로 커지게
    div:last-child {
        transform-origin: center right;
    }
`;
// Card 슬라이드 화살표 애니메이션 설정
export const CardsArrowVariant = {
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
