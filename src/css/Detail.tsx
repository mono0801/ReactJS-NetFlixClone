// MovieDetail과 TvDetail의 Css
import { motion } from "framer-motion";
import { styled } from "styled-components";

// Card 클릭 시 확대되는 상세 정보창을 끄기 위한 배경 오버레이
export const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`;

// Card 클릭 시 확대되는 상세 정보창
export const Info = styled(motion.div)`
    width: 50vw;
    height: 80vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: ${(props) => props.theme.black.lighter};
    border-radius: 20px;
    overflow: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

// 상세 정보창 상단에 들어갈 영화 사진
export const InfoCover = styled.div`
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center center;
    display: grid;
    grid-template-columns: 220px auto;
`;

// 상세 정보창 상단 왼쪽에 들어갈 영화 포스터를 감싸는 div
export const InfoPosterWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// 상세 정보창 상단 왼쪽에 들어갈 영화 포스터
export const InfoPoster = styled.img`
    width: 200px;
    height: 300px;
    margin-left: 20px;
`;

// 상세 정보창 상단 오른쪽에 들어갈 영화 정보를 감싸는 div
export const InfoTitleWrapper = styled.div``;

// 상세 정보창 상단 오른쪽에 들어갈 영화 제목
export const InfoTitle = styled.h2`
    color: ${(props) => props.theme.white.lighter};
    font-size: 35px;
    margin-top: 50px;
    margin-left: 10px;
`;

// 상세 정보창 상단 오른쪽에 들어갈 영화 원래 제목
export const InfoOriginalTitle = styled.h4`
    font-weight: bold;
    font-size: 24px;
    margin-top: 10px;
    margin-left: 20px;
`;

// 상세 정보창 상단 오른쪽에 들어갈 영화 개요
export const InfoTagline = styled.h6`
    color: ${(props) => props.theme.white.lighter};
    font-size: 18px;
    margin-top: 10px;
    margin-left: 20px;
    &::before {
        content: " - ";
        color: ${(props) => props.theme.white.darker};
    }
`;

// 상세 정보창 상단 오른쪽에 들어갈 영화의 부속 정보
export const InfoString = styled.h6`
    color: ${(props) => props.theme.white.lighter};
    font-size: 14px;
    margin-top: 10px;
    margin-left: 25px;
    &::before {
        content: "ㆍ";
        color: ${(props) => props.theme.white.darker};
    }
`;

// 상세 정보창 하단 div
export const InfoContainer = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 200px 2px auto;
`;

// 상세 정보창 하단 왼쪽에 들어갈 영화 로고 리스트를 감싸는 div
export const InfoLogo = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

// 상세 정보창 하단 왼쪽에 들어갈 영화 로고를 감싸는 div
export const LogoContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// 상세 정보창 하단 왼쪽에 들어갈 영화 로고
export const Logo = styled.img`
    background-color: ${(props) => props.theme.white.lighter};
    width: 50px;
    height: 50px;
`;

// 상세 정보창 하단 오른쪽에 들어갈 영화 줄거리
export const InfoOverView = styled.p`
    padding: 20px;
    color: ${(props) => props.theme.white.lighter};
`;

// Div를 구분하는 수직 구분선
export const HorizonBar = styled.div`
    background-color: ${(props) => props.theme.white.lighter};
    width: 100%;
    height: 100%;
`;
