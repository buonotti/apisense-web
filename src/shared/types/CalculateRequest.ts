import type {LocationCoordinates} from "./LocationCoordinates";
import type {Fov} from "./Fov";

export class CalculateRequest {
    startTime: string = "2023-03-09T01:00:00Z";
    location: LocationCoordinates = {
        latitude: 47,
        longitude: 12
    };
    fov: Fov = {
        width: 0,
        height: 0,
        positionAngle: 0
    };
    minimumHeight: number = 30;
    maxSemiMajorAxis: number = 10;
    maxSemiMinorAxis: number = 10;
    hemisphere: "W" | "E" = "W";
    gridSize: number = 0.5;
    searchRadius: number = 20;
    maxSearchTime: number = 4 * 60 * 60;
    
    startPointCount: number = 10;

    includeViewports: boolean = false;

    ugc2ExposureTime: number = 60
}