<template>
    <div class="container mx-auto">
        <h1 class="mt-14 mb-6 underline font-semibold text-xl">Salas de juntas</h1>
        <DataTable :value="meetingRooms">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
            <Column field="actions" header="Acciones">
                <template #body="{ data }">
                    <div class="block text-center">
                        <div class="flex gap-4 my-2">
	                    	<button @click="() => (console.log(data))">
	                    		<span class="pi pi-eye text-gray-800 hover:text-blue-500" />
	                    	</button>
	                    	<button @click="() => (console.log(data))">
	                    		<span class="pi pi-pencil text-gray-800 hover:text-blue-500" />
	                    	</button>
	                    	<button @click="() => (console.log(data))">
	                    		<span class="pi pi-trash text-gray-800 hover:text-red-600" />
	                    	</button>
	                    </div>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

onMounted(() => {
    getData();
})

const meetingRooms = ref([]);

const getData = async() => {
    try {
        const {data} = await axios.get(
            'http://127.0.0.1:8000/api/meeting_rooms'
        );
        console.log(data);
        meetingRooms.value = data;
    } catch (error) {
        console.log(error);
    }
}

const columns = [
    { field: 'code_room', header: 'Codigo' },
    { field: 'size', header: 'Tamaño' },
];
</script>