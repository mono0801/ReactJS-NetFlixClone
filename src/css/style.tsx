// Home과 Tv의 css
import { styled } from "styled-components";

export const Wrapper = styled.div`
    min-width: 530px;
    height: 200vh;
    background: black;
    overflow-x: hidden;
`;

// Card list 전체를 감싸는 Div
export const CardsWrapper = styled.div`
    height: 100vh;
    width: 100%;
`;

// 각각의 Card list를 감싸는 Div
export const CardsContainer = styled.div`
    margin-bottom: 25px;
`;
