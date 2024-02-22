// Card 클릭 시 확대되는 상세 정보창
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { getVideoDetail, IGetDetailMovieResult } from "../../api";
import { makeImagePath } from "../../utils";

// Card 클릭 시 확대되는 상세 정보창을 끄기 위한 배경 오버레이
const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`;
// Card 클릭 시 확대되는 상세 정보창
const Info = styled(motion.div)`
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
const InfoCover = styled.div`
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center center;
    display: grid;
    grid-template-columns: 220px auto;
`;
// 상세 정보창 상단 왼쪽에 들어갈 영화 포스터를 감싸는 div
const InfoPosterWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
// 상세 정보창 상단 왼쪽에 들어갈 영화 포스터
const InfoPoster = styled.img`
    margin-left: 20px;
`;
// 상세 정보창 상단 오른쪽에 들어갈 영화 정보를 감싸는 div
const InfoTitleWrapper = styled.div``;
// 상세 정보창 상단 오른쪽에 들어갈 영화 제목
const InfoTitle = styled.h2`
    color: ${(props) => props.theme.white.lighter};
    font-size: 35px;
    margin-top: 50px;
    margin-left: 10px;
`;
// 상세 정보창 상단 오른쪽에 들어갈 영화 원래 제목
const InfoOriginalTitle = styled.h4`
    font-weight: bold;
    font-size: 24px;
    margin-top: 10px;
    margin-left: 20px;
`;
// 상세 정보창 상단 오른쪽에 들어갈 영화 개요
const InfoTagline = styled.h6`
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
const InfoString = styled.h6`
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
const InfoContainer = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 200px 2px auto;
`;
// 상세 정보창 하단 왼쪽에 들어갈 영화 로고 리스트를 감싸는 div
const InfoLogo = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;
// 상세 정보창 하단 왼쪽에 들어갈 영화 로고를 감싸는 div
const LogoContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
// 상세 정보창 하단 왼쪽에 들어갈 영화 로고
const Logo = styled.img`
    background-color: ${(props) => props.theme.white.lighter};
    width: 50px;
    height: 50px;
`;
// 상세 정보창 하단 오른쪽에 들어갈 영화 줄거리
const InfoOverView = styled.p`
    padding: 20px;
    color: ${(props) => props.theme.white.lighter};
`;
// Div를 구분하는 수직 구분선
const HorizonBar = styled.div`
    background-color: ${(props) => props.theme.white.lighter};
    width: 100%;
    height: 100%;
`;

/**
 * Movie List의 Card 클릭 시 나오는 상세 정보 창
 * @param keyword Search에서 검색한 키워드
 * @param videoId 선택한 영상의 ID
 * @returns 상세 정보창 Div
 */
function MovieDetail({
    keyword,
    videoId,
}: {
    keyword?: string;
    videoId: string;
}) {
    // 특정 라우터로 보내기
    const navigate = useNavigate();
    // 영화 상세보기 밖의 오버레이 클릭 시 상세보기 창 닫기
    const onOverlayClicked = () => {
        if (keyword != undefined) {
            navigate(`/search?keyword=${keyword}`);
        } else {
            navigate(`/`);
        }
    };
    // 현재 우리가 어느 route에 있는지 확인한다
    const detailMovieMatch: PathMatch<string> | null = useMatch(
        "/movies/:category/:Id"
    );
    // 받아온 ID를 통해 상세 정보 가져오기
    const { data, isLoading } = useQuery<IGetDetailMovieResult>(
        ["movie", "detail"],
        () => getVideoDetail("movie", videoId)
    );

    return (
        <>
            <Overlay
                onClick={onOverlayClicked}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
            <Info layoutId={detailMovieMatch?.params.category + videoId}>
                <InfoCover
                    style={{
                        backgroundImage: `linear-gradient(to top,black, transparent), url(${makeImagePath(
                            String(data?.backdrop_path),
                            ""
                        )})`,
                    }}
                >
                    <InfoPosterWrapper>
                        <InfoPoster
                            src={makeImagePath(
                                String(data?.poster_path),
                                "w200"
                            )}
                        />
                    </InfoPosterWrapper>
                    <InfoTitleWrapper>
                        <InfoTitle>{data?.title}</InfoTitle>
                        <InfoOriginalTitle>
                            {data?.original_title}
                        </InfoOriginalTitle>
                        <InfoTagline>
                            {data?.tagline || "개요가 없습니다"}
                        </InfoTagline>
                        <InfoString>
                            {"개봉일 : " + data?.release_date}
                        </InfoString>
                        <InfoString>
                            {"개봉국가 : " +
                                data?.production_countries[0]?.name}
                        </InfoString>
                        <InfoString>
                            {"장르 : " +
                                data?.genres?.map((props) => " " + props.name)}
                        </InfoString>
                        <InfoString>
                            {"평점 : " + data?.vote_average?.toFixed(1)}
                        </InfoString>

                        <InfoString>
                            {"언어 : " +
                                data?.spoken_languages[0]?.english_name}
                        </InfoString>
                        <InfoString>
                            {"상영 시간 : " + data?.runtime + "분"}
                        </InfoString>
                    </InfoTitleWrapper>
                </InfoCover>
                <InfoContainer>
                    <InfoLogo>
                        {data?.production_companies?.map((props) => (
                            <LogoContainer key={props.id}>
                                <Logo
                                    key={props.id}
                                    src={makeImagePath(props.logo_path, "w200")}
                                    title={props.name}
                                />
                            </LogoContainer>
                        ))}
                    </InfoLogo>
                    <HorizonBar />
                    <InfoOverView>
                        {data?.overview || "줄거리가 존재하지 않습니다"}
                    </InfoOverView>
                </InfoContainer>
            </Info>
        </>
    );
}

export default MovieDetail;
