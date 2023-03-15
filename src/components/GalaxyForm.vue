<script setup lang="ts">
import {
  NForm,
  NFormItem,
  NInput,
  FormInst,
  NInputNumber,
  NDatePicker,
  NSelect,
  NSwitch,
  NButton,
  FormRules,
  useMessage,
  NGrid,
  NFormItemGi,
  NGridItem,
} from "naive-ui";
import {CalculateRequest} from "../shared/types/CalculateRequest";
import {ref} from "vue";
import DegreeInput from "./DegreeInput.vue";
import {Galaxy} from "../shared/types/Galaxy";
import {useMediaQuery} from "@vueuse/core";
import {GalaxyFormModel} from "../shared/types/GalaxyFormModel";
import {GalaxyFilterRequest} from "../shared/types/GalaxyFilterRequest";

const emit = defineEmits(["submit"]);

const isMobile = useMediaQuery("(max-width: 768px)");

const hemisphereOptions = [
  {
    label: "East",
    value: "E",
  },
  {
    label: "West",
    value: "W",
  },
];

const model = ref({
                    longitude: {
                      degrees: 12,
                      minutes: 0,
                      seconds: 0,
                    },
                    latitude: {
                      degrees: 47,
                      minutes: 0,
                      seconds: 0,
                    },
                    minimumHeight: 30,
                    startTime: new Date("2023-03-09T04:00:00+01:00").getTime(),
                    hemisphere: "W",
                    fovHeight: 0.5,
                    fovWidth: 0.8,
                    fovAzimuthPosition: 250,
                    fovElevationPosition: 20,
                    ugc2ExposureTime: 300,
                    includeViewports: false,
                    gridSize: 0.5,
                    maxSearchTime: 5 * 60 * 60,
                    searchRadius: 10,
                    startPointCount: 10,
                  } as GalaxyFormModel);

function valuesToDegrees(degrees: number, minutes: number, seconds: number) {
  return degrees + minutes / 60 + seconds / 3600;
}

const rules: FormRules = {
  longitude: {
    required: true,
    validator: (_: any) => {
      const val = model.value.longitude;
      if (val.degrees + val.minutes + val.seconds <= 0) {
        return new Error("Longitude must be greater than 0");
      }
    },
    trigger: [
      "blur",
      "input",
    ],
    message: "Longitude is required",
  },
  latitude: {
    required: true,
    validator: (_: any) => {
      const val = model.value.latitude;
      if (val.degrees + val.minutes + val.seconds <= 0) {
        return new Error("Latitude must be greater than 0");
      }
    },
    trigger: [
      "blur",
      "input",
    ],
    message: "Latitude is required",
  },
  minimumHeight: {
    required: true,
    validator: (_: any) => {
      const val = model.value.minimumHeight;
      if (val <= 0) {
        return new Error("Minimum height must be greater than 0");
      }
    },
    trigger: [
      "blur",
      "input",
    ],
    message: "Minimum height is required",
  },
  observationStartTime: {
    required: true,
    validator: (_: any) => {
      const val = model.value.startTime;
      if (val <= 0) {
        return new Error("Observation start time must be greater than 0");
      }
    },
    trigger: [
      "blur",
      "input",
    ],
    message: "Observation start time is required",
  },
  hemisphere: {
    required: true,
    validator: (_: any) => {
      const val = model.value.hemisphere;
      if (val !== "E" && val !== "W") {
        return new Error("Hemisphere must be either E or W");
      }
    },
    trigger: [
      "blur",
      "input",
    ],
    message: "Hemisphere is required",
  },
  fovHeight: {
    required: true,
    validator: (_: any) => {
      const val = model.value.fovHeight;
      if (val <= 0) {
        return new Error("FOV height must be greater than 0");
      }
    },
    trigger: [
      "blur",
      "input",
    ],
    message: "FOV height is required",
  },
  fovWidth: {
    required: true,
    validator: (_: any) => {
      const val = model.value.fovWidth;
      if (val <= 0) {
        return new Error("FOV width must be greater than 0");
      }
    },
    trigger: [
      "blur",
      "input",
    ],
    message: "FOV width is required",
  },
  fovAzimuthPosition: {
    required: true,
    validator: (_: any) => {
      const val = model.value.fovAzimuthPosition;
      if (val <= 0) {
        return new Error("FOV azimuth position must be greater than 0");
      }
    },
    trigger: [
      "blur",
      "input",
    ],
    message: "FOV azimuth position is required",
  },
  fovElevationPosition: {
    required: true,
    validator: (_: any) => {
      const val = model.value.fovElevationPosition;
      if (val <= 0) {
        return new Error("FOV elevation position must be greater than 0");
      }
    },
    trigger: [
      "blur",
      "input",
    ],
    message: "FOV elevation position is required",
  },
  ugc2ExposureTime: {
    required: true,
    validator: (_: any) => {
      const val = model.value.ugc2ExposureTime;
      if (val <= 0) {
        return new Error("UGCS2 exposure time must be greater than 0");
      }
    },
    trigger: [
      "blur",
      "input",
    ],
    message: "UGCS2 exposure time is required",
  },
};

