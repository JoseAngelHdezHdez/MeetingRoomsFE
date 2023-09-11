<template>
    <div v-if="loadingPage">
        Cargando...
    </div>
    <div v-if="!loadingPage" class="container mx-auto">
        <div>
            <h1 class="mt-14 mb-6 underline font-semibold text-xl">Reuniones</h1>
            <button type="button" class="inline-flex items-center rounded-xl border px-3.5 py-2 text-sm font-medium leading-4 text-black hover:bg-gray-400 hover:border-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" @click="dialogModal.showStore(route.params.id)">
                <span class="hidden md:block pl-2">Crear reunion</span>
            </button>
        </div>
        <DataTable :value="meetingRooms">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
            <Column field="actions" header="Acciones">
                <template #body="{ data }">
                    <div class="block text-center">
                        <div class="flex gap-4 my-2">
	                    	<button @click="() => (dialogModal.showPreview(data))">
	                    		<span class="pi pi-eye text-gray-800 hover:text-blue-500" />
	                    	</button>
	                    	<button @click="() => (dialogModal.showUpdate(data))">
	                    		<span class="pi pi-pencil text-gray-800 hover:text-blue-500" />
	                    	</button>
	                    	<button @click="() => (deleteItem(data))">
	                    		<span class="pi pi-trash text-gray-800 hover:text-red-600" />
	                    	</button>
	                    </div>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
    <MeetingsDialog ref="dialogModal" @done="getData"/>
</template>

<script setup>
import MeetingsDialog from '@/components/meetings/MeetingsDialog.vue';
import { onMounted, ref } from 'vue';
import { getSchedule } from '@/services/meeting_room';
import { deleteMeeting } from '@/services/meeting';
import { useRoute } from 'vue-router'

const dialogModal = ref();
const route = useRoute();

onMounted(() => {
    getData();
})

const meetingRooms = ref([]);
const loadingPage = ref(false);

const getData = async() => {
    loadingPage.value = true;
    try {
        const data = await getSchedule(route.params.id);
        meetingRooms.value = data
    } catch (error) {
        console.log(error);
    } finally {
        loadingPage.value = false;
    }
}

const deleteItem = async(data) => {
    try {
        await deleteMeeting(data)
        getData();
    } catch (error) {
        console.log();
    }
}

const columns = [
    { field: 'start_meeting', header: 'Fecha de inicio' },
    { field: 'finish_meeting', header: 'Fecha de termino' },
    { field: 'status_meeting', header: 'Estatus de la reunion' },
];
</script>