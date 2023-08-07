<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment';
import { mdiMinusCircleOutline } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';
import MultiSelectComponent from '../global/MultiSelectComponent.vue';
import { profSelect, etablissementSelect } from '../../services/formsService.js'
import { modifierStagiaire, supprimerStagiaire } from '../../services/stagiaireService.js'
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();
const object = reactive(props.data)
delete object.mot_de_passe
const id = ref(object.id)
const error = ref({})
const ProfListModel = ref(false)

const updateModelStatus = (status) => {
    ProfListModel.value = status
}
const inEdit = ref(false)


const props = defineProps(['status', 'updateStatus', 'data'])



// for Professeurs select
const profsList = ref([])
const selectedProfs = ref(object.professeursList)
const setProf = (value) => {
    selectedProfs.value = value
}

onMounted(() => {
    profSelect().then(promise => { profsList.value = promise.data.data })
})

const filterData = (value) => {
    selectedProfs.value = selectedProfs.value.filter(elem => elem !== value)
}


// for etablissement select
const etablissementsList = ref([])
const etablissement = ref({})
onMounted(() => {
    etablissement.value = object.etablissement
    etablissementSelect().then(promise => { etablissementsList.value = promise.data.data })
})

// listener pour "onclick event" de delete et supprimer

const onDelete = () => {
    supprimerStagiaire(id.value).then(promise => {
        toast.add({ severity: 'info', summary: 'Info', detail: promise.data.message, life: 4500 });
    }).then(() => {
        setTimeout(() => {
            router.go()
        }, 1000);
    }).catch(e => {
        toast.add({ severity: 'error', summary: 'Error', detail: e.response.data.message, life: 4500 })
    })
}
const onUpdate = () => {
    object.professeurs_ids = selectedProfs.value.map(elem => elem.id)
    if (etablissement.value) {
        object.etablissement_id = etablissement.value.id
    }
    modifierStagiaire(id.value, object).then(promise => {
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
        :data="profsList" :selectedData="selectedProfs" :filterData="filterData" :setData="setProf" />
    <Toast />
    <div class="bg-[#0000002a] fixed w-[100%] left-0 top-0 min-h-[100vh] z-10 flex items-center justify-center"
        @click="props.updateStatus(false)">
        <div class="w-[65%] h-[70vh] rounded-[8px] translate-x-9 translate-y-2 shadow-lg bg-white
        grid grid-cols-3 p-10 overflow-x-auto " @click="(e) => { e.stopPropagation(); inEdit = false }">
            <div class="items-self-start  col-start-1 col-end-4 flex flex-col-reverse items-center justify-center ">
                <h2 class="text-xl font-bold -translate-y-4">Plus d'informations</h2>
                <svg-icon type="mdi" :path="mdiClose" class="self-end !translate-x-4 !-translate-y-8 cursor-pointer"
                    @click="props.updateStatus(false)" />
            </div>
            <div class='item'>
                <label for="numero" class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">numero</label>
                <div>{{ object.numero }}</div>
                <span class="text-red-500 text-xs">{{ !object?.numero ? error.numero : '' }}</span>
            </div>
            <div class='item'>
                <label for="nom" class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">Nom</label>
                <div v-if="inEdit">
                    <input v-model="object.nom" @input="(e) => {
                        if (e.target.value) {
                            delete error.nom
                        }
                    }" class="border-2 border-green-300   focus:outline-none rounded-md p-1" type="text"
                        @click="(e) => { e.stopPropagation(); }">
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.nom }}</div>
                <span class="text-red-500 text-xs">{{ error?.nom }}</span>

            </div>
            <div class='item'>
                <label for="numero" class="font-bold">prenom</label>
                <div v-if="inEdit">
                    <input v-model="object.prenom" class="border-2 border-green-300   focus:outline-none rounded-md p-1"
                        type="text" @click="(e) => { e.stopPropagation(); }">
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.prenom ?? 'san prenom' }}</div>
            </div>
            <div class='item'>
                <label for="ddNassance" class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">Date de
                    naissance</label>
                <div v-if="inEdit">
                    <input v-model="object.date_de_naissance" @input="(e) => {
                        if (e.target.value) {
                            delete error.date_de_naissance
                        }
                    }" class="border-2 border-green-300   focus:outline-none rounded-md p-1" type="date"
                        @click="(e) => { e.stopPropagation(); }">
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.date_de_naissance }} ({{
                    moment().startOf('day').diff(moment(object.date_de_naissance, "DD-MM-YYYY"), 'year') }} ans)</div>

                <span class="text-red-500 text-xs">{{ error?.date_de_naissance }}</span>
            </div>
            <div class='item'>
                <label for="adresse" class="font-bold">Adresse</label>
                <div v-if="inEdit">
                    <textarea v-model="object.adresse" class="border-2 border-green-300   focus:outline-none rounded-md p-1"
                        @click="(e) => { e.stopPropagation(); }"></textarea>
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.adresse ?? 'sans adresse' }}</div>
            </div>
            <div class='item'>
                <label for="listProf" class="flex justify-between font-bold">liste de professeur <button
                        @click="updateModelStatus(true)"
                        class="bg-green-600 transition-all duration-300 text-white p-1 px-2 rounded-md text-xs hover:bg-green-700">
                        Ajouter</button> </label>
                <ul class="h-28 mt-2 overflow-y-auto">
                    <li v-for="elem in selectedProfs" :key="elem.id"
                        class="p-2 hover:bg-green-300 cursor-pointer flex  justify-between">{{ elem.nom_complet }}
                        <svg-icon type="mdi" :path="mdiMinusCircleOutline" :size="20" @click="filterData(elem)" />
                    </li>
                </ul>
            </div>
            <div class='item'>
                <label for="etablissement" class="font-bold">établissement</label>
                <div v-if="inEdit">
                    <Dropdown v-model="etablissement" :options="etablissementsList" optionLabel="libelle"
                        placeholder="Select Etablissement" unstyled :pt="{
                            root: { class: 'bg-white border border-2 border-green-300 rounded-lg inline-flex  ' },
                            input: { class: 'text-gray-500 p-2 cursor-pointer overflow-hidden flex-1 cursor-pointer' },
                            trigger: { class: 'text-gray-500 w-12 rounded-r-[6px] flex items-center justify-center flex-shrink-0 cursor-pointer' },
                            panel: { class: 'bg-white shadow-lg text-gray-600' },
                            item: { class: 'py-3 px-5 bg-white hover:bg-green-100 cursor-pointer flex items-center overflow-hidden' },

                        }" @click="(e) => { e.stopPropagation() }"
                        @change="() => { object.etablissement = etablissement }" />
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.etablissement?.libelle ?? 'sans etablissement' }}
                </div>
            </div>
            <div class='item'>
                <label for="Login" class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">login</label>
                <div v-if="inEdit">
                    <input v-model="object.login" @input="(e) => {
                        if (e.target.value) {
                            delete error.login
                        }
                    }" class="border-2 border-green-300   focus:outline-none rounded-md p-1" type="text"
                        @click="(e) => { e.stopPropagation() }">
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.login }}</div>
                <span class="text-red-500 text-xs">{{ error?.login }}</span>
            </div>
            <div class='item'>
                <label for="password" class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">mot de
                    passe</label>
                <div v-if="inEdit">
                    <input v-model="object.mot_de_passe" @input="(e) => {
                        if (e.target.value) {
                            delete error.mot_de_passe
                        }
                    }" class="border-2 border-green-300   focus:outline-none rounded-md p-1" type="password"
                        @click="(e) => { e.stopPropagation() }">
                </div>
                <div v-else @dblclick="() => { inEdit = true }">*********</div>
                <span class="text-red-500 text-xs">{{ error?.mot_de_passe }}</span>
            </div>
            <button @click="onDelete"
                class="bg-red-500 transition-all duration-300 text-white w-fit p-4 py-2 h-fit justify-self-start self-center rounded-3xl  hover:bg-red-600">Delete</button>
            <button @click="onUpdate"
                class=" bg-orange-400 transition-all duration-300 text-white w-fit p-4 py-2 h-fit justify-self-end self-center rounded-3xl col-start-3 hover:bg-orange-500">Update</button>
        </div>
    </div>
</template>