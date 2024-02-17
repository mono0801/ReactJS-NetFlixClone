// Home과 TV Show의 배너
import { styled } from "styled-components";
import { makeImagePath } from "../utils";

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

/**
 * 메인 화면의 상단 배너
 * @param backdrop_path 해당 영상의 Backdrop path
 * @param title 해당 영상의 제목 : 영화는 title, TV Show는 name
 * @param overview overview 해당 영상의 overview
 * @returns 메인 화면 배너
 */
function Banner({
    backdrop_path,
    title,
    overview,
}: {
    backdrop_path?: string;
    title?: string;
    overview?: string;
}) {
    return (
        <Poster
            // 영화 포스터 전달
            bgPhoto={makeImagePath(backdrop_path || "")}
        >
            {/* API로 가져온 리스트 중 첫번째 영화 */}
            <Title>{title}</Title>
            <OverView>{overview}</OverView>
        </Poster>
    );
}

export default Banner;
