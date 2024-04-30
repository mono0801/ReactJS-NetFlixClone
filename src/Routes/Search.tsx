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
import { AnimatePresence } from "framer-motion";
import Card from "../Components/List/Card";
import Loading from "../Components/Loading";
import MovieDetail from "../Components/Detail/MovieDetail";
import TvDetail from "../Components/Detail/TvDetail";
import { useEffect } from "react";
import { useWindowDimensions } from "../utils";

const Wrapper = styled.div`
    padding: 60px;
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
const CardContainer = styled.div<{ offset: number }>`
    width: 100%;
    height: auto;
    min-height: 28vh;
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: repeat(${(props) => props.offset}, 200px);
    grid-gap: 40px;
    // 마지막 슬라이더의 포스터는 왼쪽으로 커지게
    div:last-child {
        transform-origin: center right;
    }
    // 첫번째 슬라이더의 포스터는 오른쪽으로 커지게
    div:first-child {
        transform-origin: center left;
    }
`;
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
    const { register, handleSubmit, setValue } = useForm<IForm>();
    // 특정 라우터로 보내기
    const navigate = useNavigate();
    // Input에서 가져온 값이 유효한지 검사
    const onValid = (data: IForm) => {
        setValue("keyword", "");
        navigate(`/search?keyword=${data.keyword}`);
    };
    // themoviedb.org로 부터 검색해서 가져온 영화 정보
    const {
        data: movieSearch,
        isLoading: movieSearchLoading,
        refetch: movieRefetch,
    } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], () =>
        getSearchMovies(String(keyword))
    );
    // themoviedb.org로 부터 검색해서 가져온 TV Show 정보
    const {
        data: tvSearch,
        isLoading: tvSearchLoading,
        refetch: tvRefetch,
    } = useQuery<IGetTvResult>(["tves", "nowPlaying"], () =>
        getSearchTves(String(keyword))
    );
    // 현재 우리가 어느 route에 있는지 확인한다
    const detailMovieMatch: PathMatch<string> | null =
        useMatch("search/movie/:Id");
    const detailTvMatch: PathMatch<string> | null = useMatch("search/tv/:Id");
    useEffect(() => {
        movieRefetch();
        tvRefetch();
    }, [keyword, movieRefetch, tvRefetch]);
    const width = useWindowDimensions();
    // offset : 한 슬라이드에 보여줄 Card 갯수
    let offset = 7;
    // 반응형으로 설정
    if (1830 <= width) {
        offset = 7;
    } else if (1600 <= width && width < 1830) {
        offset = 6;
    } else {
        offset = 5;
    }
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
                <Loading />
            ) : (
                <>
                    <SearchTitle>
                        Result of searching with <span>{keyword}</span>
                    </SearchTitle>
                    <hr />
                    <ListTitle>🎬 Movie</ListTitle>
                    <CardContainer offset={offset}>
                        {movieSearch?.results.map((movie) => (
                            <Card
                                key={movie.id}
                                category={"search"}
                                searchCategory={"movie"}
                                keyword={keyword}
                                id={movie.id}
                                backdrop_path={movie.backdrop_path}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                    </CardContainer>
                    <ListTitle>📺 TV Show</ListTitle>
                    <CardContainer offset={offset}>
                        {tvSearch?.results.map((tv) => (
                            <Card
                                key={tv.id}
                                category={"search"}
                                searchCategory={"tv"}
                                keyword={keyword}
                                id={tv.id}
                                backdrop_path={tv.backdrop_path}
                                poster_path={tv.poster_path}
                                title={tv.name}
                            />
                        ))}
                    </CardContainer>
                    <AnimatePresence>
                        {detailMovieMatch ? (
                            <MovieDetail
                                keyword={String(keyword)}
                                videoId={String(detailMovieMatch.params.Id)}
                            />
                        ) : null}
                        {detailTvMatch ? (
                            <TvDetail
                                keyword={String(keyword)}
                                videoId={String(detailTvMatch.params.Id)}
                            />
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}

export default Search;
