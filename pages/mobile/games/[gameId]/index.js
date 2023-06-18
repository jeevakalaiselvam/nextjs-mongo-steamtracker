import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { BACKGROUND_IMAGE } from "../../../../helper/urlHelper";
import { getTrophyCount } from "../../../../helper/gameHelper";
import { useRouter } from "next/router";
import MobileAchievementDisplay from "../../../../components/mobile/MobileAchievementDisplay";
import { getLoader } from "../../../../helper/constantHelper";
import TrophiesMobileGame from "../../../../components/molecules/TrophiesMobileGame";

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

const NoAchievements = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Game() {
  const router = useRouter();
  const [optionOpen, setOptionOpen] = useState(false);
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(false);

  const trophies = getTrophyCount(game?.achievements ?? []);

  useEffect(() => {
    if (router.query.gameId) {
      setLoading(true);
      axios
        .get(`/api/${router.query.gameId}/achievements`)
        .then((response) => {
          setGame(response.data.game ?? {});
          setLoading(false);
        })
        .catch((error) => {
          setGame([]);
        });
    }
  }, [router.query.gameId]);

  const optionToggle = (toggle) => {
    setOptionOpen(toggle);
  };

  return (
    <Container image={BACKGROUND_IMAGE}>
      <Overlay>
        {loading && <LoadingContainer>{getLoader()}</LoadingContainer>}
        {!loading && (
          <GamesContainer>
            <Header>
              <TrophiesMobileGame
                trophies={trophies}
                optionToggle={optionToggle}
                optionOpen={optionOpen}
              />
            </Header>
            <Content>
              {game?.achievements?.length == 0 && (
                <NoAchievements></NoAchievements>
              )}
              {game?.achievements?.length != 0 &&
                game?.achievements
                  ?.sort((ach1, ach2) => ach2.percentage - ach1.percentage)
                  ?.map((achievement) => {
                    return (
                      <MobileAchievementDisplay
                        achievement={achievement}
                        game={game}
                        key={achievement.id}
                      />
                    );
                  })}
            </Content>
          </GamesContainer>
        )}
        {<OptionContainer open={optionOpen}>OPTIONS</OptionContainer>}
      </Overlay>
    </Container>
  );
}
