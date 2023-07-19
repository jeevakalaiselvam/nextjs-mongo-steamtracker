import React from "react";
import CirclePercentage from "./CirclePercentage";
import styled from "styled-components";
import { getAllStatsForGame } from "../../helper/gameHelper";
import {
  IMAGE_BRONZE,
  IMAGE_GOLD,
  IMAGE_PLATINUM,
  IMAGE_SILVER,
  getImage,
} from "../../helper/iconHelper";

export default function ProfileCompletionOverview({
  platinum,
  gold,
  silver,
  bronze,
}) {
  return (
    <Overview>
      <TrophiesOverview>
        <Trophy>
          <Icon>{getImage(IMAGE_PLATINUM)}</Icon>
          <Count>{platinum}</Count>
        </Trophy>
        <Trophy>
          <Icon>{getImage(IMAGE_GOLD)}</Icon>
          <Count>{gold}</Count>
        </Trophy>
        <Trophy>
          <Icon>{getImage(IMAGE_SILVER)}</Icon>
          <Count>{silver}</Count>
        </Trophy>
        <Trophy>
          <Icon>{getImage(IMAGE_BRONZE)}</Icon>
          <Count>{bronze}</Count>
        </Trophy>
      </TrophiesOverview>
    </Overview>
  );
}

const Overview = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  margin-top: 1rem;
  border-radius: 8px;
  position: relative;
`;

const TrophiesOverview = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 1rem;
  align-items: center;
  justify-content: center;
`;

const Trophy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.5;
  justify-content: center;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
