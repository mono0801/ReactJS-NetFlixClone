// 자주 사용할 함수 라이브러리
import { useEffect, useState } from "react";
import notFound from "./assets/images/image_not_found.png";

/**
 * 영화 포스터 가져오는 함수
 @param id 해당 영화 id
 @param width 해당 영화 포스터의 너비
 @returns 해당 영화 포스터 값 반환
 */
export function makeImagePath(path: string, width?: string) {
    if (path == "" || path == null || path == undefined) {
        return notFound;
    } else {
        return `https://image.tmdb.org/t/p/${
            width ? width : "original"
        }/${path}`;
    }
}

/**
 * 윈도우의 너비를 반환하는 함수
 * @returns 현재 윈도우 사이트의 너비
 */
function getWindowDimensions() {
    const { innerWidth: width } = window;
    return width;
}

/**
 * 수시로 윈도우의 너비를 반환하는 함수
 * @returns 윈도우 사이트의 너비를 계속해서 반환
 */
export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    // 수시로 현재 사이트의 너비를 반환
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

/**
 * 현재 윈도우 너비에 따라 보여줄 포스터 갯수를 변경하는 함수
 * @param innerWidth 현재 윈도우의 너비
 * @returns offset (보여줄 포스터 갯수)
 */
export function changeOffset(innerWidth: number) {
    if (1870 <= window.innerWidth) {
        return 8;
    } else if (1650 <= window.innerWidth && window.innerWidth < 1870) {
        return 7;
    } else if (1425 <= window.innerWidth && window.innerWidth < 1650) {
        return 6;
    } else if (1200 <= window.innerWidth && window.innerWidth < 1425) {
        return 5;
    } else if (975 <= window.innerWidth && window.innerWidth < 1200) {
        return 4;
    } else if (752 <= window.innerWidth && window.innerWidth < 975) {
        return 3;
    } else {
        return 2;
    }
}
