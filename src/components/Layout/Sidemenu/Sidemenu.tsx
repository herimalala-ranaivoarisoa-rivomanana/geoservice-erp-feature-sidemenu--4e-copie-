import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppStore } from "@project/store";

import ClickAwayListener from "react-click-away-listener";

interface IProps{
  windowDimension:object;
}

const SideMenu: React.FC <IProps>= ({windowDimension}) => {
  const {
    AuthStore: { user },
  } = useAppStore();

  const [routes, setRoutes] = useState({
    appPages: [{ title: "Home", path: "/" }],
    loggedInPages: [
      {
        title: "Gestion Taxis",
        submenus: [
          { title: "Chauffeurs", path: "/taxis/chauffeurs" },
          { title: "Facturations", path: "/taxis/Facturations" },
        ],
        sub: false,
      },
      { title: "Clients", submenus: [], sub: false, path: "/clients" },
      { title: "Pharmaciens", submenus: [], sub: false, path: "/pharmaciens" },

      {
        title: "Utilisateurs",
        submenus: [],
        sub: false,
        path: "/users",
      },
      { title: "Mon compte", path: "/user" },
    ],
  });

  const actMenuItem = (menu: any, index: number) => {
    if (!!menu.path) {
      return (
        <MenuItem sub={menu.sub} key={index} className="menu__item">
          <Link replace className="link" to={menu.path}>
            {menu.title}
          </Link>
        </MenuItem>
      );
    } else {
      return (
        <ClickAwayListener
          key={index}
          onClickAway={() => {
            if (menu.sub) leaveOverlay(menu);
          }}
        >
          <MenuItem
            sub={menu.sub}
            onClick={() => {
              submenuOverlay(menu);
            }}
            className="menu__item"
          >
            {menu.title}

            {menu.submenus.map((submenu: any, subIndex: number) => {
              return (
                <Link key={subIndex} replace className="link" to={submenu.path}>
                  <div className="menu__item submenu">{submenu.title}</div>
                </Link>
              );
            })}
          </MenuItem>
        </ClickAwayListener>
      );
    }
  };

  const submenuOverlay = (menu: any) => {
    const index = routes.loggedInPages.indexOf(menu);
    let routesTemp = routes;
    routesTemp.loggedInPages.splice(index, 1, {
      ...menu,
      sub: true,
    });
    setRoutes(Object.assign({}, routesTemp));
  };

  const leaveOverlay = (menu: any) => {
    const index = routes.loggedInPages.indexOf(menu);
    let routesTemp = routes;
    routesTemp.loggedInPages.splice(index, 1, {
      ...menu,
      sub: false,
    });
    setRoutes(Object.assign({}, routesTemp));
  };

  useEffect(() => {}, [routes]);

  useEffect(() => {
    if (!!user) {
      setRoutes({
        appPages: [{ title: "Home", path: "/" }],
        loggedInPages: [
          {
            title: "Gestion Taxis",
            submenus: [
              { title: "Chauffeurs", path: "/taxis/chauffeurs" },
              { title: "Facturations", path: "/taxis/Facturations" },
            ],
            sub: false,
          },
          { title: "Clients", submenus: [], sub: false, path: "/clients" },
          {
            title: "Pharmaciens",
            submenus: [],
            sub: false,
            path: "/pharmaciens",
          },

          {
            title: "Utilisateurs",
            submenus: [],
            sub: false,
            path: "/users",
          },
          { title: "Mon compte", path: `/users/${user.id}` },
        ],
      });
    }
  }, [user]);

  return (
    <SideMenuWrapper           className={`${
      window.innerWidth > 860
        ? "sidemenu"
        : "sidemenu_mobile"
    }`}>
      {routes.appPages.map((art: any, index: number) => {
        return actMenuItem(art, index);
      })}
      {routes.loggedInPages.map((art: any, index: number) => {
        return actMenuItem(art, index);
      })}
    </SideMenuWrapper>
  );
};
export default SideMenu;

interface ISub {
  sub: boolean;
}

const SideMenuWrapper = styled.div`
  position: absolute;
  width: 15.49vw;
  min-width: 140px;
  height: 100vh;
  background-color: #61666b;
  z-index:200;
  &.sidemenu__mobile{
    z-index:5000;
    top: 59px;
    left: 0;
  }
  &.sidemenu{
    top: 58.2px;
    left: 0;
  }
`;
const MenuItem = styled.div<ISub>`
  &.menu__item {
    width: 100%;
    min-height: 46px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: #ffffff;
    font-family: Poppins;
    font-size: 15px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    text-decoration: none;
    padding-left: 14px;
    cursor: pointer;
    &:nth-child(1) {
      margin-top: 1px;
    }
    &:hover {
      background-color: ${(props) => (props.sub ? "" : "#303a43")};
    }
    .submenu {
      position: relative;
      left: -14px;
      width: calc(100% + 14px);
      height: 46px;
      display: ${(props) => (props.sub ? "flex" : "none")};
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      font-family: Poppins;
      font-size: 15px;
      font-weight: 400;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: left;
      padding-left: 28px;
      &:hover {
        background-color: #303a43;
      }
    }

    .link {
      width: 100%;
      text-decoration: none;
      color: #ffffff;
      cursor: pointer;
    }
  }
`;
