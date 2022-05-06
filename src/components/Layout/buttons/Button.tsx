import React, { useEffect, useState } from "react";

import styled from "styled-components";

export interface IProps {
  className?: string;

  text: any;
  action?: () => void;
}
/**
 * TableViewer page component
 * @param {string} className            Override default class
 * @returns                             Button react component
 */
const Button: React.FC<IProps> = ({ className, text, action }) => {
  return (
    <StyledButton className={className} onClick={action}>
      <div className="text">{text}</div>
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.div`
  height: 37px;
  width: 116px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.button__primary {
    background: rgba(48, 58, 67, 1);
    background: linear-gradient(to right, #61666b 50%, #303a43 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 0.5s ease-out;
    cursor: pointer;
    &:hover {
      background-position: left bottom;
    }
    .text {
      font-family: Poppins;
      font-size: 15px;
      font-weight: 700;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: center;
      color: #e5e5e5;
      transition: all 0.6s ease-out;
      display: block;
    }
    .text:hover {
      color: #e5e5e5;
    }
  }
  &.button__secondary {
    border: 1px solid rgba(48, 58, 67, 1);
    background: #ffffff;
    background: linear-gradient(to right, #61666b 50%, #ffffff 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 0.5s ease-out;
    cursor: pointer;
    &:hover {
      background-position: left bottom;
    }
    .text {
      font-family: Poppins;
      font-size: 15px;
      font-weight: 700;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: center;
      color: rgba(48, 58, 67, 1);

      transition: all 0.6s ease-out;
      display: block;
    }
    .text:hover {
      color: rgba(48, 58, 67, 1);
    }
  }
`;
