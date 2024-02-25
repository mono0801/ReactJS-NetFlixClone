// Card 클릭 시 확대되는 상세 정보창
import { useQuery } from "react-query";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { getVideoDetail, IGetDetailMovieResult } from "../../api";
import { makeImagePath } from "../../utils";
import * as detail from "../../css/Detail";

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
            <detail.Overlay
                onClick={onOverlayClicked}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
            <detail.Info layoutId={detailMovieMatch?.params.category + videoId}>
                <detail.InfoCover
                    style={{
                        backgroundImage: `linear-gradient(to top,black, transparent), url(${makeImagePath(
                            String(data?.backdrop_path || ""),
                            ""
                        )})`,
                    }}
                >
                    <detail.InfoPosterWrapper>
                        <detail.InfoPoster
                            src={makeImagePath(
                                String(data?.poster_path || ""),
                                "w200"
                            )}
                        />
                    </detail.InfoPosterWrapper>
                    <detail.InfoTitleWrapper>
                        <detail.InfoTitle>{data?.title}</detail.InfoTitle>
                        <detail.InfoOriginalTitle>
                            {data?.original_title}
                        </detail.InfoOriginalTitle>
                        <detail.InfoTagline>
                            {data?.tagline || "개요가 없습니다"}
                        </detail.InfoTagline>
                        <detail.InfoString>
                            {"개봉일 : " + data?.release_date}
                        </detail.InfoString>
                        <detail.InfoString>
                            {"개봉국가 : " +
                                data?.production_countries[0]?.name}
                        </detail.InfoString>
                        <detail.InfoString>
                            {"장르 : " +
                                data?.genres?.map((props) => " " + props.name)}
                        </detail.InfoString>
                        <detail.InfoString>
                            {"평점 : " + data?.vote_average?.toFixed(1)}
                        </detail.InfoString>

                        <detail.InfoString>
                            {"언어 : " +
                                data?.spoken_languages[0]?.english_name}
                        </detail.InfoString>
                        <detail.InfoString>
                            {"상영 시간 : " + data?.runtime + "분"}
                        </detail.InfoString>
                    </detail.InfoTitleWrapper>
                </detail.InfoCover>
                <detail.InfoContainer>
                    <detail.InfoLogo>
                        {data?.production_companies?.map((props) => (
                            <detail.LogoContainer key={props.id}>
                                <detail.Logo
                                    key={props.id}
                                    src={makeImagePath(props.logo_path, "w200")}
                                    title={props.name}
                                />
                            </detail.LogoContainer>
                        ))}
                    </detail.InfoLogo>
                    <detail.HorizonBar />
                    <detail.InfoOverView>
                        {data?.overview || "줄거리가 존재하지 않습니다"}
                    </detail.InfoOverView>
                </detail.InfoContainer>
            </detail.Info>
        </>
    );
}

export default MovieDetail;
