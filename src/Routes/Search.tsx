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
import Modal from "../Components/Modal";
import Card from "../Components/Card";

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
    // 현재 우리가 어느 route에 있는지 확인한다
    const detailMovieMatch: PathMatch<string> | null = useMatch(
        "search/movie/:searchId"
    );
    const detailTvMatch: PathMatch<string> | null = useMatch(
        "search/tv/:searchId"
    );
    // Card에서 클릭한 영화의 Id 가져오기
    const clickedMovieId =
        detailMovieMatch?.params.searchId &&
        movieSearch?.results.find(
            // 문자열 앞에 +를 붙이면 숫자열이 된다 => +"string"
            (movie) => String(movie.id) === detailMovieMatch.params.searchId
        );
    // Card에서 클릭한 tv의 Id 가져오기
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
                    </PosterContainer>
                    <ListTitle>📺 TV Show</ListTitle>
                    <PosterContainer>
                        {tvSearch?.results.map((movie) => (
                            <Card
                                key={movie.id}
                                category={"search"}
                                searchCategory={"tv"}
                                keyword={keyword}
                                id={movie.id}
                                backdrop_path={movie.backdrop_path}
                                poster_path={movie.poster_path}
                                title={movie.name}
                            />
                        ))}
                    </PosterContainer>
                    <AnimatePresence>
                        {detailMovieMatch && clickedMovieId ? (
                            <Modal
                                keyword={keyword}
                                detailMatch={detailMovieMatch}
                                backdrop_path={clickedMovieId.backdrop_path}
                                poster_path={clickedMovieId.poster_path}
                                title={clickedMovieId.title}
                                overview={clickedMovieId.overview}
                            />
                        ) : null}
                        {detailTvMatch && clickedTvId ? (
                            <Modal
                                keyword={keyword}
                                detailMatch={detailTvMatch}
                                backdrop_path={clickedTvId.backdrop_path}
                                poster_path={clickedTvId.poster_path}
                                title={clickedTvId.name}
                                overview={clickedTvId.overview}
                            />
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}

export default Search;
