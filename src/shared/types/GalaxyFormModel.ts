export interface GalaxyFormModel {
    longitude: {
        degrees: number, minutes: number, seconds: number,
    },
    latitude: {
        degrees: number, minutes: number, seconds: number,
    },
    minimumHeight: number,
    startTime: number,
    hemisphere: "W" | "E",
    fovHeight: number,
    fovWidth: number,
    fovAzimuthPosition: number,
    fovElevationPosition: number,
    ugc2ExposureTime: number,
    includeViewports: boolean,
    gridSize: number,
    searchRadius: number,
    maxSearchTime: number,
    startPointCount: number,
}