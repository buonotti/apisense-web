<script async setup lang="ts">
import {Galaxy} from "../shared/types/Galaxy";
import * as Plotly from "plotly.js-basic-dist-min";
import {Layout, PlotData, PlotlyHTMLElement} from "plotly.js-basic-dist-min";
import {onMounted, ref} from "vue";
import {ChunkFetcher} from "../shared/ChunkFetcher";
import {useDark} from "@vueuse/core";
import {useDarkPlotly} from "../shared/DarkPlotly";
import {Viewport} from "../shared/types/Viewport";

const props = defineProps<{
  galaxyFetcher: ChunkFetcher<Galaxy> | undefined
  viewportFetcher: ChunkFetcher<Viewport> | undefined
  hemisphere: "E" | "W"
}>();

const isDark = useDark();
const {darkenPlotly} = useDarkPlotly();
const plotlyRoot = ref<PlotlyHTMLElement | null>(null);

const fetcher = props.galaxyFetcher;

if (fetcher) {
  fetcher.reset();

  let plot: PlotlyHTMLElement | null = null;

  const data = fetcher.all();

  onMounted(async () => {
    const plotData = groupByType(data);

    if (props.viewportFetcher) {
      props.viewportFetcher.all()
           .forEach(v => plotData.push(createFovTrace(v, "red")));
    }

    const layout: Partial<Layout> = {
      xaxis: {
        range: props.hemisphere == "E" ? [
          0,
          180,
        ] : [
          180,
          360,
        ],
      },
      yaxis: {
        range: [
          0,
          90,
        ],
      },
      title: "Galaxien",
    };

    plot = await Plotly.newPlot("plot", plotData, layout, {responsive: true});
    if (isDark.value) {
      darkenPlotly(plotlyRoot);
    }
  });
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
                  mode: "markers",
                  type: "scatter",
                  marker: {size: 5},
                });
  });
  return result;
}

function createFovTrace(viewport: Viewport, color: string): Partial<PlotData> {
  // console.log(viewport)
  return {
    y: [
      viewport.viewportEdges.bottomRight.elevation,
      viewport.viewportEdges.bottomLeft.elevation,
      viewport.viewportEdges.topLeft.elevation,
      viewport.viewportEdges.topRight.elevation,
      viewport.viewportEdges.bottomRight.elevation,
    ],
    x: [
      viewport.viewportEdges.bottomRight.azimuth,
      viewport.viewportEdges.bottomLeft.azimuth,
      viewport.viewportEdges.topLeft.azimuth,
      viewport.viewportEdges.topRight.azimuth,
      viewport.viewportEdges.bottomRight.azimuth,
    ],
    type: "scatter",
    mode: "lines",
    line: {
      color: color,
    },

    showlegend: false,

  };
}

</script>

<template>
  <div class="border p-3">
    <div class="" id="plot" ref="plotlyRoot"></div>
  </div>
</template>