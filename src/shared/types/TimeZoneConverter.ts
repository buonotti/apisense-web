import type {LocationCoordinates} from "./LocationCoordinates";
import {TimeZoneCache} from "./TimeZoneCache";

export async function toUtc(date: Date, location: LocationCoordinates): Promise<string> {
    const gmtOffset = await TimeZoneCache.getOffset(location, date);
    const preHours = date.getHours();
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const year = date.getFullYear()
                     .toString();
    const month = (date.getMonth() + 1).toString()
                                       .padStart(2, "0");
    const day = date.getDate()
                    .toString()
                    .padStart(2, "0");
    const hours = preHours.toString()
                          .padStart(2, "0");
    const minutes = date.getMinutes()
                        .toString()
                        .padStart(2, "0");
    const seconds = date.getSeconds()
                        .toString()
                        .padStart(2, "0");
    const offsetSign = gmtOffset > 0 ? "+" : "-";
    const offsetHours = Math.floor(gmtOffset / 3600)
                            .toString()
                            .padStart(2, "0");
    const offsetMinutes = (Math.floor(gmtOffset / 60) % 60).toString()
                                                           .padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}