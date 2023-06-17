import {
  HiXCircle,
  HiTrash,
  HiPencilAlt,
  HiShieldExclamation,
  HiStop,
} from "react-icons/hi";
import { HiTrophy } from "react-icons/hi2";
import { FaSteam, FaPlaystation, FaXbox } from "react-icons/fa";
import { SiOrigin, SiUbisoft, SiEpicgames, SiActivision } from "react-icons/si";

export const ICON_CLOSE = "ICON_CLOSE";
export const ICON_TROPHY = "ICON_TROPHY";
export const ICON_DELETE = "ICON_DELETE";
export const ICON_EDIT = "ICON_EDIT";
export const ICON_STEAM = "ICON_STEAM";
export const ICON_UPLAY = "ICON_UPLAY";
export const ICON_GOG = "ICON_GOG";
export const ICON_BLIZZARD = "ICON_BLIZZARD";
export const ICON_PLAYSTATION = "ICON_PLAYSTATION";
export const ICON_XBOX = "ICON_XBOX";
export const ICON_EPIC = "ICON_EPIC";
export const ICON_ORIGIN = "ICON_ORIGIN";

export const getIcon = (key) => {
  switch (key) {
    case ICON_CLOSE:
      return <HiXCircle />;
    case ICON_TROPHY:
      return <HiTrophy />;
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
    default:
  }
};
