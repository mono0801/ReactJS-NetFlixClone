import { useSearchParams } from "react-router-dom";

function Search() {
    // url의 파라미터를 가져오기
    const [searchParams] = useSearchParams();
    // url의 파라미터 값을 저장하기
    const keyword = searchParams.get(`keyword`);
    console.log(keyword);
    return <h1>{keyword}</h1>;
}

export default Search;
