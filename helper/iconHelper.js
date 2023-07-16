import {
  HiXCircle,
  HiTrash,
  HiCheck,
  HiX,
  HiPencilAlt,
  HiCollection,
  HiPlusCircle,
  HiStop,
  HiMenu,
  HiRewind,
  HiOutlineArrowSmLeft,
  HiDotsVertical,
  HiViewBoards,
  HiEye,
  HiEyeOff,
  HiCheckCircle,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { IoSettingsSharp, IoNotifications } from "react-icons/io5";
import { HiTrophy } from "react-icons/hi2";
import { FaSteam, FaPlaystation, FaXbox, FaTrophy } from "react-icons/fa";
import { SiOrigin, SiUbisoft, SiEpicgames, SiActivision } from "react-icons/si";
import {
  BLIZZARD,
  COPPER,
  EPIC,
  GOG,
  GOLD,
  ORIGIN,
  PLATINUM,
  PLAYSTATION,
  SILVER,
  STEAM,
  UPLAY,
  XBOX,
} from "./constantHelper";
import { COLOR_PLAYSTATION, COLOR_XBOX } from "./colorHelper";
import ImageIcon from "../components/atoms/ImageIcon";

export const ICON_CLOSE = "ICON_CLOSE";
export const ICON_TROPHY = "ICON_TROPHY";
export const ICON_DELETE = "ICON_DELETE";
export const ICON_EDIT = "ICON_EDIT";
export const ICON_CHECK = "ICON_CHECK";
export const ICON_CROSS = "ICON_CROSS";
export const ICON_STEAM = "ICON_STEAM";
export const ICON_UPLAY = "ICON_UPLAY";
export const ICON_GOG = "ICON_GOG";
export const ICON_BLIZZARD = "ICON_BLIZZARD";
export const ICON_PLAYSTATION = "ICON_PLAYSTATION";
export const ICON_XBOX = "ICON_XBOX";
export const ICON_EPIC = "ICON_EPIC";
export const ICON_ORIGIN = "ICON_ORIGIN";
export const ICON_GAMES = "ICON_GAMES";
export const ICON_ADD = "ICON_ADD";
export const ICON_MENU = "ICON_MENU";
export const ICON_BACK = "ICON_BACK";
export const ICON_OPTIONS = "ICON_OPTIONS";
export const ICON_THEME = "ICON_THEME";
export const ICON_HIDDEN_VISIBLE = "ICON_HIDDEN_VISIBLE";
export const ICON_HIDDEN_INVISIBLE = "ICON_HIDDEN_INVISIBLE";
export const ICON_COMPLETED = "ICON_COMPLETED";
export const ICON_CATEGORY = "ICON_CATEGORY";
export const ICON_RIGHT = "ICON_RIGHT";
export const ICON_NOTIFICATION = "ICON_NOTIFICATION";
export const ICON_COG = "ICON_COG";

export const IMAGE_PLATINUM = "IMAGE_PLATINUM";
export const IMAGE_GOLD = "IMAGE_GOLD";
export const IMAGE_SILVER = "IMAGE_SILVER";
export const IMAGE_BRONZE = "IMAGE_BRONZE";

export const getTrophyImage = (type, size) => {
  const TROPHY_ICON_SIZE = "60px";
  switch (type) {
    case PLATINUM:
      return <ImageIcon src="platinum.png" size={size ?? TROPHY_ICON_SIZE} />;
    case GOLD:
      return <ImageIcon src="gold.png" size={size ?? TROPHY_ICON_SIZE} />;
    case SILVER:
      return <ImageIcon src="silver.png" size={size ?? TROPHY_ICON_SIZE} />;
    case COPPER:
      return <ImageIcon src="bronze.png" size={size ?? TROPHY_ICON_SIZE} />;
    default:
      return <HiXCircle />;
  }
};

export const getImage = (key, size) => {
  const TROPHY_ICON_SIZE = size ?? "60px";
  switch (key) {
    case IMAGE_PLATINUM:
      return <ImageIcon src="platinum.png" size={TROPHY_ICON_SIZE} />;
    case IMAGE_GOLD:
      return <ImageIcon src="gold.png" size={TROPHY_ICON_SIZE} />;
    case IMAGE_SILVER:
      return <ImageIcon src="silver.png" size={TROPHY_ICON_SIZE} />;
    case IMAGE_BRONZE:
      return <ImageIcon src="bronze.png" size={TROPHY_ICON_SIZE} />;
    default:
      return <HiXCircle />;
  }
};

export const getIcon = (key) => {
  switch (key) {
    case ICON_CLOSE:
      return <HiXCircle />;
    case ICON_COG:
      return <IoSettingsSharp />;
    case ICON_NOTIFICATION:
      return <IoNotifications />;
    case ICON_TROPHY:
      return <FaTrophy />;
    case ICON_CHECK:
      return <HiCheck />;
    case ICON_CROSS:
      return <HiX />;
    case ICON_DELETE:
      return <HiTrash />;
    case ICON_EDIT:
      return <HiPencilAlt />;
    case ICON_STEAM:
      return <FaSteam />;
    case ICON_UPLAY:
      return <SiUbisoft />;
    case ICON_GOG:
      return <HiStop />;
    case ICON_EPIC:
      return <SiEpicgames />;
    case ICON_BLIZZARD:
      return <SiActivision />;
    case ICON_PLAYSTATION:
      return <FaPlaystation />;
    case ICON_XBOX:
      return <FaXbox />;
    case ICON_ORIGIN:
      return <SiOrigin />;
    case ICON_GAMES:
      return <HiCollection />;
    case ICON_ADD:
      return <HiPlusCircle />;
    case ICON_MENU:
      return <HiMenu />;
    case ICON_BACK:
      return <HiOutlineArrowSmLeft />;
    case ICON_OPTIONS:
      return <HiDotsVertical />;
    case ICON_THEME:
      return <HiViewBoards />;
    case ICON_HIDDEN_VISIBLE:
      return <HiEye />;
    case ICON_HIDDEN_INVISIBLE:
      return <HiEyeOff />;
    case ICON_COMPLETED:
      return <HiCheckCircle />;
    case ICON_CATEGORY:
      return <HiCollection />;
    case ICON_RIGHT:
      return <HiOutlineChevronRight />;
    default:
  }
};

export const getIconForPlatform = (platform) => {
  switch (platform) {
    case PLAYSTATION:
      return ICON_PLAYSTATION;
    case XBOX:
      return ICON_XBOX;
    case GOG:
      return ICON_GOG;
    case EPIC:
      return ICON_EPIC;
    case STEAM:
      return ICON_STEAM;
    case UPLAY:
      return ICON_UPLAY;
    case BLIZZARD:
      return ICON_BLIZZARD;
    case ORIGIN:
      return ICON_ORIGIN;
    default:
  }
};