const formRef = ref<FormInst | null>(null);
const message = useMessage();

async function handleSubmit() {
  try {
    await formRef.value?.validate();
    const mappedModel = mapFormModel();
    emit("submit", mappedModel);
  } catch (e) {
    message.error("Validation failed, please check the form values");
  }
}

function mapFormModel(): GalaxyFilterRequest {
  const m = model.value;
  return {
    fov: {
      height: model.value.fovHeight,
      width: model.value.fovWidth,
      positionAngle: model.value.fovAzimuthPosition,
    },
    hemisphere: model.value.hemisphere,
    location: {
      longitude: valuesToDegrees(m.longitude.degrees, m.longitude.minutes, m.longitude.seconds),
      latitude: valuesToDegrees(m.latitude.degrees, m.latitude.minutes, m.latitude.seconds),
    },
    maxSearchTime: model.value.maxSearchTime,
    minimumHeight: model.value.minimumHeight,
    searchRadius: model.value.searchRadius,
    startPointCount: model.value.startPointCount,
    startTime: new Date(model.value.startTime).toISOString(),
    ugc2ExposureTime: model.value.ugc2ExposureTime,
    includeViewports: model.value.includeViewports,
    maxSemiMajorAxis: 10,
    maxSemiMinorAxis: 10,
    gridSize: model.value.gridSize,
  } as GalaxyFilterRequest;
}

</script>

<template>
  <n-form label-placement="top" class="w-full" size="large" :model="model" ref="formRef" :rules="rules">
    <n-grid :span="isMobile ? 12 :24" :x-gap="10">
      <n-form-item-gi :span="12" label="Longitude" path="longitude">
        <DegreeInput v-model:degrees="model.longitude.degrees" v-model:minutes="model.longitude.minutes"
                     v-model:seconds="model.longitude.seconds"/>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Latitude" path="latitude">
        <DegreeInput v-model:degrees="model.latitude.degrees" v-model:minutes="model.latitude.minutes"
                     v-model:seconds="model.latitude.seconds"/>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Minimum height" path="minimumHeight">
        <n-input-number :show-button="false" placeholder="0" v-model:value="model.minimumHeight"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Observation start time">
        <n-date-picker v-model:value="model.startTime" type="datetime"></n-date-picker>
      </n-form-item-gi>
      <n-form-item-gi :span="6" label="Hemisphere" path="hemisphere">
        <n-select v-model:value="model.hemisphere" :options="hemisphereOptions"></n-select>
      </n-form-item-gi>
      <n-form-item-gi :span="18">
        <!-- EMPTY SPACE -->
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Field of view height" path="fovHeight">
        <n-input-number :show-button="false" placeholder="0" v-model:value="model.fovHeight"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Field of view width" path="fovWidth">
        <n-input-number :show-button="false" placeholder="0" v-model:value="model.fovWidth"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Field of view azimuth position" path="fovAzimuthPosition">
        <n-input-number :show-button="false" placeholder="0" v-model:value="model.fovAzimuthPosition"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Field of view elevation position" path="fovElevationPosition">
        <n-input-number :show-button="false" placeholder="0"
                        v-model:value="model.fovElevationPosition"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="UGC2 exposure time" path="ugc2ExposureTime">
        <n-input-number :show-button="false" placeholder="0" v-model:value="model.ugc2ExposureTime"></n-input-number>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Include viewports" path="includeViewports">
        <n-switch v-model:value="model.includeViewports"></n-switch>
      </n-form-item-gi>
      <n-grid-item class="flex content-start mt-3" :span="24">
        <n-button
            round
            type="primary"
            @click.prevent="handleSubmit"
        >
          Fetch Galaxies
        </n-button>
      </n-grid-item>
    </n-grid>
  </n-form>
</template>