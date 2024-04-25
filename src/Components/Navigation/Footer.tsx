// 하단 Footer

import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const FooterLink = styled.footer`
    width: 100%;
    height: 40px;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
`;
const FooterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FooterSpan = styled.h4`
    font-size: 150%;
`;
function Footer() {
    return (
        <FooterLink>
            <FooterContainer>
                <FooterSpan>Moblie</FooterSpan>
                <span style={{ padding: "0px 10px" }}>|</span>
                <FooterSpan>
                    <Link to={`https://github.com/mono0801`} target="_blank">
                        GitHub
                    </Link>
                </FooterSpan>
            </FooterContainer>
        </FooterLink>
    );
}

export default Footer;
