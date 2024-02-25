// themoviedb.org 사이트의 정보 api 키
// https://api.themoviedb.org/3/movie/now_playing?language=ko&api_key=48325c3d1892253f6a5bb8d5d4d7cd0e
// https://api.themoviedb.org/3/tv/popular?language=ko&api_key=48325c3d1892253f6a5bb8d5d4d7cd0e
// https://api.themoviedb.org/3/search/movie?query={}&api_key=48325c3d1892253f6a5bb8d5d4d7cd0e
// https://api.themoviedb.org/3/search/tv?query={}&language=ko&api_key=48325c3d1892253f6a5bb8d5d4d7cd0e
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
// 영상 장르
interface IGenres {
    id: number;
    name: string;
}
// 제작 회사 & 배급 회사
interface IProproductionCompanies {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}
// 제작 나라
interface IproductionCountries {
    iso_3166_1: string;
    name: string;
}
interface IspokenLanguages {
    english_name: string;
    iso_639_1: string;
    name: string;
}
// API로 가져온 영화 상세 정보 형식 지정
export interface IGetDetailMovieResult {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    original_title: string;
    overview: string;
    genres: IGenres[];
    production_companies: IProproductionCompanies[];
    production_countries: IproductionCountries[];
    release_date: string;
    runtime: string;
    spoken_languages: IspokenLanguages[];
    tagline: string;
    vote_average: number;
}
// API로 가져온 Tv Show 상세 정보 형식 지정
export interface IGetDetailTvResult {
    id: number;
    backdrop_path: string;
    poster_path: string;
    name: string;
    original_name: string;
    overview: string;
    genres: IGenres[];
    production_companies: IProproductionCompanies[];
    production_countries: IproductionCountries[];
    number_of_seasons: number;
    number_of_episodes: number;
    spoken_languages: IspokenLanguages[];
    vote_average: number;
}
// 현재 상영 영화 API로 정보 가져오기
export function getMovies() {
    return fetch(
        `${BASE_PATH}/movie/now_playing?language=ko&region=kr&api_key=${API_KEY}`
    ).then((response) => response.json());
}
// 누적 시청 수가 가장 높은 영화 API로 정보 가져오기
export function getTopRatedMovies() {
    return fetch(
        `${BASE_PATH}/movie/top_rated?language=ko&region=kr&api_key=${API_KEY}`
    ).then((response) => response.json());
}
// 상영될 영화 API로 정보 가져오기
export function getPopularMovies() {
    return fetch(
        `${BASE_PATH}/movie/upcoming?language=ko&region=kr&api_key=${API_KEY}`
    ).then((response) => response.json());
}
// 상영될 영화 API로 정보 가져오기
export function getUpcomingMovies() {
    return fetch(
        `${BASE_PATH}/movie/popular?language=ko&region=kr&api_key=${API_KEY}`
    ).then((response) => response.json());
}
// 인기있는 TV API로 정보 가져오기
export function getTves() {
    return fetch(
        `${BASE_PATH}/tv/popular?language=ko&region=kr&api_key=${API_KEY}`
    ).then((response) => response.json());
}
// 현재 방영 TV API로 정보 가져오기
export function getTopRatedTves() {
    return fetch(
        `${BASE_PATH}/tv/top_rated?language=ko&region=kr&api_key=${API_KEY}`
    ).then((response) => response.json());
}
// Airing Today TV API로 정보 가져오기
export function getAiringTodayTves() {
    return fetch(
        `${BASE_PATH}/tv/airing_today?language=ko&region=kr&api_key=${API_KEY}`
    ).then((response) => response.json());
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
/**
 * 키워드 검색을 통해 API로 영화 리스트 정보 가져오기
 * @param id 검색할 영화의 id
 * @returns 해당 키워드로 검색된 영화의 상세정보 json 파일
 */
export function getVideoDetail(category: "movie" | "tv", id: string) {
    return fetch(
        `${BASE_PATH}${category}/${id}?&language=ko&api_key=${API_KEY}`
    ).then((response) => response.json());
}
