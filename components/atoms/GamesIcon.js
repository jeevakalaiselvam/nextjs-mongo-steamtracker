import React from "react";
import styled from "styled-components";
import { ICON_GAMES, getIcon } from "../../helper/iconHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function GamesIcon() {
  return <Container>{getIcon(ICON_GAMES)}</Container>;
}
