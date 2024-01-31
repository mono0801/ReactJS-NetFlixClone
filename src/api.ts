// themoviedb.org 사이트의 영화 정보 api 키
const API_KEY = "48325c3d1892253f6a5bb8d5d4d7cd0e";
const BASE_PATH = "https://api.themoviedb.org/3/";

// API로 가져온 영화 목록 중 개별 영화 정보 형식 지정
interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

// API로 가져온 정보 형식 지정
export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

// 현재 상영 영화 API로 정보 가져오기
export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}
