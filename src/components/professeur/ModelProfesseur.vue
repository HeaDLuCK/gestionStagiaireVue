<script setup>
import { ref, onMounted, reactive } from 'vue'
import { mdiMinusCircleOutline } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';
import MultiSelectComponent from '../global/MultiSelectComponent.vue';
import { stagiaireSelect, matiereSelect } from '../../services/formsService.js'
import { modifierProfesseur, supprimerProfesseur } from '../../services/professeurService.js'
import { useRouter } from 'vue-router';
const props = defineProps(['status', 'updateStatus', 'data'])
const router = useRouter();
const object = reactive(props.data)
const id = ref(object.id)


const ProfListModel = ref(false)

const updateModelStatus = (status) => {
    ProfListModel.value = status
}
const inEdit = ref(false)




// for stagiaires select
const stagiairesList = ref([])
const selectedStagiaires = ref(object.stagiairesList)
const deletedStagiares = ref([])
const setStagiaires = (array) => {
    selectedStagiaires.value = array
}
const filterData = (value) => {
    deletedStagiares.value = [...deletedStagiares.value, value];
    selectedStagiaires.value = selectedStagiaires.value.filter(elem => elem !== value)
}
onMounted(() => {
    stagiaireSelect().then(promise => { stagiairesList.value = promise.data.data })
})

// for matiere select
const matieresList = ref([])
const matiere = ref({})
onMounted(() => {
    matiere.value = object?.matiere ?? {}
    matiereSelect().then(promise => { matieresList.value = promise.data.data })
})

// listener pour "onclick event" de delete et supprimer
const onDelete = () => {
    supprimerProfesseur(id.value).then(promise => { console.log(promise.data) })
        .then(() => { router.go() })
}
const onUpdate = () => {
    object.removedStagiaires_ids = deletedStagiares.value.map(elem => elem.id)
    object.stagiaire_ids = selectedStagiaires.value.map(elem => elem.id)
    object.matiere_id = matiere.value.id;
    modifierProfesseur(id.value, object).then(promise => { console.log(promise.data); })
        .then(() => { router.go() })
}

</script>

<template>
    <MultiSelectComponent v-if="ProfListModel" :status="ProfListModel" :updateStatus="updateModelStatus" name="stagiaires"
        :data="stagiairesList" :selectedData="selectedStagiaires" :filterData="filterData" :setData="setStagiaires" />
    <div class="bg-[#0000002a] fixed w-[100%] left-0 top-0 min-h-[100vh] z-10 flex items-center justify-center"
        @click="props.updateStatus(false)">
        <div class="w-[65%] h-[70vh] rounded-[8px] translate-x-9 translate-y-2 shadow-lg bg-white
        grid grid-cols-2 grid-flow-row p-10 overflow-x-auto " @click="(e) => { e.stopPropagation(); inEdit = false }">
            <div class="items-self-start  col-start-1 col-end-3 flex flex-col-reverse items-center justify-center ">
                <h2 class="text-xl font-bold -translate-y-4">Plus d'informations</h2>
                <svg-icon type="mdi" :path="mdiClose" class="self-end !translate-x-4 !-translate-y-8 cursor-pointer"
                    @click="props.updateStatus(false)" />
            </div>
            <div class='item'>
                <label for="numero" class="font-bold">numero</label>
                <div>{{ object.numero }}</div>
            </div>
            <div class='item'>
                <label for="adresse" class="font-bold">Adresse</label>
                <div v-if="inEdit">
                    <textarea class="border-2 border-green-300   focus:outline-none rounded-md p-1" v-model="object.adresse"
                        @click="(e) => { e.stopPropagation(); }"></textarea>
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.adresse ?? 'sans adresse' }}</div>
            </div>
            <div class='item'>
                <label for="nom" class="font-bold">Nom</label>
                <div v-if="inEdit">
                    <input class="border-2 border-green-300   focus:outline-none rounded-md p-1" type="text"
                        v-model="object.nom" @click="(e) => { e.stopPropagation(); }">
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.nom }}</div>
            </div>
            <div class='item'>
                <label for="numero" class="font-bold">prenom</label>
                <div v-if="inEdit">
                    <input class="border-2  border-green-300   focus:outline-none rounded-md p-1" type="text"
                        v-model="object.prenom" @click="(e) => { e.stopPropagation(); }">
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.prenom ?? 'sans prenom' }}</div>
            </div>
            <div class='item'>
                <label for="matiere" class="font-bold">matière</label>
                <div v-if="inEdit">
                    <Dropdown v-model="matiere" :options="matieresList" optionLabel="libelle" placeholder="Select a City"
                        unstyled :pt="{
                            root: { class: 'bg-white border border-2 border-green-300 rounded-lg inline-flex  ' },
                            input: { class: 'text-gray-500 p-2 cursor-pointer overflow-hidden flex-1 cursor-pointer' },
                            trigger: { class: 'text-gray-500 w-12 rounded-r-[6px] flex items-center justify-center flex-shrink-0 cursor-pointer' },
                            panel: { class: 'bg-white shadow-lg text-gray-600' },
                            item: { class: 'py-3 px-5 bg-white hover:bg-green-100 cursor-pointer flex items-center overflow-hidden' },

                        }" @click="(e) => { e.stopPropagation() }" />
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ matiere?.libelle ?? 'sans matiere' }}</div>
            </div>
            <div class='item'>
                <label for="listProf" class="flex justify-between font-bold">liste des stagiaires <button
                        @click="updateModelStatus(true)"
                        class="bg-green-600 transition-all duration-300 text-white p-1 px-2 rounded-md text-xs hover:bg-green-700">
                        Ajouter</button> </label>
                <ul class="h-28 mt-2 overflow-y-auto">
                    <li v-for="elem in selectedStagiaires" :key="elem.id"
                        class="p-2 hover:bg-green-300 cursor-pointer flex justify-between">{{ elem.nom_complet }}
                        <svg-icon type="mdi" :path="mdiMinusCircleOutline" :size="20" @click="filterData(elem)" />
                    </li>
                </ul>
            </div>

            <button @click="onDelete"
                class="bg-red-500 transition-all duration-300 text-white w-fit p-4 py-2 h-fit justify-self-start self-center rounded-3xl  hover:bg-red-600">Delete</button>
            <button @click="onUpdate"
                class=" bg-orange-400 transition-all duration-300 text-white w-fit p-4 py-2 h-fit justify-self-end self-center rounded-3xl  hover:bg-orange-500">Update</button>
        </div>
    </div>
</template>