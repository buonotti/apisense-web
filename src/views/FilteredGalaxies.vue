<script async setup lang="ts">
import {NTabs, NTabPane, useMessage} from "naive-ui";
import GalaxyForm from "../components/GalaxyForm.vue";
import {useGalaxyRepo} from "../shared/GalaxyRepo";
import {GalaxyFilterRequest} from "../shared/types/GalaxyFilterRequest";
import {ref} from "vue";
import {ChunkFetcher} from "../shared/ChunkFetcher";
import {Galaxy} from "../shared/types/Galaxy";
import {AxiosError} from "axios";
import GalaxyList from "../components/GalaxyList.vue";
import GalaxyPlot from "../components/GalaxyPlot.vue";
import {Viewport} from "../shared/types/Viewport";

const {filterGalaxies} = useGalaxyRepo();
const message = useMessage();
const fetcher = ref<ChunkFetcher<Galaxy> | undefined>();
const viewportFetcher = ref<ChunkFetcher<Viewport> | undefined>();
const hemisphere = ref<"W" | "E">("W");
const selectedTab = ref("data");

async function handleDataSubmit(args: any) {
  const req: GalaxyFilterRequest = args as GalaxyFilterRequest;
  const resp = await filterGalaxies(req);
  if (resp instanceof AxiosError) {
    message.error("Failed to load galaxies: " + resp.message);
  } else {
    hemisphere.value = req.hemisphere;
    fetcher.value = ChunkFetcher.new(resp.galaxies);
    let msg = "Loaded " + resp.galaxies.length + " galaxies";
    if (req.includeViewports) {
      msg += " and " + resp.viewports.length + " viewports";
      viewportFetcher.value = ChunkFetcher.new(resp.viewports);
    } else {
      viewportFetcher.value = undefined;
    }
    message.info(msg);
    selectedTab.value = "list";
  }
}
</script>

<template>
  <n-tabs type="line" default-value="data" size="large" justify-content="space-evenly" animated
          v-model:value="selectedTab">
    <n-tab-pane name="data" tab="Supply Data">
      <template #default>
        <GalaxyForm @submit="handleDataSubmit"></GalaxyForm>
      </template>
    </n-tab-pane>
    <n-tab-pane name="list" tab="List" :disabled="!fetcher">
      <template #default>
        <GalaxyList :fetcher="fetcher"/>
      </template>
    </n-tab-pane>
    <n-tab-pane name="plot" tab="Plot" :disabled="!fetcher">
      <template #default>
        <Suspense>
          <GalaxyPlot :galaxyFetcher="fetcher" :viewport-fetcher="viewportFetcher" :hemisphere="hemisphere"/>
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </template>
    </n-tab-pane>
  </n-tabs>
</template>