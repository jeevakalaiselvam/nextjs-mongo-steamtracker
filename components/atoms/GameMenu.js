import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  actionShowAchievementDeleteSelection,
  actionShowCreateBulkAchievements,
  actionShowCreateNewAchievement,
  actionShowCreateNewAchievementCard,
  actionShowCreateNewGame,
} from "../../store/actions/steam.actions";
import Button from "./Button";
import { useRouter } from "next/router";

export default function GameMenu() {
  const dispatch = useDispatch();
  const router = useRouter();

  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const { toggle } = steam;
  const { createNewAchievementModal, createNewAchievementCard } = toggle;

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
      {console.log(router.pathname)}
      {router.pathname == "/games" && (
        <Link>
          <Button
            title="Add Game"
            onClick={() => {
              dispatch(actionShowCreateNewGame(true));
            }}
          />
        </Link>
      )}
      {router.pathname?.includes("/games/") && (
        <Link>
          <Button
            title="Add Achievement"
            onClick={() => {
              dispatch(actionShowCreateNewAchievement(true));
            }}
          />
        </Link>
      )}
      {/* <Link>
        <Button
          title="Bulk Achievements"
          onClick={() => {
            dispatch(actionShowCreateBulkAchievements(true));
          }}
        />
      </Link> */}
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
