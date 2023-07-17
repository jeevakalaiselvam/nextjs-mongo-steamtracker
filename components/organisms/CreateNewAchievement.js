import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  actionForceRefreshAchievement,
  actionKeepAddingAchievements,
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
  SIDEQUEST,
  SILVER,
  STORY,
} from "../../helper/constantHelper";
import {
  ICON_TROPHY,
  IMAGE_BRONZE,
  IMAGE_GOLD,
  IMAGE_PLATINUM,
  IMAGE_SILVER,
  getIcon,
  getImage,
} from "../../helper/iconHelper";
import { useEffect } from "react";

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
    achievementToEdit?.categories ?? [STORY]
  );
  const [type, setType] = useState(achievementToEdit?.type ?? COPPER);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) {
      setName(achievementToEdit?.name ?? "");
      setImage(achievementToEdit?.image ?? "");
      setDescription(achievementToEdit?.description ?? "");
      setPercentage(achievementToEdit?.percentage ?? "");
      setCategories(achievementToEdit?.categories ?? [STORY]);
      setType(achievementToEdit?.type ?? COPPER);
    }
  }, [loading]);

  const updateAchievement = () => {
    dispatch(actionForceRefreshAchievement(false));
    setLoading(true);
    axios
      .post(
        `/api/updateAchievement?gameId=${achievementToEdit?.gameId}&achievementId=${achievementToEdit?.id}`,
        {
          game: {
            name,
            image: image == "" ? (type == PLATINUM ? "" : "") : image,
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
          image: image == "" ? (type == PLATINUM ? "" : "") : image,
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
        dispatch(actionKeepAddingAchievements(true));
        dispatch(actionShowCreateNewAchievement(true));
      });
  };

  const addOrRemoveCategory = (category) => {
    if (categories?.includes(category)) {
      let newCategories = [];
      setCategories(newCategories);
    } else {
      let newCategories = [category];
      setCategories(newCategories);
    }
  };

  return (
    <Container image={image}>
      <Header>
        {isEditMode ? "Edit Achievement" : "Add Achievement"}
        <SaveNearTitle>
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
        </SaveNearTitle>
        <CloseNearTitle>
          <Button
            width={"auto"}
            title={"CLOSE"}
            onClick={() => {
              if (isEditMode) {
                setEditModeActive(false);
              } else {
                dispatch(actionShowCreateNewAchievement(false));
                dispatch(actionKeepAddingAchievements(false));
              }
            }}
          />
        </CloseNearTitle>
      </Header>
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
                {getImage(IMAGE_PLATINUM, "35px")}
              </Icon>
            </Trophy>
            <Trophy selected={type == GOLD} onClick={() => setType(GOLD)}>
              <Icon color={type == GOLD ? COLOR_GOLD : COLOR_GREY}>
                {getImage(IMAGE_GOLD, "33px")}
              </Icon>
            </Trophy>
            <Trophy selected={type == SILVER} onClick={() => setType(SILVER)}>
              <Icon color={type == SILVER ? COLOR_SILVER : COLOR_GREY}>
                {getImage(IMAGE_SILVER, "35px")}
              </Icon>
            </Trophy>
            <Trophy selected={type == COPPER} onClick={() => setType(COPPER)}>
              <Icon color={type == COPPER ? COLOR_COPPER : COLOR_GREY}>
                {getImage(IMAGE_BRONZE, "35px")}
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
              selected={categories.includes(SIDEQUEST)}
              onClick={() => addOrRemoveCategory(SIDEQUEST)}
            >
              {SIDEQUEST}
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
      {true && (
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
                dispatch(actionKeepAddingAchievements(false));
              }
            }}
          />
        </SaveContainer>
      )}
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
  position: relative;
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
  opacity: ${(props) => (props.selected ? "1" : "0.1")};
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
  position: relative;
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
  font-size: 1.3rem;
  background-color: #121315;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.25rem;
  width: 80px;
  justify-content: flex-start;
  opacity: 0.5;
`;

const SaveNearTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 1rem;
  left: 12rem;
`;

const CloseNearTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 2rem;
  top: 1rem;
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
    background-color: #222222;
    outline: none;
    border: none;
    font-size: 1.25rem;
    cursor: text;
  }
`;
