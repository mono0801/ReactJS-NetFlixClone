// 영상 포스터와 제목을 보여주는 Card
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { makeImagePath } from "../../utils";

// 검색된 영화
const Poster = styled(motion.div)<{ bgPhoto: string }>`
    width: 200px;
    height: 300px;
    background-color: ${(props) => props.theme.black.lighter};
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
    width: 200px;
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
// 검색된 영화 포스터 제목 애니메이션 설정
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

/**
 * 영상의 목록을 보여주기 위한 Card
 * @param category movie | tv | search
 * @param searchCategory Search에서 사용 : movie | tv
 * @param keyword Search에서 검색한 키워드
 * @param tagName Cards의 이름 : 띄어쓰기 X
 * @param id 해당 영상의 id
 * @param backdrop_path 해당 영상의 Backdrop path
 * @param poster_path 해당 영상의 Poster path
 * @param title 해당 영상의 제목 : 영화는 title, TV Show는 name
 * @returns 해당 영상의 Card
 */
function Card({
    category,
    searchCategory,
    keyword,
    tagName,
    id,
    backdrop_path,
    poster_path,
    title,
}: {
    category: "movie" | "tv" | "search";
    searchCategory?: "movie" | "tv";
    keyword: string | null;
    tagName?: string;
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
}) {
    // 특정 라우터로 보내기
    const navigate = useNavigate();
    // 포스터 클릭 시 해당 영화의 ID를 포함하는 url로 이동하는 함수
    const onCardClicked = (Id: number) => {
        if (category == "search") {
            // search의 TV Show 리스트 카드 클릭 시
            if (searchCategory == "tv") {
                navigate(`/search/tv/${Id}?keyword=${keyword}`);
            }
            // search의 Movie 리스트 카드 클릭 시
            else {
                navigate(`/search/movie/${Id}?keyword=${keyword}`);
            }
        }
        // TV Show 리스트 카드 클릭 시
        else if (category == "tv") {
            navigate(`/tv/${tagName}/${Id}`);
        }
        // Home 리스트 카드 클릭 시
        else {
            navigate(`/movies/${tagName}/${Id}`);
        }
    };

    return (
        <Poster
            layoutId={String(tagName) + id}
            variants={PosterVariants}
            initial="normal"
            whileHover={"hover"}
            transition={{ type: "tween" }}
            bgPhoto={makeImagePath(poster_path || backdrop_path, "w200")}
            onClick={() => onCardClicked(id)}
        >
            <PosterInfo variants={PosterInfoVariants}>
                <h4>{title}</h4>
            </PosterInfo>
        </Poster>
    );
}

export default Card;
