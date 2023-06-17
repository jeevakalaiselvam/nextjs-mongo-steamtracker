import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  actionForceRefreshAchievement,
  actionShowCreateNewAchievement,
} from "../../store/actions/steam.actions";
import {
  COLOR_BUTTON_PRIMARY,
  COLOR_COPPER,
  COLOR_GOLD,
  COLOR_GREY,
  COLOR_PLATINUM,
  COLOR_SILVER,
  COPPER,
  GOLD,
  PLATINUM,
} from "../../helper/colorHelper";
import {
  CATEGORY_STORY,
  COLLECTIBLE,
  EASY,
  GRIND,
  HARD,
  MISSABLE,
  ONLINE,
  REPLAY,
  SILVER,
  STORY,
} from "../../helper/constantHelper";
import { ICON_TROPHY, getIcon } from "../../helper/iconHelper";

export default function CreateNewAchievement({
  achievementToEdit,
  isEditMode,
  setEditModeActive,
}) {
  const [name, setName] = useState(achievementToEdit?.name ?? "");
  const [image, setImage] = useState(achievementToEdit?.image ?? "");
  const [description, setDescription] = useState(
    achievementToEdit?.description ?? ""
  );
  const [percentage, setPercentage] = useState(
    achievementToEdit?.percentage ?? ""
  );
  const [categories, setCategories] = useState(
    achievementToEdit?.categories ?? []
  );
  const [type, setType] = useState(achievementToEdit?.type ?? "");

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const updateAchievement = () => {
    dispatch(actionForceRefreshAchievement(false));
    setLoading(true);
    axios
      .post(
        `/api/updateAchievement?gameId=${achievementToEdit?.gameId}&achievementId=${achievementToEdit?.id}`,
        {
          game: {
            name,
            image,
            description,
            id: achievementToEdit?.achievementToEdit,
            type,
            percentage,
            categories,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setEditModeActive(false);
        dispatch(actionForceRefreshAchievement(true));
        router.push(`/games/${achievementToEdit?.gameId}`);
      });
  };

  const saveAchievement = () => {
    dispatch(actionForceRefreshAchievement(false));
    setLoading(true);
    axios
      .post("/api/createAchievement", {
        achievement: {
          name: name.trim(),
          type,
          image,
          description,
          id: router.query.gameId,
          percentage,
          categories,
        },
      })
      .then((response) => {
        setLoading(false);
        dispatch(actionShowCreateNewAchievement(false));
        dispatch(actionForceRefreshAchievement(true));
      });
  };

  const addOrRemoveCategory = (category) => {
    if (categories?.includes(category)) {
      let newCategories = categories.filter((c) => c != category);
      setCategories(newCategories);
    } else {
      let newCategories = [...categories, category];
      setCategories(newCategories);
    }
  };

  return (
    <Container image={image}>
      <Header>{isEditMode ? "Edit Achievement" : "Add Achievement"}</Header>
      <MainContainer>
        <Input>
          <Label>Name:</Label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Input>
        <Input>
          <Label>Description:</Label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Input>
        <Input>
          <Label>Image:</Label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Input>
        <Input>
          <Label>Percentage:</Label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
        </Input>
        <Input>
          <Label>Type:</Label>
          <TrophySelection>
            <Trophy
              selected={type == PLATINUM}
              onClick={() => setType(PLATINUM)}
            >
              <Icon color={type == PLATINUM ? COLOR_PLATINUM : COLOR_GREY}>
                {getIcon(ICON_TROPHY)}
              </Icon>
            </Trophy>
            <Trophy selected={type == GOLD} onClick={() => setType(GOLD)}>
              <Icon color={type == GOLD ? COLOR_GOLD : COLOR_GREY}>
                {getIcon(ICON_TROPHY)}
              </Icon>
            </Trophy>
            <Trophy selected={type == SILVER} onClick={() => setType(SILVER)}>
              <Icon color={type == SILVER ? COLOR_SILVER : COLOR_GREY}>
                {getIcon(ICON_TROPHY)}
              </Icon>
            </Trophy>
            <Trophy selected={type == COPPER} onClick={() => setType(COPPER)}>
              <Icon color={type == COPPER ? COLOR_COPPER : COLOR_GREY}>
                {getIcon(ICON_TROPHY)}
              </Icon>
            </Trophy>
          </TrophySelection>
        </Input>
        <Input>
          <Label>Category:</Label>
          <CategorySelection>
            <Category
              selected={categories.includes(STORY)}
              onClick={() => addOrRemoveCategory(STORY)}
            >
              {STORY}
            </Category>
            <Category
              selected={categories.includes(EASY)}
              onClick={() => addOrRemoveCategory(EASY)}
            >
              {EASY}
            </Category>
            <Category
              selected={categories.includes(MISSABLE)}
              onClick={() => addOrRemoveCategory(MISSABLE)}
            >
              {MISSABLE}
            </Category>
            <Category
              selected={categories.includes(COLLECTIBLE)}
              onClick={() => addOrRemoveCategory(COLLECTIBLE)}
            >
              {COLLECTIBLE}
            </Category>
            <Category
              selected={categories.includes(GRIND)}
              onClick={() => addOrRemoveCategory(GRIND)}
            >
              {GRIND}
            </Category>
            <Category
              selected={categories.includes(HARD)}
              onClick={() => addOrRemoveCategory(HARD)}
            >
              {HARD}
            </Category>
            <Category
              selected={categories.includes(REPLAY)}
              onClick={() => addOrRemoveCategory(REPLAY)}
            >
              {REPLAY}
            </Category>
            <Category
              selected={categories.includes(ONLINE)}
              onClick={() => addOrRemoveCategory(ONLINE)}
            >
              {ONLINE}
            </Category>
          </CategorySelection>
        </Input>
      </MainContainer>
      <SaveContainer>
        <Button
          margin={"0 1rem 0 0"}
          width={"auto"}
          title={"SAVE"}
          onClick={() => {
            if (isEditMode) {
              updateAchievement();
            } else {
              saveAchievement();
            }
          }}
        />
        <Button
          width={"auto"}
          title={"CLOSE"}
          onClick={() => {
            if (isEditMode) {
              setEditModeActive(false);
            } else {
              dispatch(actionShowCreateNewAchievement(false));
            }
          }}
        />
      </SaveContainer>
    </Container>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  margin-left: 1.8rem;
  padding: 1rem;
`;

const CategorySelection = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  padding: 0.25rem 1rem;
  background-color: ${(props) =>
    props.selected ? COLOR_BUTTON_PRIMARY : `rgba(0,0,0,0.5)`};
  justify-content: flex-start;
`;

const TrophySelection = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
`;

const Trophy = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  padding: 0.25rem 1rem;
  justify-content: flex-start;
`;

const Icon = styled.div`
  font-size: 2rem;
  color: ${(props) => props.color};
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0.5rem 1rem;
  width: 100%;
`;

const SaveContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(20px);
  background-color: rgba(0, 0, 0, 0.75);
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.2rem;
  width: 80px;
  justify-content: flex-start;
  color: ${(props) => COLOR_BUTTON_PRIMARY};
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 0.25rem 1rem;
  width: 100%;

  & > input {
    flex: 1;
    width: 100%;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.5);
    outline: none;
    border: none;
    cursor: text;
  }
`;
