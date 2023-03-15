<script setup lang="ts">
import {NInputNumber} from "naive-ui";

const props = defineProps<{
  degrees: number
  minutes: number
  seconds: number
}>();

const emit = defineEmits([
                           "update:degrees",
                           "update:minutes",
                           "update:seconds",
                         ]);

function updateDegrees(value: number | null) {
  emit("update:degrees", value ?? 0);
}

function updateMinutes(value: number | null) {
  emit("update:minutes", value ?? 0);
}

function updateSeconds(value: number | null) {
  emit("update:seconds", value ?? 0);
}
</script>

<template>
  <div class="flex flex-nowrap flex-row text-lg">
    <n-input-number :show-button="false" class="w-[70px] mr-1" placeholder="0"
                    @update:value="updateDegrees" :value="props.degrees">
    </n-input-number>
    <span class="mr-2">°</span>
    <n-input-number :show-button="false" class="w-[70px] mr-1" placeholder="0"
                    @update:value="updateMinutes" :value="props.minutes">
    </n-input-number>
    <span class="mr-2">'</span>
    <n-input-number :show-button="false" class="w-[70px] mr-1" placeholder="0"
                    @update:value="updateSeconds" :value="props.seconds">
    </n-input-number>
    <span class="mr-2">''</span>
  </div>
</template>