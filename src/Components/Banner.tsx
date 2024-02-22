// Home과 TV Show의 배너
import { AnimatePresence, motion } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import MovieDetail from "./Detail/MovieDetail";
import TvDetail from "./Detail/TvDetail";

// 홈 화면의 메인 배너
const Poster = styled.div<{ bgPhoto: string }>`
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
const InfoContainer = styled(motion.div)`
    width: 40%;
    padding: 15px;
    border-radius: 15px;
    background: rgb(0, 0, 0, 0.7);
    cursor: pointer;
`;
// 배너에 들어갈 영화 제목
const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 48px;
`;
// 배너에 들어갈 영화 줄거리
const OverView = styled.p`
    width: 100%;
    font-size: 20px;
`;

/**
 * 메인 화면의 상단 배너
 * @param backdrop_path 해당 영상의 Backdrop path
 * @param title 해당 영상의 제목 : 영화는 title, TV Show는 name
 * @param overview overview 해당 영상의 overview
 * @returns 메인 화면 배너
 */
function Banner({
    category,
    videoId,
    backdrop_path,
    title,
    overview,
}: {
    category: string;
    videoId?: number;
    backdrop_path?: string;
    title?: string;
    overview?: string;
}) {
    // 특정 라우터로 보내기
    const navigate = useNavigate();
    // 포스터 클릭 시 해당 영화의 ID를 포함하는 url로 이동하는 함수
    const onCardClicked = (Id: number) => {
        // TV Show 리스트 카드 클릭 시
        if (category == "tv") {
            navigate(`/tv/banner/${Id}`);
        }
        // Home 리스트 카드 클릭 시
        else {
            navigate(`/movies/banner/${Id}`);
        }
    };

    // 현재 우리가 어느 route에 있는지 확인한다
    const detailMovieMatch: PathMatch<string> | null = useMatch(
        "/movies/:category/:Id"
    );
    const detailTvMatch: PathMatch<string> | null =
        useMatch("/tv/:category/:Id");

    return (
        <Poster
            // 영화 포스터 전달
            bgPhoto={makeImagePath(backdrop_path || "")}
        >
            {/* API로 가져온 리스트 중 첫번째 영화 */}
            <InfoContainer
                onClick={() => onCardClicked(Number(videoId))}
                layoutId={"banner" + videoId}
            >
                <Title>{title}</Title>
                <OverView>{overview}</OverView>
            </InfoContainer>

            <AnimatePresence>
                {detailMovieMatch ? (
                    <MovieDetail videoId={String(detailMovieMatch.params.Id)} />
                ) : detailTvMatch ? (
                    <TvDetail videoId={String(detailTvMatch.params.Id)} />
                ) : null}
            </AnimatePresence>
        </Poster>
    );
}

export default Banner;
