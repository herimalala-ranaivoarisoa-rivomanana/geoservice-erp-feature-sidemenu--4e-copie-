import styled from "styled-components";
import { useState } from "react";
import { useAppStore } from "@project/store";
import { useHistory } from "react-router";

const AppBar: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const {
    AuthStore: { user },
  } = useAppStore();

  const {
    AuthStore: { signOut },
  } = useAppStore();

  const history = useHistory();

  const logout = () => {
    signOut(() => {
      history.push("/");
    });
  };

  return (
    <Toolbar className="toolbar">
      <input
        className="toolbar__search"
        placeholder="Rechercher"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value!)}
      ></input>
      <div>
        <div slot="end" className="toolbar__username">
          {user && user.name}
        </div>
        <div slot="end" className="toolbar__avatar">
          <img src={user && user.imageUrl} alt="" />
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </Toolbar>
  );
};

export default AppBar;

export const Toolbar = styled.div`
  &.toolbar {
    width: 100%;
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #303a43;
    .toolbar__search {
      width: 32.43vw;
      max-width: 467px;
      height: 35px;
      margin-left:68px;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      .toolbar__username {
        height: 58px;
        display: flex;
        align-items: center;
        text-align: right;
        color: #ffffff;
      }
      .toolbar__avatar {
        min-width: 50px;
        height: 50px;
        background: #ffffff;
        border-radius: 50%;
        overflow: hidden;
      }
      .toolbar__avatar img {
        min-width: 50px;
        height: 50px;
        margin: auto;
      }
    }
    button {
      width: 96px;
      margin-right: 6.35vw;
      border-radius: 8px;
      color: var(--ion-color-primary);
      font-family: Poppins;
      font-size: 15px;
      font-weight: 700;
      line-height: 23px;
      letter-spacing: 0em;
    }
  }
  @media (min-width: 1025px) {
    .toolbar__search {
      margin-left: 16.87vw;
    }
    div {
      .toolbar__avatar {
        //margin-right: 8.47vw;
        margin-right: 2.15vw;
        margin-left: 2.15vw;
      }
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .toolbar__search {
      margin-left: 10.87vw;
    }
    div {
      .toolbar__username {
        margin-left: 1.39vw;
      }
      .toolbar__avatar {
        margin-right: 8.47vw;
        margin-left: 1.39vw;
      }
    }
  }
  @media (max-width: 768px) {
    .toolbar__search {
      margin-left: 8.47vw;
    }
    div {
      .toolbar__username {
        margin-left: 1.39vw;
      }
      .toolbar__avatar {
        margin-right: 8.47vw;
        margin-left: 10px;
      }
    }
  }
`;
