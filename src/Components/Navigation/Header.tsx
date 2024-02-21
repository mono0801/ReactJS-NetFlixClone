// 상단 헤더
import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useForm } from "react-hook-form";

// 상단 헤더에 위치할 네비게이션 바
const Nav = styled(motion.nav)`
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    font-size: 14px;
    padding: 15px 20px;
    color: white;
`;
// 네비게이션 바에 속한 컴포넌트
const Col = styled.div`
    display: flex;
    align-items: center;
`;
// 넷플릭스 로고
const Logo = styled(motion.svg)`
    margin-right: 50px;
    width: 95px;
    height: 25px;
    fill: ${(props) => props.theme.red};
    path {
        stroke-width: 6px;
        stroke: white;
    }
`;
// 네비게이션에 들어갈 항목 리스트
const Items = styled.ul`
    display: flex;
    align-items: center;
`;
// 항목
const Item = styled(motion.li)`
    margin-right: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: ${(props) => props.theme.white.darker};
    transition: color 0.3s ease-in-out;
    &:hover {
        color: ${(props) => props.theme.white.lighter};
    }
`;
// 현재 접속된 항목 하이라이트 효과
const CurrentRedDot = styled(motion.span)`
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    bottom: -9px;
    background-color: ${(props) => props.theme.red};
    right: -9px;
    top: -3px;
`;
// 항목 Hover 애니메이션용
const HighLight = styled(motion.span)`
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.white.lighter};
    // 가운데로 위치 시키기
    right: 0;
    left: 0;
    bottom: -4px;
    margin: 0 auto;
`;
// 검색창
const Search = styled.form`
    display: flex;
    align-items: center;
    position: relative;
    color: white;
    svg {
        height: 25px;
    }
`;
// 돋보기 클릭 시 나타나는 input 검색창
const Input = styled(motion.input)`
    left: -190px;
    padding: 7px 13px;
    padding-left: 40px;
    position: absolute;
    z-index: -1;
    color: white;
    font-size: 13px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.white.lighter};
    border-radius: 10px;
    // 애니메이션이 시작되는 위치 설정
    transform-origin: right center;
`;
// 넷플릭스 로고 애니메이션
const logoVariants = {
    normal: {
        fillOpacity: 1,
    },
    active: {
        // 단계를 세부적으로 설정 가능
        fillOpacity: [0, 1, 0],
        transition: {
            repeat: Infinity,
        },
    },
};
// 내비게이션 애니메이션
const navVariants = {
    top: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        color: "rgba(0, 0, 0, 1)",
    },
    scroll: {
        backgroundColor: "rgba(0, 0, 0, 1)",
        color: "${(props) => props.theme.white.lighter}",
    },
};
// 검색창 인터페이스
interface IForm {
    keyword: string;
}

function Header() {
    // 현재 우리가 어느 route에 있는지 반환한다
    const homeMatch = useMatch("/");
    const tvMatch = useMatch("tv");
    const movieMatch = useMatch("/movies/*");
    const tvdetailMatch = useMatch("/tv/*");
    // 검색창이 활성화 되었는지 판단
    const [searchOpen, setSearchOpen] = useState(false);
    const toggleSearch = () => {
        setSearchOpen((prev) => !prev);
    };
    const disableSearch = () => setSearchOpen(false);
    // 검색창 외부 영역 클릭 시 검색창 비활성화
    const outRef = useDetectClickOutside({
        onTriggered: disableSearch,
        // esc 누르면 비활성화 되는 기능 해제
        disableKeys: true,
    });
    // 네비게이션 바의 항목이 hover중 인지 판단
    const [itemHover1, setItemHover1] = useState(false);
    const toggleItem1 = () => setItemHover1((prev) => !prev);
    const [itemHover2, setItemHover2] = useState(false);
    const toggleItem2 = () => setItemHover2((prev) => !prev);
    // 특정 코드를 통해 navgation에 애니메이션을 실행
    const navAnimaiton = useAnimation();
    // scroll이 얼만큼 내려갔는지 퍼센트 반환
    const { scrollY } = useScroll();
    // scroll 위치에 따른 애니메이션 효과 실행
    useEffect(() => {
        scrollY.onChange(() => {
            if (scrollY.get() > 30) {
                navAnimaiton.start("scroll");
            } else {
                navAnimaiton.start("top");
            }
        });
    }, [scrollY]);
    // Input에서 입력한 값을 가져오기
    const { register, handleSubmit, setValue } = useForm<IForm>();
    // 특정 라우터로 보내기
    const navigate = useNavigate();
    // Input에서 가져온 값이 유효한지 검사
    const onValid = (data: IForm) => {
        setValue("keyword", "");
        navigate(`/search?keyword=${data.keyword}`);
    };

    return (
        <Nav variants={navVariants} animate={navAnimaiton} initial={"top"}>
            <Col>
                <Link to={"/"}>
                    <Logo
                        variants={logoVariants}
                        whileHover="active"
                        initial="normal"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1024"
                        height="276.742"
                        viewBox="0 0 1024 276.742"
                    >
                        <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
                    </Logo>
                </Link>
                <Items>
                    <Item onHoverStart={toggleItem1} onHoverEnd={toggleItem1}>
                        <Link to={"/"}>
                            Home
                            {(homeMatch || movieMatch) && (
                                <CurrentRedDot layoutId="current" />
                            )}
                            <HighLight
                                initial={{
                                    scaleX: 0,
                                }}
                                animate={{
                                    scaleX: itemHover1 ? 1 : 0,
                                }}
                            />
                        </Link>
                    </Item>
                    <Item onHoverStart={toggleItem2} onHoverEnd={toggleItem2}>
                        <Link to={"tv"}>
                            TV Show
                            {(tvMatch || tvdetailMatch) && (
                                <CurrentRedDot layoutId="current" />
                            )}
                            <HighLight
                                initial={{
                                    scaleX: 0,
                                }}
                                animate={{
                                    scaleX: itemHover2 ? 1 : 0,
                                }}
                            />
                        </Link>
                    </Item>
                </Items>
            </Col>
            <Col>
                <Search onSubmit={handleSubmit(onValid)} ref={outRef}>
                    <Input
                        {...register("keyword", {
                            required: true,
                            minLength: 2,
                        })}
                        animate={{
                            scaleX: searchOpen ? 1 : 0,
                            opacity: searchOpen ? 0.8 : 0,
                        }}
                        transition={{ type: "linear" }}
                        placeholder="Search for Movie or TV show"
                    />
                    <motion.svg
                        onClick={toggleSearch}
                        animate={{ x: searchOpen ? -180 : 0 }}
                        transition={{ type: "linear" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </motion.svg>
                </Search>
            </Col>
        </Nav>
    );
}

export default Header;
