// themoviedb.org 사이트의 정보 api 키
// https://api.themoviedb.org/3/movie/now_playing?language=ko&api_key=48325c3d1892253f6a5bb8d5d4d7cd0e
// https://api.themoviedb.org/3/tv/popular?language=ko&api_key=48325c3d1892253f6a5bb8d5d4d7cd0e
// https://api.themoviedb.org/3/search/movie?query={}&api_key=48325c3d1892253f6a5bb8d5d4d7cd0e
// https://api.themoviedb.org/3/search/tv?query=Fallon&language=ko&api_key=48325c3d1892253f6a5bb8d5d4d7cd0e
const API_KEY = "48325c3d1892253f6a5bb8d5d4d7cd0e";
const BASE_PATH = "https://api.themoviedb.org/3/";

// API로 가져온 영화 목록 중 개별 정보 형식 지정
interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}
// API로 가져온 TV 목록 중 개별 정보 형식 지정
interface ITv {
    id: number;
    backdrop_path: string;
    poster_path: string;
    name: string;
    overview: string;
}
// API로 가져온 영화 정보 리스트 형식 지정
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
// API로 가져온 TV 정보 리스트 형식 지정
export interface IGetTvResult {
    page: number;
    results: ITv[];
    total_pages: number;
    total_results: number;
}
// 현재 상영 영화 API로 정보 가져오기
export function getMovies() {
    return fetch(
        `${BASE_PATH}/movie/now_playing?language=ko&api_key=${API_KEY}`
    ).then((response) => response.json());
}
// 현재 방영 TV API로 정보 가져오기
export function getTves() {
    return fetch(`${BASE_PATH}/tv/popular?language=ko&api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}
/**
 * 키워드 검색을 통해 API로 영화 리스트 정보 가져오기
 * @param keyword 검색할 키워드
 * @returns 해당 키워드로 검색된 json 파일
 */
export function getSearchMovies(keyword: string) {
    return fetch(
        `${BASE_PATH}search/movie?query=${keyword}&language=ko&api_key=${API_KEY}`
    ).then((response) => response.json());
}
/**
 * 키워드 검색을 통해 API로 TV 리스트 정보 가져오기
 * @param keyword 검색할 키워드
 * @returns 해당 키워드로 검색된 json 파일
 */
export function getSearchTves(keyword: string) {
    return fetch(
        `${BASE_PATH}search/tv?query=${keyword}&language=ko&api_key=${API_KEY}`
    ).then((response) => response.json());
}
