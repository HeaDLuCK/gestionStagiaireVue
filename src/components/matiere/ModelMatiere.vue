<script setup>
import { ref, onMounted, reactive } from 'vue'
import { mdiMinusCircleOutline } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';
import MultiSelectComponent from '../global/MultiSelectComponent.vue';
import { profSelect } from '../../services/formsService.js'
import { modifierMatiere, supprimerMatiere } from '../../services/matiereService.js'
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();
const props = defineProps(['status', 'updateStatus', 'data'])
const object = reactive(props.data)
const id = ref(object.id)
const ProfListModel = ref(false)
const error = ref({})

const updateModelStatus = (status) => {
    ProfListModel.value = status
}
const inEdit = ref(false)
const data = ref(['test1', 'test2', 'test3'])




// for Professeurs select
const profsList = ref([])
const selectedProfs = ref(object.professeursList)
const setProfs = (array) => {
    selectedProfs.value = array
}
const filterData = (value) => {
    selectedProfs.value = selectedProfs.value.filter(elem => elem !== value)
}
onMounted(() => {
    profSelect().then(promise => { profsList.value = promise.data.data })
})

// listener pour "onclick event" de delete et supprimer


const onDelete = () => {
    supprimerMatiere(id.value).then(promise => {
        toast.add({ severity: 'info', summary: 'Info', detail: promise.data.message, life: 4500 });
    }).then(() => {
        setTimeout(() => {
            router.go()
        }, 1000);
    })
        .catch(e => {
            toast.add({ severity: 'error', summary: 'Error', detail: e.response.data.message, life: 4500 })

        })
}
const onUpdate = () => {
    object.professeurs_ids = selectedProfs.value.map(elem => elem.id)
    modifierMatiere(id.value, object).then(promise => {
        toast.add({ severity: 'success', summary: 'Success', detail: promise.data.message, life: 4500 });
    }).then(() => {
        setTimeout(() => {
            router.go()
        }, 1000);
    })
        .catch(e => {
            if (!e.response.data?.message) {
                error.value = e.response.data
            } else {
                toast.add({ severity: 'error', summary: 'Error', detail: e.response.data.message, life: 4500 })
            };
        })
}


</script>

<template>
    <MultiSelectComponent v-if="ProfListModel" :status="ProfListModel" :updateStatus="updateModelStatus" name="professeurs"
        :data="profsList" :setData="setProfs" />
    <Toast/>
        <div class="bg-[#0000002a] fixed w-[100%] left-0 top-0 min-h-[100vh] z-10 flex items-center justify-center"
        @click="props.updateStatus(false)">
        <div class="w-[45%] flex flex-col gap-4  rounded-[8px] translate-x-9 translate-y-2 shadow-lg bg-white
         p-10 overflow-x-auto " @click="(e) => { e.stopPropagation(); inEdit = false }">
            <div class="items-self-start   flex flex-col-reverse items-center justify-center ">
                <h2 class="text-xl font-bold -translate-y-4">Plus d'informations</h2>
                <svg-icon type="mdi" :path="mdiClose" class="self-end !translate-x-8 !-translate-y-8 cursor-pointer"
                    @click="props.updateStatus(false)" />
            </div>
            <div class='item'>
                <label for="numero" class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">numero</label>
                <div class="mt-2">{{ object.numero }}</div>
                <span class="text-red-500 text-xs">{{ !object?.numero ? error.numero : '' }}</span>
            </div>
            <div class='item w-full'>
                <label for="libelle" class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">Libellé</label>
                <div v-if="inEdit" class="mt-2">
                    <input @input="(e) => {
                        if (e.target.value) {
                            delete error.libelle
                        }
                    }" class="border-2 border-green-300  w-full  focus:outline-none rounded-md p-1" type="text"
                        v-model="object.libelle" @click="(e) => { e.stopPropagation(); }">
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.libelle }}</div>
                <span class="text-red-500 text-xs">{{ error?.libelle }}</span>
            </div>
            <div class='item'>
                <label for="listProf" class="flex justify-between font-bold">liste de professeur <button
                        @click="updateModelStatus(true)"
                        class="bg-green-600 transition-all duration-300 text-white p-1 px-2 rounded-md text-xs hover:bg-green-700">
                        Ajouter</button> </label>
                <ul class="h-28 mt-2 overflow-y-auto">
                    <li v-for="elem in selectedProfs" :key="elem.id"
                        class="p-2 hover:bg-green-300 cursor-pointer flex justify-between">{{ elem.nom_complet }}
                        <svg-icon type="mdi" :path="mdiMinusCircleOutline" :size="20" @click="filterData(elem)" />
                    </li>
                </ul>
            </div>


            <div class="flex justify-between pt-2">
                <button @click="onDelete"
                    class="bg-red-500 transition-all duration-300 text-white w-fit p-4 py-2 h-fit justify-self-start self-center rounded-3xl  hover:bg-red-600">Delete</button>
                <button @click="onUpdate"
                    class=" bg-orange-400 transition-all duration-300 text-white w-fit p-4 py-2 h-fit justify-self-end self-center rounded-3xl col-start-3 hover:bg-orange-500">Update</button>

            </div>
        </div>
    </div>
</template>