import { Bell } from "react-feather";
import styled from "styled-components";
import React from "react";
const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  color: #fff;
  :hover {
    cursor: pointer;
  }
  span {
    position: absolute;
    top: -8px;
    right: -8px;
    background: red;
    border-radius: 4px;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export function Trigger({ count, onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <Bell />
      <span>{count}</span>
    </Wrapper>
  );
}