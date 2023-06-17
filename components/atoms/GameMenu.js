import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  actionShowAchievementDeleteSelection,
  actionShowCreateNewAchievement,
  actionShowCreateNewGame,
} from "../../store/actions/steam.actions";
import Button from "./Button";
import { useRouter } from "next/router";

export default function GameMenu() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Container>
      <Link>
        <Button
          title="All Games"
          onClick={() => {
            router.push("/games");
          }}
        />
      </Link>
      <Link>
        <Button
          title="New Game"
          onClick={() => {
            dispatch(actionShowCreateNewGame(true));
          }}
        />
      </Link>
      <Link>
        <Button
          title="New Achievement"
          onClick={() => {
            dispatch(actionShowCreateNewAchievement(true));
          }}
        />
      </Link>
      <Link>
        <Button
          title="Delete Achievements"
          onClick={() => {
            dispatch(actionShowAchievementDeleteSelection(true));
          }}
        />
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Link = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;
