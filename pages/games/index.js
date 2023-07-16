import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import GameDisplay from "../../components/atoms/GameDisplay";
import { HEADER_IMAGE } from "../../helper/urlHelper";
import Profile from "../../components/molecules/Profile";
import Trophies from "../../components/molecules/Trophies";
import GameMenu from "../../components/atoms/GamesMenu";
import { useDispatch, useSelector } from "react-redux";
import CreateNewGame from "../../components/organisms/CreateNewGame";
import {
  actionForceRefreshGames,
  actionShowCreateNewGame,
} from "../../store/actions/steam.actions";
import Button from "../../components/atoms/Button";
import { ALL, getLoader } from "../../helper/constantHelper";
import GamesMenu from "../../components/atoms/GamesMenu";
import MobileGameDisplayPSUI from "../../components/mobile/MobileGameDisplayPSUI";
import GameDisplayPSUI from "../../components/atoms/GameDisplayPSUI";

export default function GamesPage() {
  const [gamesLoading, setGamesLoading] = useState(false);
  const [games, setGames] = useState([]);
  const steam = useSelector((state) => state.steam);
  const { settings } = steam;
  const { forceRefreshGames, themeId, gamesFilter, showHiddenGames } = settings;
  const dispatch = useDispatch();

  const { toggle } = steam;
  const { createNewGameModal } = toggle;

  function detectmob() {
    if (window.innerWidth <= 800 || window.innerHeight <= 600) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (detectmob()) {
      top.location.href = "/mobile/games";
    } else {
      dispatch(actionShowCreateNewGame(false));
      setGamesLoading(true);
      axios.get("/api/games").then((response) => {
        setGames(response.data.games);
        setGamesLoading(false);
      });
      dispatch(actionForceRefreshGames(false));
    }
  }, [forceRefreshGames, dispatch]);

  return (
    <Container image={HEADER_IMAGE(themeId ?? "130130")}>
      <Overlay>
        <SidebarContainer>
          <Profile games={games} />
          <Trophies games={games} title={"Trophies"} />
          <GamesMenu />
        </SidebarContainer>
        <MainContainer>
          {gamesLoading && getLoader()}
          {!createNewGameModal && !gamesLoading && games.length == 0 && (
            <NoGames>
              <Button
                title={"Add New Game"}
                onClick={() => {
                  dispatch(actionShowCreateNewGame(true));
                }}
              />
            </NoGames>
          )}
          <GamesList>
            {createNewGameModal && <CreateNewGame />}
            {!gamesLoading &&
              games.length != 0 &&
              games
                .filter((game) => {
                  if (
                    (game?.platform == gamesFilter || gamesFilter == ALL) &&
                    (showHiddenGames ? true : !game.hidden)
                  ) {
                    return true;
                  }
                })
                .map((game, index) => {
                  return <GameDisplayPSUI game={game} key={game._id} />;
                })}
          </GamesList>
        </MainContainer>
      </Overlay>
    </Container>
  );
}

const NoGames = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121315;
  background-repeat: no-repeat;
  background-size: cover;
  color: #fefefe;
  position: relative;
`;

const Overlay = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
`;

const SidebarContainer = styled.div`
  min-width: 200px;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  z-index: 101;
`;

const MainContainer = styled.div`
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
`;

const GamesList = styled.div`
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  flex-wrap: wrap;
  max-height: 98vh;
  overflow: scroll;
  align-items: flex-start;
  justify-content: center;
`;
