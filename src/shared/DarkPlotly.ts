import {PlotlyHTMLElement} from "plotly.js-basic-dist-min";
import {Ref} from "vue";

let backgroundColor = {
    r: 24,
    g: 24,
    b: 28,
    a: 1,
};

let foregroundColor = {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
};

function setBackgroundColor(rgba: { r: number, g: number, b: number, a: number }) {
    backgroundColor = rgba;
}

function setForegroundColor(rgba: { r: number, g: number, b: number, a: number }) {
    foregroundColor = rgba;
}

function rgba(rgba: { r: number, g: number, b: number, a: number }) {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

function darkenBackground(el: HTMLElement) {
    const elStyle = el.style;
    elStyle.background = rgba(backgroundColor);
}

function darkenAxisLines(mainCanvas: HTMLElement) {
    const mainCanvasChildren = childrenOf(mainCanvas);
    const cartesianLayer = mainCanvasChildren.filter(el => el.classList.contains("cartesianlayer"))[0];
    if (!cartesianLayer) {
        return;
    }
    const axisLayers = Array.from(cartesianLayer.children[0].children)
                            .filter(el => el.classList.toString()
                                            .endsWith("axislayer-above"));
    axisLayers.forEach(axisLayer => {
        const axisLayerChildren = childrenOf(axisLayer);
        const axisLines = axisLayerChildren.filter(el => el.classList.contains("xtick") || el.classList.contains("ytick"));

        axisLines.forEach(line => {
            const lineText = childrenOf(line)[0];
            if (lineText) {
                const lineTextStyle = elem(lineText).style;
                lineTextStyle.fill = rgba(foregroundColor);
            }
        });
    });
}

function darkenInfoLayer(infoMainCanvas: HTMLElement) {
    const infoLayer = childrenOf(infoMainCanvas)
        .filter(el => el.classList.contains("infolayer"))[0];
    if (!infoLayer) {
        return;
    }
    const infoLayerChildren = childrenOf(infoLayer);

    const legend = infoLayerChildren.filter(el => el.classList.contains("legend"))[0];
    if (!legend) {
        return;
    }

    const legendChildren = childrenOf(legend);

    const bg = legendChildren.filter(el => el.classList.contains("bg"))[0];

    if (!bg) {
        return;
    }

    const bgStyle = elem(bg).style;
    bgStyle.fill = rgba(backgroundColor);

    const traces = childrenOf(legendChildren.filter(el => el.classList.contains("scrollbox"))[0].children[0]);
    traces.forEach(el => {
        const textEl = childrenOf(el)[0];
        const textElStyle = elem(textEl).style;
        textElStyle.fill = rgba(foregroundColor);
    });

    const title = childrenOf(infoLayer)
        .filter(el => el.classList.contains("g-gtitle"))[0];

    if (!title) {
        return;
    }
    const titleText = childrenOf(title)[0];

    const titleTextStyle = elem(titleText).style;
    titleTextStyle.fill = rgba(foregroundColor);
}

function darkenPlotly(root: Ref<PlotlyHTMLElement | null>) {
    const plotly = root.value;
    if (!plotly) {
        return;
    }

    const mainSvgList = Array.from(plotly.querySelectorAll(".main-svg"))
                             .map(svg => svg as unknown as HTMLElement);

    const mainCanvas = mainSvgList.filter(el => el.style.background !== "")[0];
    if (!mainCanvas) {
        return;
    }

    const mainCanvasHtml = elem(mainCanvas);

    darkenBackground(mainCanvasHtml);

    darkenAxisLines(mainCanvasHtml);

    const infoMainCanvas = mainSvgList.filter(el => childrenOf(el)
        .map(c => c.classList.toString() === "infolayer")
        .includes(true));

    const infoMainCanvasHtml = elem(infoMainCanvas[0]);

    darkenInfoLayer(infoMainCanvasHtml);
}

function childrenOf(el: Element) {
    return Array.from(el.children);
}

function elem(el: any) {
    return el as unknown as HTMLElement;
}

export function useDarkPlotly() {
    return {
        darkenPlotly,
        setBackgroundColor,
        setForegroundColor,
    };
}