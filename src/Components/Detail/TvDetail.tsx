// Card 클릭 시 확대되는 상세 정보창
import { useQuery } from "react-query";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { getVideoDetail, IGetDetailTvResult } from "../../api";
import { makeImagePath } from "../../utils";
import * as detail from "../../css/Detail";

/**
 * Movie List의 Card 클릭 시 나오는 상세 정보 창
 * @param keyword Search에서 검색한 키워드
 * @param videoId 선택한 영상의 ID
 * @returns 상세 정보창 Div
 */
function TvDetail({ keyword, videoId }: { keyword?: string; videoId: string }) {
    // 특정 라우터로 보내기
    const navigate = useNavigate();
    // 영화 상세보기 밖의 오버레이 클릭 시 상세보기 창 닫기
    const onOverlayClicked = () => {
        if (keyword != undefined) {
            navigate(`/search?keyword=${keyword}`);
        } else {
            navigate(`/tv`);
        }
    };
    // 현재 우리가 어느 route에 있는지 확인한다
    const detailTvMatch: PathMatch<string> | null =
        useMatch("/tv/:category/:Id");
    // 받아온 ID를 통해 상세 정보 가져오기
    const { data, isLoading } = useQuery<IGetDetailTvResult>(
        ["tv", "detail"],
        () => getVideoDetail("tv", videoId)
    );

    return (
        <>
            <detail.Overlay
                onClick={onOverlayClicked}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
            <detail.Info layoutId={detailTvMatch?.params.category + videoId}>
                <detail.InfoCover
                    style={{
                        backgroundImage: `linear-gradient(to top, transparent,black), url(${makeImagePath(
                            String(data?.backdrop_path),
                            ""
                        )})`,
                    }}
                >
                    <detail.InfoPosterWrapper>
                        <detail.InfoPoster
                            src={makeImagePath(
                                String(data?.poster_path),
                                "w200"
                            )}
                        />
                    </detail.InfoPosterWrapper>
                    <detail.InfoTitleWrapper>
                        <detail.InfoTitle>{data?.name}</detail.InfoTitle>
                        <detail.InfoOriginalTitle>
                            {data?.original_name}
                        </detail.InfoOriginalTitle>
                        <detail.InfoString>
                            {"장르 : " +
                                data?.genres?.map((props) => " " + props.name)}
                        </detail.InfoString>
                        <detail.InfoString>
                            {"평점 : " + data?.vote_average.toFixed(1)}
                        </detail.InfoString>
                        <detail.InfoString>
                            {"개봉국가 : " +
                                data?.production_countries[0]?.name}
                        </detail.InfoString>
                        <detail.InfoString>
                            {"언어 : " +
                                data?.spoken_languages[0]?.english_name}
                        </detail.InfoString>
                        <detail.InfoString>
                            {"시즌 : " + data?.number_of_seasons}
                        </detail.InfoString>
                        <detail.InfoString>
                            {"에피소드 개수 : " + data?.number_of_episodes}
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

export default TvDetail;
