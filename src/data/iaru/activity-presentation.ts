import type { Band } from "../../bandplan";
import type { ActivityMarker } from "../types";
import { iaruActivityMarkers } from "./index";
import { formatHzInUnit } from "./presentation";

export interface ActivityDisplayMarker extends ActivityMarker {
  pos: string;
}

export function getActivityDisplayMarkers(
  band: Band,
): ActivityDisplayMarker[] {
  return iaruActivityMarkers
    .filter((marker) => marker.bandId === band.route)
    .map((marker) => ({
      ...marker,
      pos: formatHzInUnit(marker.frequencyHz, band.units),
    }));
}
