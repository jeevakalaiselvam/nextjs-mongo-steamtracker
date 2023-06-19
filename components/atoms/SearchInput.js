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
    background-color: rgba(0, 0, 0, 0.5);
    outline: none;
    width: 100%;
    height: ${(props) => props.height ?? "25px"};
    font-size: 1rem;
    padding: 0.5rem;
    text-align: center;
    border: none;
    cursor: text;
  }
`;

const Clear = styled.div`
  display: flex;
  height: ${(props) => props.height ?? "25px"};
  color: #fefefe33;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  padding-right: 0.5rem;
  justify-content: center;
  &:hover {
    color: #fefefe;
  }
`;

export default function SearchInput({ onSearchChange, height }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const time = setTimeout(() => {
      onSearchChange(search);
    }, 500);
    return () => {
      clearTimeout(time);
    };
  }, [search, onSearchChange]);

  return (
    <Container>
      <input
        height={height}
        placeholder="Search..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search?.length > 0 && (
        <Clear onClick={() => setSearch("")} height={height}>
          {getIcon(ICON_CROSS)}
        </Clear>
      )}
    </Container>
  );
}
