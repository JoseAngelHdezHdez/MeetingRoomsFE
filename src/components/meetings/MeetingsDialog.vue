<template>
  <Dialog v-model:visible="display" :modal="true" @hide="() => emit('done')">
    <template #header>
      <span class="p-dialog-header-span"> Junta </span>
    </template>
    <div class="mt-5 grid grid-cols-3 gap-4">
      <div>
        <label
          class="block mb-2 text-primary-dark-500 dark:text-primary-dark-100"
          for="start_meeting"
        >
          Fecha de inicio:
        </label>
        <Calendar
          v-model="item.start_meeting"
          id="start_meeting"
          :model-value="item.start_meeting"
          :disabled="readonly || loading"
          name="start_meeting"
          showTime
          hourFormat="12"
          :minDate="now"
          class="shadow-sm focus:ring-indigo-700 focus:border-indigo-700 w-full sm:text-sm border-slate-300 rounded-md"
        />
      </div>
      <div>
        <label
          class="block mb-2 text-primary-dark-500 dark:text-primary-dark-100"
          for="finish_meeting"
        >
          Fecha final:
        </label>
        <Calendar
          v-model="item.finish_meeting"
          id="finish_meeting"
          :model-value="item.finish_meeting"
          :disabled="readonly || loading || item.start_meeting === ''"
          name="finish_meeting"
          showTime
          hourFormat="12"
          :minDate="now"
          class="shadow-sm focus:ring-indigo-700 focus:border-indigo-700 w-full sm:text-sm border-slate-300 rounded-md"
        />
      </div>
      <div v-if="statusAxios !== 'post'">
        <label
          class="block mb-2 text-primary-dark-500 dark:text-primary-dark-100"
          for="status_meeting"
        >
          Estatus de la reunion:
        </label>
        <Dropdown
          id="status_meeting"
          v-model="item.status_meeting"
          :options="statuses"
          placeholder="Selecciona tamaño"
          class="shadow-sm focus:ring-indigo-700 focus:border-indigo-700 w-full sm:text-sm border-gray-300 rounded-md"
          name="status_meeting"
          optionLabel="name"
          optionValue="name"
          :disabled="readonly || loading"
        />
      </div>
    </div>
    <template v-if="!readonly" #footer>
      <button
        :disabled="loading"
        type="button"
        class="-mb-5 inline-flex items-center rounded-xl border px-3.5 py-2 mx-1 text-sm font-medium leading-4 bg-gray-400 border-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        @click="sendData()"
      >
        <span class="hidden md:block pl-2 mr-2">Guardar</span>
        <i v-if="loading" class="pi pi-spin pi-spinner"></i>
      </button>
    </template>
  </Dialog>
</template>
<script setup>
import { useToast } from "primevue/usetoast";
import { ref, defineExpose, computed } from "vue";
import { postMeeting, putMeeting } from "@/services/meeting.js";
import { formaterDateSQL } from "@/const/formaterDates";
import { getMeetingRooms } from "@/services/meeting_room";
import { statuses } from "@/const/constData";

const defaultData = {
  meeting_room_id: "",
  start_meeting: "",
  finish_meeting: "",
  status_meeting: "Programado",
};

const now = new Date();
const display = ref(false);
const item = ref();
const meetingRooms = ref();
const readonly = ref(false);
const loading = ref(false);
const statusAxios = ref("");
const emit = defineEmits(["done"]);
const toast = useToast();
const itemComputed = computed(() => {
  return {
    ...item.value,
    start_meeting: formaterDateSQL(item.value.start_meeting),
    finish_meeting: formaterDateSQL(item.value.finish_meeting),
  };
});

const getData = async () => {
  try {
    if (!meetingRooms.value) {
      const data = await getMeetingRooms();
      meetingRooms.value = data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    display.value = true;
  }
};

const showStore = (id) => {
  item.value = Object.assign({}, defaultData);
  item.value.meeting_room_id = id;
  readonly.value = false;
  display.value = true;
  statusAxios.value = "post";
  getData();
};

const showUpdate = (_item) => {
  readonly.value = false;
  item.value = _item;
  display.value = true;
  statusAxios.value = "put";
  getData();
};

const showPreview = (_item) => {
  readonly.value = true;
  item.value = _item;
  display.value = true;
  statusAxios.value = "";
  getData();
};

const sendData = async () => {
  loading.value = true;
  let res = {};
  try {
    if (statusAxios.value === "post") {
      res = await postMeeting(itemComputed.value);
    }
    if (statusAxios.value === "put") {
      res = await putMeeting(itemComputed.value);
    }
    if (!res) {
      throw Error("Revisa la informacion agregada 😱");
    }
    display.value = false;
    toast.add({
      severity: "success",
      sumary: "Se creo la sala 👍",
      life: 3000,
    });
    item.value = {};
  } catch (error) {
    toast.add({ severity: "error", sumary: `${error.message}`, life: 3000 });
  } finally {
    loading.value = false;
  }
};

defineExpose({ showStore, showUpdate, showPreview });
</script>
