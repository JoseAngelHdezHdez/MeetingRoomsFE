<template>
    <Dialog v-model:visible="display" :modal="true" @hiden="() => emit('done')">
        <template #header>
            <span class="p-dialog-header-span">
                Sala de juntas
            </span>
        </template>
        <div class="mt-5 grid grid-cols-2">
            <div class="mr-5">
                <label class="block mb-2 text-primary-dark-500 dark:text-primary-dark-100" for="code_room">
		        	Codigo de sala:
		        </label>
		        <InputText
		        	v-model="item.code_room" id="code_room" :model-value="item.code_room" :disabled="readonly || loading" name="code_room"
		        	class="shadow-sm focus:ring-indigo-700 focus:border-indigo-700 w-full sm:text-sm border-slate-300 rounded-md" />
            </div>
            <div>
                <label class="block mb-2 text-primary-dark-500 dark:text-primary-dark-100" for="size">
		        	Tamaño:
		        </label>
                <Dropdown
			    	id="size"
			    	v-model="item.size"
			    	:options="sizes"
			    	placeholder="Selecciona tamaño"
			    	class="shadow-sm focus:ring-indigo-700 focus:border-indigo-700 w-full sm:text-sm border-gray-300 rounded-md"
			    	name="size"
			    	optionLabel="name"
			    	optionValue="name"
			    	:disabled="readonly || loading" />
            </div>
        </div>
        <template v-if="!readonly" #footer>
            <button :disabled="loading" type="button" class="-mb-5 inline-flex items-center rounded-xl border px-3.5 py-2 mx-1 text-sm font-medium leading-4 bg-gray-400 border-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" @click="sendData()">
                <span class="hidden md:block pl-2 mr-2">Guardar</span>
                <i v-if="loading" class="pi pi-spin pi-spinner"></i>
            </button>
        </template>
    </Dialog>
</template>
<script setup>
import { useToast } from 'primevue/usetoast';
import { ref, defineExpose } from "vue";
import { postMeetingRooms, putMeetingRoom } from "@/services/meeting_room.js"
import { sizes } from "@/const/constData"

const defaultData = {code_room: '', size: ''};

const display = ref(false);
const item = ref()
const readonly = ref(false)
const loading = ref(false);
const statusAxios = ref('');
const emit = defineEmits(['done']);
const toast = useToast();

const showStore = () => {
    item.value = Object.assign({}, defaultData);
    readonly.value = false;
    display.value = true;
    statusAxios.value = 'post';
} 

const showUpdate = (_item) => {
    readonly.value = false;
    item.value = _item;
    display.value = true;
    statusAxios.value = 'put'
};

const showPreview = (_item) => {
	readonly.value = true;
    item.value = _item;
    display.value = true;
};

const sendData = async() => {
    loading.value = true
    console.log(item.value);
    let res = {};
    try {
        if (statusAxios.value === 'post') {
            res = await postMeetingRooms(item.value);
        }
        if (statusAxios.value === 'put'){
            res = await putMeetingRoom(item.value);
        }
        if (!res) {
            throw Error ('Revisa la informacion agregada 😱')
        }
        display.value = false;
        toast.add({severity: 'success', sumary: 'Se creo la sala 👍', life: 3000});
        item.value = {};        
    } catch (error) {
        toast.add({severity: 'error', sumary: `${error.message}`, life: 3000});
    } finally {
        loading.value = false;
    }
}

defineExpose({ showStore, showUpdate, showPreview });
</script>