// Loading 중인지 표시
import { styled } from "styled-components";

// API 로딩 중일 때 표시
const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

/**
 * 로딩 중인지 표시
 * @returns Loading...
 */
function Loading() {
    return <Loader>Loading...</Loader>;
}

export default Loading;
