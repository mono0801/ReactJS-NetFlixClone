// 하단 Footer

import { styled } from "styled-components";

const FooterLink = styled.footer`
    width: 100%;
    height: 40px;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
`;
function Footer() {
    return (
        <FooterLink>
            <div>
                <h4>Moblie</h4>
            </div>
        </FooterLink>
    );
}

export default Footer;
