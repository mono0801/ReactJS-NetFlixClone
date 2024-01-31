// 메인 화면
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
    background: black;
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

function Home() {
    // themoviedb.org로 부터 가져온 영화 정보
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"],
        getMovies
    );
    console.log(data, isLoading);

    // <></> : fragment -> 많은 요소를 공통된 부모 없이 연이어서 리턴할 때 사용
    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner
                        // 영화 포스터 전달
                        bgPhoto={makeImagePath(
                            data?.results[0].backdrop_path || ""
                        )}
                    >
                        {/* API로 가져온 리스트 중 첫번째 영화 */}
                        <Title>{data?.results[0].title}</Title>
                        <OverView>{data?.results[0].overview}</OverView>
                    </Banner>
                </>
            )}
        </Wrapper>
    );
}
export default Home;
