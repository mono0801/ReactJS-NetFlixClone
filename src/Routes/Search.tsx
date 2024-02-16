// 검색 화면
// modal 구현하기
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import {
    PathMatch,
    useMatch,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import {
    getSearchMovies,
    getSearchTves,
    IGetMoviesResult,
    IGetTvResult,
} from "../api";
import { SlMagnifier } from "react-icons/sl";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.div`
    padding: 60px;
`;
// API 로딩 중일 때 표시
const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
// 검색 화면 상단에 위치할 검색 바
const SearchBar = styled.div`
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
// 검색창
const SearchForm = styled.form`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 200%;
`;
// 상단 input 검색창
const Input = styled.input`
    width: 100%;
    font-size: 25px;
    background-color: transparent;
    color: white;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.white.lighter};
    margin-left: 15px;
    padding-left: 15px;
`;
// 검색한 키워드를 표시할 상단 타이틀
const SearchTitle = styled.h1`
    color: gray;
    span {
        font-size: 150%;
        color: ${(props) => props.theme.white.lighter};
    }
`;
// 검색된 리스트 상단에 위치할 제목
const ListTitle = styled.h1`
    font-size: 150%;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
`;
// 검색된 리스트를 감싸는 container
const PosterContainer = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
`;
// 검색된 영화
const Poster = styled(motion.div)<{ bgPhoto: string }>`
    height: 200px;
    background-color: whitesmoke;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    overflow: hidden;
    cursor: pointer;
    // 첫번째 슬라이더의 포스터는 오른쪽으로 커지게
    &:first-child {
        transform-origin: center left;
    }
    // 마지막 슬라이더의 포스터는 왼쪽으로 커지게
    &:last-child {
        transform-origin: center right;
    }
`;
// 검색된 영화 제목
const PosterInfo = styled(motion.div)`
    width: 100%;
    padding: 10px;
    position: absolute;
    bottom: 0;
    background-color: ${(props) => props.theme.black.darker};
    opacity: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;
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
const PosterDetail = styled(motion.div)`
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
const PosterDetailCover = styled.div`
    width: 100%;
    height: 350px;
    background-size: cover;
    background-position: center center;
`;
// 상세 정보창에 들어갈 정보를 감싸는 container (포스터 + 영화 제목 + 줄거리)
const PosterDetailWrapper = styled.div`
    position: relative;
    top: -50px;
    display: grid;
    grid-template-columns: 1fr 2fr;
`;
// 상세 정보창에 들어갈 정보를 감싸는 wrapper (영화 제목 + 줄거리)
const PosterDetailContainer = styled.div`
    display: grid;
    grid-template-rows: 0.5fr auto;
`;
// Poster 클릭 시 확대되는 상세 정보창에 들어갈 영화 포스터
const PosterDetailPoster = styled.img`
    margin-left: 15px;
`;
// Poster 클릭 시 확대되는 상세 정보창에 들어갈 영화 제목
const PosterDetailTitle = styled.h2`
    color: ${(props) => props.theme.white.lighter};
    font-size: 28px;
    text-align: center;
`;
// Poster 클릭 시 확대되는 상세 정보창에 들어갈 영화 줄거리
const PosterDetailOverView = styled.p`
    padding: 20px;
    text-align: center;
    color: ${(props) => props.theme.white.lighter};
`;
// 검색된 영화 포스터 애니메이션 설정
const PosterVariants = {
    normal: { scale: 1 },
    hover: {
        scale: 1.3,
        y: -50,
        borderRadius: "20px",
        transition: {
            delay: 0.35,
            duration: 0.2,
            type: "tween",
        },
    },
};
// 검색된 영화 포스터 정보 애니메이션 설정
const PosterInfoVariants = {
    hover: {
        opacity: 0.8,
        transition: {
            delay: 0.35,
            duration: 0.2,
            type: "tween",
        },
    },
};
// 검색창 인터페이스
interface IForm {
    keyword: string;
}

