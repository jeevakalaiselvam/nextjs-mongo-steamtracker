import { HiXCircle, HiTrash, HiPencilAlt } from "react-icons/hi";
import { HiTrophy } from "react-icons/hi2";

export const ICON_CLOSE = "ICON_CLOSE";
export const ICON_TROPHY = "ICON_TROPHY";
export const ICON_DELETE = "ICON_DELETE";
export const ICON_EDIT = "ICON_EDIT";

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
    default:
  }
};
