import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { BACKGROUND_IMAGE } from "../../../helper/urlHelper";
import { calculateAllTrophyCountForGames } from "../../../helper/gameHelper";
import MobileGameDisplay from "../../../components/mobile/MobileGameDisplay";
import { getLoader } from "../../../helper/constantHelper";
import TrophiesMobileGames from "../../../components/molecules/TrophiesMobileGames";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  color: #fefefe;
  min-height: 100vh;
  background: ${(props) => `url(${props.image})`};
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  backdrop-filter: blur(20px);
  background-color: rgba(0, 0, 0, 0.5);
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
`;

const GamesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 100vw;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 9vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 91vh;
  max-height: 91vh;
  padding: 0.5rem;
  justify-content: flex-start;
  overflow: scroll;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${(props) => (props.open ? "8vh" : "-8vh")};
  right: 0;
  width: 80%;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
`;

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/games").then((response) => {
      setGames(response.data.games);
      setLoading(false);
    });
  }, []);

  const optionToggle = (toggle) => {
    setOptionOpen(toggle);
  };

  const trophies = calculateAllTrophyCountForGames(games);

  return (
    <Container image={BACKGROUND_IMAGE}>
      <Overlay>
        {loading && <LoadingContainer>{getLoader()}</LoadingContainer>}
        {!loading && (
          <GamesContainer>
            <Header>
              <TrophiesMobileGames
                trophies={trophies}
                optionToggle={optionToggle}
                optionOpen={optionOpen}
              />
            </Header>
            <Content>
              {games.map((game) => {
                return <MobileGameDisplay game={game} key={game._id} />;
              })}
            </Content>
          </GamesContainer>
        )}
        {<OptionContainer open={optionOpen}>OPTIONS</OptionContainer>}
      </Overlay>
    </Container>
  );
}
