// 포스터 클릭 시 확대 되는 상세 정보창
import { motion } from "framer-motion";
import { PathMatch, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";

// Poster 클릭 시 확대되는 상세 정보창을 끄기 위한 배경 오버레이
const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`;
// Poster 클릭 시 확대되는 상세 정보창
const Detail = styled(motion.div)`
    width: 40vw;
    height: 70vh;
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
// Poster 클릭 시 확대되는 상세 정보창 상단에 들어갈 영화 사진
const DetailCover = styled.div`
    width: 100%;
    height: 350px;
    background-size: cover;
    background-position: center center;
`;
// 상세 정보창에 들어갈 정보를 감싸는 container (포스터 + 영화 제목 + 줄거리)
const DetailWrapper = styled.div`
    position: relative;
    top: -50px;
    display: grid;
    grid-template-columns: 1fr 2fr;
`;
// 상세 정보창에 들어갈 정보를 감싸는 wrapper (영화 제목 + 줄거리)
const DetailContainer = styled.div`
    display: grid;
    grid-template-rows: 0.5fr auto;
`;
// Poster 클릭 시 확대되는 상세 정보창에 들어갈 영화 포스터
const DetailPoster = styled.img`
    margin-left: 15px;
`;
// Poster 클릭 시 확대되는 상세 정보창에 들어갈 영화 제목
const DetailTitle = styled.h2`
    color: ${(props) => props.theme.white.lighter};
    font-size: 28px;
    text-align: center;
`;
// Poster 클릭 시 확대되는 상세 정보창에 들어갈 영화 줄거리
const DetailOverView = styled.p`
    padding: 20px;
    text-align: center;
    color: ${(props) => props.theme.white.lighter};
`;

/**
 * Card 클릭 시 나오는 상세 정보 창
 * @param keyword Search에서 검색한 키워드
 * @param detailMatch 현재 위치한 라우터 url
 * @param backdrop_path 해당 영상의 Backdrop path
 * @param poster_path 해당 영상의 Poster path
 * @param title 해당 영상의 제목 : 영화는 title, TV Show는 name
 * @param overview 해당 영상의 overview
 * @returns 상세 정보창 Div
 */
function Modal({
    keyword,
    detailMatch,
    backdrop_path,
    poster_path,
    title,
    overview,
}: {
    keyword: string | null;
    detailMatch: PathMatch<string>;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview?: string;
}) {
    // 특정 라우터로 보내기
    const navigate = useNavigate();
    // 영화 상세보기 밖의 오버레이 클릭 시 상세보기 창 닫기
    const onOverlayClicked = () => {
        navigate(`/search?keyword=${keyword}`);
    };

    return (
        <>
            <Overlay
                onClick={onOverlayClicked}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
            <Detail layoutId={detailMatch.params.searchId}>
                <DetailCover
                    style={{
                        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            backdrop_path,
                            "w500"
                        )})`,
                    }}
                />
                <DetailWrapper>
                    <DetailPoster src={makeImagePath(poster_path, "w200")} />
                    <DetailContainer>
                        <DetailTitle>{title}</DetailTitle>
                        <DetailOverView>
                            {overview || "줄거리가 존재하지 않습니다"}
                        </DetailOverView>
                    </DetailContainer>
                </DetailWrapper>
            </Detail>
        </>
    );
}

export default Modal;
