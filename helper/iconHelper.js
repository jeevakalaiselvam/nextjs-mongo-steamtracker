import {
  HiXCircle,
  HiTrash,
  HiCheck,
  HiX,
  HiPencilAlt,
  HiCollection,
  HiPlusCircle,
  HiStop,
} from "react-icons/hi";
import { HiTrophy } from "react-icons/hi2";
import { FaSteam, FaPlaystation, FaXbox } from "react-icons/fa";
import { SiOrigin, SiUbisoft, SiEpicgames, SiActivision } from "react-icons/si";
import {
  BLIZZARD,
  EPIC,
  GOG,
  ORIGIN,
  PLAYSTATION,
  STEAM,
  UPLAY,
  XBOX,
} from "./constantHelper";
import { COLOR_PLAYSTATION, COLOR_XBOX } from "./colorHelper";

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

export const getIcon = (key) => {
  switch (key) {
    case ICON_CLOSE:
      return <HiXCircle />;
    case ICON_TROPHY:
      return <HiTrophy />;
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