function Search() {
    // url의 파라미터를 가져오기
    const [searchParams] = useSearchParams();
    // url의 파라미터 값을 저장하기
    const keyword = searchParams.get(`keyword`);
    // Input에서 입력한 값을 가져오기
    const { register, handleSubmit } = useForm<IForm>();
    // 특정 라우터로 보내기
    const navigate = useNavigate();
    // Input에서 가져온 값이 유효한지 검사
    const onValid = (data: IForm) => {
        navigate(`/search?keyword=${data.keyword}`);
    };
    // themoviedb.org로 부터 검색해서 가져온 영화 정보
    const { data: movieSearch, isLoading: movieSearchLoading } =
        useQuery<IGetMoviesResult>(["movies", "nowPlaying"], () =>
            getSearchMovies(String(keyword))
        );
    // themoviedb.org로 부터 검색해서 가져온 TV Show 정보
    const { data: tvSearch, isLoading: tvSearchLoading } =
        useQuery<IGetTvResult>(["tves", "nowPlaying"], () =>
            getSearchTves(String(keyword))
        );
    // 포스터 클릭 시 해당 영화의 ID를 포함하는 url로 이동하는 함수
    const onMoviePosterClicked = (movieId: number) => {
        navigate(`/search/movie/${movieId}?keyword=${keyword}`);
    };
    // 포스터 클릭 시 해당 영화의 ID를 포함하는 url로 이동하는 함수
    const onTvPosterClicked = (movieId: number) => {
        navigate(`/search/tv/${movieId}?keyword=${keyword}`);
    };
    // 현재 우리가 어느 route에 있는지 확인한다
    const detailMovieMatch: PathMatch<string> | null = useMatch(
        "search/movie/:searchId"
    );
    const detailTvMatch: PathMatch<string> | null = useMatch(
        "search/tv/:searchId"
    );
    // 영화 상세보기 밖의 오버레이 클릭 시 상세보기 창 닫기
    const onOverlayClicked = () => {
        navigate(`/search?keyword=${keyword}`);
    };
    // slider에서 클릭한 영화의 Id 가져오기
    const clickedMovieId =
        detailMovieMatch?.params.searchId &&
        movieSearch?.results.find(
            // 문자열 앞에 +를 붙이면 숫자열이 된다 => +"string"
            (movie) => String(movie.id) === detailMovieMatch.params.searchId
        );
    // slider에서 클릭한 tv의 Id 가져오기
    const clickedTvId =
        detailTvMatch?.params.searchId &&
        tvSearch?.results.find(
            // 문자열 앞에 +를 붙이면 숫자열이 된다 => +"string"
            (movie) => String(movie.id) === detailTvMatch.params.searchId
        );

    return (
        <Wrapper>
            <SearchBar>
                <SearchForm onSubmit={handleSubmit(onValid)}>
                    <SlMagnifier />
                    <Input
                        {...register("keyword", {
                            required: true,
                            minLength: 2,
                        })}
                        placeholder={String(keyword)}
                    />
                </SearchForm>
            </SearchBar>

            {movieSearchLoading && tvSearchLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <SearchTitle>
                        Result of searching with <span>{keyword}</span>
                    </SearchTitle>
                    <hr />
                    <ListTitle>🎬 Movie</ListTitle>
                    <PosterContainer>
                        {movieSearch?.results.map((movie) => (
                            <Poster
                                key={movie.id}
                                layoutId={movie.id + ""}
                                variants={PosterVariants}
                                initial="normal"
                                whileHover={"hover"}
                                transition={{ type: "tween" }}
                                onClick={() => onMoviePosterClicked(movie.id)}
                                bgPhoto={makeImagePath(
                                    movie.backdrop_path || movie.poster_path,
                                    "w500"
                                )}
                            >
                                <PosterInfo variants={PosterInfoVariants}>
                                    <h4>{movie.title}</h4>
                                </PosterInfo>
                            </Poster>
                        ))}
                    </PosterContainer>
                    <ListTitle>📺 TV Show</ListTitle>
                    <PosterContainer>
                        {tvSearch?.results.map((movie) => (
                            <Poster
                                key={movie.id}
                                layoutId={"tv" + movie.id + ""}
                                variants={PosterVariants}
                                initial="normal"
                                whileHover={"hover"}
                                transition={{ type: "tween" }}
                                // onClick의 onSliderPosterClicked 함수에 movie.id 인자를 넘겨줘야 하므로 익명함수를 사용한다
                                // 익명함수가 아닐 경우 인자를 넘겨주기 전에 함수가 실행된다
                                onClick={() => onTvPosterClicked(movie.id)}
                                bgPhoto={makeImagePath(
                                    movie.backdrop_path || movie.poster_path,
                                    "w500"
                                )}
                            >
                                <PosterInfo variants={PosterInfoVariants}>
                                    <h4>{movie.name}</h4>
                                </PosterInfo>
                            </Poster>
                        ))}
                    </PosterContainer>
                    <AnimatePresence>
                        {detailMovieMatch ? (
                            <>
                                <Overlay
                                    onClick={onOverlayClicked}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                                <PosterDetail
                                    layoutId={detailMovieMatch.params.searchId}
                                >
                                    {clickedMovieId && (
                                        <>
                                            <PosterDetailCover
                                                style={{
                                                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                                        clickedMovieId.backdrop_path,
                                                        "w500"
                                                    )})`,
                                                }}
                                            />
                                            <PosterDetailWrapper>
                                                <PosterDetailPoster
                                                    src={makeImagePath(
                                                        clickedMovieId.poster_path,
                                                        "w200"
                                                    )}
                                                />
                                                <PosterDetailContainer>
                                                    <PosterDetailTitle>
                                                        {clickedMovieId.title}
                                                    </PosterDetailTitle>
                                                    <PosterDetailOverView>
                                                        {clickedMovieId.overview ||
                                                            "줄거리가 존재하지 않습니다"}
                                                    </PosterDetailOverView>
                                                </PosterDetailContainer>
                                            </PosterDetailWrapper>
                                        </>
                                    )}
                                </PosterDetail>
                            </>
                        ) : null}

                        {detailTvMatch ? (
                            <>
                                <Overlay
                                    onClick={onOverlayClicked}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                                <PosterDetail
                                    layoutId={
                                        "tv" + detailTvMatch.params.searchId
                                    }
                                >
                                    {clickedTvId && (
                                        <>
                                            <PosterDetailCover
                                                style={{
                                                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                                        clickedTvId.backdrop_path,
                                                        "w500"
                                                    )})`,
                                                }}
                                            />
                                            <PosterDetailWrapper>
                                                <PosterDetailPoster
                                                    src={makeImagePath(
                                                        clickedTvId.poster_path,
                                                        "w200"
                                                    )}
                                                />
                                                <PosterDetailContainer>
                                                    <PosterDetailTitle>
                                                        {clickedTvId.name}
                                                    </PosterDetailTitle>
                                                    <PosterDetailOverView>
                                                        {clickedTvId.overview ||
                                                            "줄거리가 존재하지 않습니다"}
                                                    </PosterDetailOverView>
                                                </PosterDetailContainer>
                                            </PosterDetailWrapper>
                                        </>
                                    )}
                                </PosterDetail>
                            </>
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}

export default Search;
