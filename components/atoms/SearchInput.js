import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ICON_CLOSE, ICON_CROSS, getIcon } from "../../helper/iconHelper";
import { COLOR_BUTTON_PRIMARY, COLOR_DANGER } from "../../helper/colorHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;

  & > input {
    background-color: ${(props) => props.background ?? "#121315"};
    outline: none;
    width: 100%;
    height: ${(props) => props.height ?? "25px"};
    padding: ${(props) => props.padding ?? "0.5rem"};
    font-size: ${(props) => props.fontSize ?? "1rem"};
    text-align: center;
    border: none;
    cursor: text;
  }
`;

const Clear = styled.div`
  display: flex;
  height: ${(props) => props.height ?? "25px"};
  color: #fefefe33;
  background-color: ${(props) => props.background ?? "#121315"};
  align-items: center;
  padding-right: 0.5rem;
  justify-content: center;
  &:hover {
    color: #fefefe;
  }
`;

export default function SearchInput({
  onSearchChange,
  height,
  padding,
  background,
  fontSize,
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const time = setTimeout(() => {
      onSearchChange(search);
    }, 500);
    return () => {
      clearTimeout(time);
    };
  }, [search]);

  return (
    <Container
      padding={padding}
      height={height}
      background={background}
      fontSize={fontSize}
    >
      <input
        placeholder="Search..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search?.length > 0 && (
        <Clear
          onClick={() => setSearch("")}
          height={height}
          background={background}
        >
          {getIcon(ICON_CROSS)}
        </Clear>
      )}
    </Container>
  );
}
