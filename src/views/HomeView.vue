<template>
    <div v-if="loadingPage">
        Cargando...
    </div>
    <div v-if="!loadingPage" class="container mx-auto">
        <div>
            <h1 class="mt-14 mb-6 underline font-semibold text-xl">Salas de juntas</h1>
            <button type="button" class="inline-flex items-center rounded-xl border px-3.5 py-2 mx-1 text-sm font-medium leading-4 text-black hover:bg-gray-400 hover:border-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" @click="dialogModal.showStore">
                <span class="hidden md:block pl-2">Crear Sala</span>
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
	                    	<RouterLink :to="`/meetings/${data.id}`">
	                    		<span class="pi pi-database text-gray-800 hover:text-yellow-600" />
	                    	</RouterLink>
	                    </div>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
    <HomeDialog ref="dialogModal" @done="getData"/>
</template>

<script setup>
import HomeDialog from '@/components/home/HomeDialog.vue';
import { onMounted, ref } from 'vue';
import { getMeetingRooms, deleteMeetingRooms } from '@/services/meeting_room';
import { RouterLink } from 'vue-router';

const dialogModal = ref();

onMounted(() => {
    getData();
})

const meetingRooms = ref([]);
const loadingPage = ref(false);

const getData = async() => {
    loadingPage.value = true;
    try {
        const data = await getMeetingRooms();
        meetingRooms.value = data
    } catch (error) {
        console.log(error);
    } finally {
        loadingPage.value = false;
    }
}

const deleteItem = async(data) => {
    try {
        await deleteMeetingRooms(data)
        getData();
    } catch (error) {
        console.log();
    }
}

const columns = [
    { field: 'code_room', header: 'Codigo' },
    { field: 'size', header: 'Tamaño' },
];
</script>