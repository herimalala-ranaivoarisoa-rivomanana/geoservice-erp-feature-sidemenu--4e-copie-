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
          <div
            className="modal-close"
            aria-label="Close Modal Details"
            onClick={toggleVisibility}
          >
            {/*&times;*/}
          </div>
        </div>
      </ModalContainer>
    </ClickAwayListener>
  );

  return isVisible ? ReactDOM.createPortal(modal, document.body) : null;
};

const ModalContainer = styled.div`
  position: absolute;
  top: 8vh;
  left: 33.33vw;
  width: 34.86vw;
  height: auto;
  margin: auto;
  margin-top: 60px;
  min-height: 502px;
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
      position: relative;
      left: 50%;
      top: 296px;
      width: 100%;
      min-height: 502px;
      padding: 20px 10px 0px 10px;
      align-items: center;
      background-color: white;
      border-bottom-left-radius: 9px;
      border-bottom-right-radius: 9px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      transform: translate(-50%, -50%);
      overflow: hidden;
    }

    .modal > * {
      margin: 0;
    }
    .modal-close {
      color: white;
      background-color: transparent;
      cursor: pointer;
      font-size: 2rem;
      line-height: 1rem;
      padding: 0;
      position: absolute;
      z-index: 1000;
      width: 134px;
      height: 68px;
      bottom: 0px;
      left: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
    }
    .backdrop {
      background-color: rgba(97, 102, 107, 0.6);
      bottom: 0;
      left: 15.49vw;
      position: fixed;
      right: 0;
      top: 58px;
    }
    .content__wrapper {
      margin: 0;
    }
    div {
    }
  }
`;
