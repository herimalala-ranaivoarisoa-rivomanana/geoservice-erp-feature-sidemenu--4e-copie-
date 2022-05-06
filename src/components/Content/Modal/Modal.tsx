import React from "react";
import ReactDOM from "react-dom";
import ClickAwayListener from "react-click-away-listener";
import styled from "styled-components";

type ModalProps = {
  isVisible: boolean;
  toggleVisibility: () => void;
  modalContent: React.ReactNode;
  title: string;
};

export const Modal = ({
  isVisible,
  toggleVisibility,
  modalContent,
  title,
}: Readonly<ModalProps>): JSX.Element | null => {
  const modal: JSX.Element = (
    <PageWrapper
    className={`${window.innerWidth > 720 ? "portrait" : "landscape"}`}
  >
      <ClickAwayListener onClickAway={toggleVisibility}>
        <ModalContainer className="modal__container">
          <div className="backdrop" onClick={toggleVisibility} />
          <div className="modal__title">{title.toUpperCase()}</div>
          <div
            className="modal"
            aria-modal
            aria-label="Modal Details"
            role="dialog"
          >
            {modalContent}
          </div>
          <div
            className="modal-close"
            aria-label="Close Modal Details"
            onClick={toggleVisibility}
          >
            {/*&times;*/}
          </div>
        </ModalContainer>
      </ClickAwayListener>
    </PageWrapper>
  );

  return isVisible ? ReactDOM.createPortal(modal, document.body) : null;
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
const ModalContainer = styled.div`
  position: fixed;
  top: 120px;
  left: 30%;
  width: 40%;
  height: 620px;
  margin: auto;
  margin-top: 60px;
  &.modal__container {
    border-radius: 9px;
    background-color: #e5e5e5;

    .modal__title {
      width: 100%;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Poppins;
      font-size: 14px;
      font-weight: 700;
      line-height: 21px;
      letter-spacing: 0em;
      text-align: center;
    }
    .modal {
      position: fixed;
      left: 30%;
      top: 222px;
      width: 40%;
      height: 620px;
      padding: 20px 10px 0px 10px;
      align-items: center;
      background-color: white;
      border-bottom-left-radius: 9px;
      border-bottom-right-radius: 9px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: center;
      overflow: hidden;
    }

    .modal > * {
      margin: 0;
    }
    .modal-close {
      position: fixed;
      bottom: -42px;
      left: 0px;
      color: white;
      background-color: transparent;
      cursor: pointer;
      font-size: 2rem;
      line-height: 1rem;
      padding: 0;
      position: absolute;
      width: 130px;
      height: 68px;

      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
    }
    .backdrop {
      background-color: rgba(97, 102, 107, 0.6);
      bottom: 0;
      left: 0;
      position: fixed;
      right: 0;
      top: 58px;
      height:100%;
    }
    .content__wrapper {
      margin: 0;
    }
    div {
    }
  }
`;
