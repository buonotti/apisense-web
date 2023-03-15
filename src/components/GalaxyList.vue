<script async setup lang="ts">
import {Galaxy} from "../shared/types/Galaxy";
import {NList, NListItem, NThing, useMessage, NPagination, NBackTop} from "naive-ui";
import {computed, Ref, ref} from "vue";
import {useGalaxyRepo} from "../shared/GalaxyRepo";
import {AxiosError} from "axios";
import {ChunkFetcher} from "../shared/ChunkFetcher";

const props = defineProps<{
  fetcher: ChunkFetcher<Galaxy> | undefined;
}>();

let galaxies = computed(() => [] as Galaxy[]);
const page = ref(1);

const fetcher = props.fetcher;

if (fetcher) {
  fetcher.reset();
  galaxies = computed(() => {
    return props.fetcher ? fetcher.getPage(page.value) : [];
  });
}

</script>

<template>
  <n-back-top :right="20"/>
  <div v-if="fetcher != null">
    <n-list hoverable>
      <n-list-item v-for="(data) in galaxies" :key="data.id">
        <n-thing :title="'UGC'+data.id+' ('+data.preferredName+')'" content-style="margin-top: 10px">
          {{ data.morphology }}
        </n-thing>
      </n-list-item>
    </n-list>
    <div class="flex content-center items-center w-full mt-3">
      <n-pagination v-model:page="page" :page-count="fetcher ? fetcher.chunks() : 0" size="large"></n-pagination>
    </div>
  </div>
</template>