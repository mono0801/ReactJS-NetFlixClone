// 자주 사용할 함수 라이브러리

// 영화 포스터 가져오는 함수
/**
 @param id 해당 영화 id
 @param width 해당 영화 포스터의 너비
 @returns 해당 영화 포스터 값 반환
 */
export function makeImagePath(id: string, width?: string) {
    return `https://image.tmdb.org/t/p/${width ? width : "original"}/${id}`;
}
