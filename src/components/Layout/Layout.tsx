import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppBar from "src/components/Layout/AppBar/AppBar";
import SideMenu from "src/components/Layout/Sidemenu/Sidemenu";

/**
 * Layout page component
 * @param {string} className            (Optional) Override className internal configuration
 * @returns                             Layout react component
 */
const Layout: React.FC = ({ children }) => {
  const [openSidemenu, setOpenSidemenu] = useState(false);
  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    if (windowDimension.winWidth < 860) setOpenSidemenu(false);
    if (windowDimension.winWidth > 860) setOpenSidemenu(true);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  return (
    <PageWrapper
      className={`${windowDimension.winWidth > 720 ? "portrait" : "landscape"}`}
    >
      <AppBar />
      {openSidemenu && <SideMenu windowDimension={windowDimension}></SideMenu>}

      <ContentWrapper
        id="content"
        className={`${
          window.innerWidth > 860
            ? "content__with__sidemenu"
            : "content__without__sidemenu"
        }`}
      >
        {children}
      </ContentWrapper>

      {windowDimension.winWidth < 860 && (
        <MenuButton onClick={() => setOpenSidemenu(!openSidemenu)}>
          &#9776;
        </MenuButton>
      )}
    </PageWrapper>
  );
};

export const PageWrapper = styled.div`
  &.portrait {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  &.landscape {
    position: relative;
    transform: rotate(90deg);
    transform-origin: bottom left;
    top: -100vw;
    left: 0;
    height: 100vw;
    width: 100vh;
    overflow: auto;
  }
`;

export const BodyContainer = styled.div`
  &.body__container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;
export const ContentWrapper = styled.div`
  height: 100%;

  &.content__with__sidemenu {
    position: absolute;
    top: 59px;
    left: 15.49%;
    width: 84.51%;
  }
  &.content__without__sidemenu {
    position: absolute;
    top: 59px;
    width: 84.51%;
    width: 100%;
    overflow: hidden;
  }
`;

export const PageTitle = styled.h1`
  &.content__title {
    font-weight: 500;
    font-size: var(--font-xl);
    margin-bottom: 18px;
    text-align: left;
  }
`;

const MenuButton = styled.button`
  position: absolute;
  top: 9px;
  left: 14px;
  width: 40px;
  height: 40px;
`;

export default Layout;
