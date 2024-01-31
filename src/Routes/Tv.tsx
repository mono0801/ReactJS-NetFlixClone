// TV 상영 프로그램 소개 화면
import { styled } from "styled-components";

const Wrapper = styled.div`
    background: black;
    height: 200vh;
`;

function Tv() {
    return (
        <Wrapper>
            <h1>tv</h1>;
        </Wrapper>
    );
}

export default Tv;
