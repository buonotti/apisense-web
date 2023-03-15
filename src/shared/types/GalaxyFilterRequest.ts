import {Fov} from "./Fov";
import {LocationCoordinates} from "./LocationCoordinates";

export interface GalaxyFilterRequest {
    startTime: string;
    location: LocationCoordinates;
    fov: Fov;
    minimumHeight: number;
    maxSemiMajorAxis: number;
    maxSemiMinorAxis: number;
    hemisphere: "W" | "E";
    gridSize: number;
    searchRadius: number;
    maxSearchTime: number;

    startPointCount: number;

    includeViewports: boolean;

    ugc2ExposureTime: number;
}