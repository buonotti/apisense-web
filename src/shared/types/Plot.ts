import type {GalaxyResponse} from "./GalaxyResponse";
import type {Data, PlotData} from "plotly.js-basic-dist-min";
import type {Galaxy} from "./Galaxy";

function groupByQuality(data: Galaxy[]): Partial<PlotData>[] {
    const less10 = data.filter(g => g.quality < 10);
    const between = data.filter(g => g.quality >= 10 && g.quality <= 30);
    const more30 = data.filter(g => g.quality > 30);
    return [
        {
            x: less10.map(g => g.azimuthalCoordinates.azimuth),
            y: less10.map(g => g.azimuthalCoordinates.elevation),
            text: less10.map(galaxy => `UGC${galaxy.id} (${galaxy.preferredName})`),
            name: "Quality < 10",
            hoverinfo: "x+y+text",
            mode: "lines+markers",
            type: "scatter",
            marker: {size: 5}
        },
        {
            x: between.map(g => g.azimuthalCoordinates.azimuth),
            y: between.map(g => g.azimuthalCoordinates.elevation),
            text: between.map(galaxy => `UGC${galaxy.id} (${galaxy.preferredName})`),
            name: "Quality between 10 and 30",
            hoverinfo: "x+y+text",
            mode: "lines+markers",
            type: "scatter",
            marker: {size: 5}
        },
        {
            x: more30.map(g => g.azimuthalCoordinates.azimuth),
            y: more30.map(g => g.azimuthalCoordinates.elevation),
            text: more30.map(galaxy => `UGC${galaxy.id} (${galaxy.preferredName})`),
            name: "Quality > 30",
            hoverinfo: "x+y+text",
            mode: "lines+markers",
            type: "scatter",
            marker: {size: 5}
        }
    ]
}

export function groupGalaxies(data: Galaxy[], strategy: "type" | "quality"): Partial<PlotData>[] {
    if (strategy === "type") {
        return groupByType(data);
    } else {
        return groupByQuality(data);
    }
}

function groupByType(data: Galaxy[]): Partial<PlotData>[] {
    const result: Partial<PlotData>[] = [];
    const types = new Set(data.map(g => g.morphology));
    types.forEach(type => {
        const galaxies = data.filter(g => g.morphology === type);
        result.push({
            x: galaxies.map(g => g.azimuthalCoordinates.azimuth),
            y: galaxies.map(g => g.azimuthalCoordinates.elevation),
            text: galaxies.map(galaxy => `UGC${galaxy.id} (${galaxy.preferredName})`),
            name: type,
            hoverinfo: "x+y+text",
            mode: "lines+markers",
            type: "scatter",
            marker: {size: 5}
        })
    })
    return result;
}