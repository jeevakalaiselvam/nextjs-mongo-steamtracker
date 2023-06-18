import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ICON_TROPHY, getIcon } from "../../helper/iconHelper";
import { getColor } from "../../helper/colorHelper";

export default function MobileAchievementDisplay({ game, achievement }) {
  const {
    image,
    id,
    name,
    description,
    gameId,
    type,
    percentage,
    categories,
    achieved,
  } = achievement;
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Container achieved={achieved}>
      <IconContainer>
        <Icon image={image} />
      </IconContainer>
      <DetailContainer>
        <Title
          onClick={() => {
            if (window !== "undefined") {
              const searchQuery = `${name} achievement ${game?.name} `;
              window.open(`https://www.google.com/search?q=${searchQuery}`);
              // window.open(`https://www.youtube.com/results?search_query=${searchQuery}`);
            }
          }}
        >
          {name}
        </Title>
        <Description>{description}</Description>
        <Categories>
          {categories.map((category) => {
            return <Category key={category}>{category}</Category>;
          })}
        </Categories>
      </DetailContainer>
      <Trophy color={getColor(type)}>{getIcon(ICON_TROPHY)}</Trophy>
    </Container>
  );
}

const Categories = styled.div`
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  padding: 0.25rem 0.5rem;
  font-size: 1.1rem;
  color: #888888;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  opacity: ${(props) => (props.achieved ? "0.25" : "1")};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 45px;
  height: 45px;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 20px;
  width: 100%;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  width: 100%;
  opacity: 0.5;
`;

const Trophy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  font-size: 2rem;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  background: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: contain;
`;

const DetailContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 0.25rem 1rem;
  flex: 1;
  justify-content: center;
`;
