<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';
import { mdiAutorenew } from '@mdi/js';
import { ref, onMounted, reactive } from 'vue'
import { profNumeroGenere, matiereSelect, stagiaireSelect } from '../../services/formsService.js'
import { ajouterProfesseur } from '../../services/professeurService';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();
const props = defineProps(['status', 'updateStatus'])
const error = ref({})

const object = reactive({})

// for numero genere select
const getNumero = () => {
    profNumeroGenere().then(promise => { object.numero = promise.data.numero })
}
// pour stagiaires select
const selectedStagiaires = ref([])
const stagiairesList = ref([])
onMounted(() => {
    stagiaireSelect().then(promise => { stagiairesList.value = promise.data.data })
})

// pour matiere select
const matieresList = ref([])
const matiere = ref({})
onMounted(() => {
    matiereSelect().then(promise => { matieresList.value = promise.data.data })
})


const onSubmitFunction = () => {
    object.stagiaire_ids = selectedStagiaires.value.map(elem => elem.id)
    object.matiere_id = matiere.value.id
    ajouterProfesseur(object).then(promise => {
        toast.add({ severity: 'success', summary: 'Success', detail: promise.data.message, life: 4500 })
    })
        .then(() => {
            setTimeout(() => {
                router.go()
            }, 1000);
        }).catch(e => {
            if (!e.response.data?.message) {
                error.value = { ...error.value, ...e.response.data }
            } else {
                toast.add({ severity: 'error', summary: 'Error', detail: e.response.data.message, life: 4500 })
            };
        })

}

</script>
<template>
    <Toast />
    <div class="bg-[#0000002a] fixed w-[100%] left-0 top-0 min-h-[100vh] z-20 flex items-center justify-center"
        @click="props.updateStatus(false)">
        <div class="w-[50%] bg-white py-5 px-3 rounded-lg shadow-lg" @click="(e) => { e.stopPropagation() }">
            <div class="flex flex-col-reverse items-center justify-center">
                <h1 class="font-bold text-xl text-center">ajouter nouveau professeur</h1>
                <svg-icon type="mdi" :path="mdiClose" class="self-end cursor-pointer" @click="props.updateStatus(false)" />
            </div>

            <div class=" flex flex-col px-3  gap-2 py-9">
                <div class="flex flex-col gap-3">
                    <label for="numero" class="after:content-['*'] after:ml-0.5 after:text-red-500">Numéro</label>
                    <div class="flex items-center relative">
                        <input id="numero" type="text"
                            class="border flex-1 border-green-300 focus:outline-none rounded-md p-2" v-model="object.numero"
                            readonly disabled="disabled">
                        <div @click="getNumero"
                            class="absolute right-0 h-full w-[60px] flex items-center justify-center bg-green-500 rounded-r-md cursor-pointer">
                            <svg-icon class="text-white" type="mdi" :size="26" :path="mdiAutorenew" />
                        </div>
                    </div>
                    <span class="text-red-500 text-xs">{{ !object?.numero ? error?.numero : '' }}</span>
                </div>
                <div class="flex  gap-3">
                    <div class="flex flex-1  flex-col">
                        <label for="nom" class="after:content-['*'] after:ml-0.5 after:text-red-500">Nom</label>
                        <input v-model="object.nom" id="nom" type="text" @input="(e) => {
                            if (e.target.value) {
                                delete error.nom
                            }
                        }" class="border border-green-300 focus:outline-none rounded-md p-2">
                        <span class="text-red-500 text-xs">{{ error?.nom }}</span>
                    </div>
                    <div class="flex flex-1  flex-col">
                        <label for="prenom">Prénom</label>
                        <input v-model="object.prenom" id="prenom" type="text"
                            class="border border-green-300   focus:outline-none rounded-md p-2">
                    </div>
                </div>
                <div class="flex gap-3">
                    <div class="flex flex-1  flex-col">
                        <label for="adresse">Adresse</label>
                        <input v-model="object.adresse" id="adresse" type="text"
                            class="border  border-green-300 focus:outline-none  rounded-md p-2">
                    </div>
                </div>
                <div class="flex gap-3">
                    <div class="flex flex-1 flex-col ">
                        <label for="select1">Select stagiaires</label>
                        <MultiSelect v-model="selectedStagiaires" display="chip" :options="stagiairesList"
                            optionLabel="nom_complet" placeholder="Select Stagiaires" :maxSelectedLabels="3" unstyled :pt="{
                                root: { class: 'bg-white border border-solid border-green-300 rounded-lg inline-flex  ' },
                                labelContainer: { class: 'overflow-hidden flex-1 cursor-pointer' },
                                label: { class: 'text-gray-500 p-2 cursor-pointer overflow-hidden ' },
                                trigger: { class: 'text-gray-500 w-12 rounded-r-[6px] flex items-center justify-center flex-shrink-0 cursor-pointer ' },
                                panel: { class: 'bg-white shadow-lg text-gray-600' },
                                header: { class: ' bg-green-50  p-3 rounded-r-[6px] flex items-center justify-between border border-solid border-r-white' },
                                headerCheckboxContainer: { class: 'inline-flex cursor-pointer relative m-1 w-[22px] h-[22px]' },
                                headerCheckbox: { class: 'w-[22px] h-[22px] text-gray-400 rounded-[6px] border border-2' },
                                checkbox: { class: 'w-[22px] h-[22px] text-gray-400 rounded-[6px] flex items-center justify-center border border-2 ' },
                                token: { class: 'inline-flex items-center rounded-[16px] bg-green-300 text-gray-600 px-2 py-1 mx-1 gap-1' },
                                checkboxcontainer: { class: 'inline-flex cursor-pointer mr-1' },
                                item: { class: 'py-3 px-5 bg-white hover:bg-green-100 cursor-pointer flex items-center overflow-hidden' },
                                list: { class: 'py-3 max-h-[200px]' },
                                wrapper: { class: 'max-h-[200px] overflow-y-auto' },
                                headerCheckbox: { class: 'w-[22px] h-[22px] text-gray-400 rounded-[6px] flex items-center justify-center border border-2 ' }
                            }" />
                    </div>
                    <div class="flex flex-1  flex-col">
                        <label for="select2" class="after:content-['*'] after:ml-0.5 after:text-red-500">Select
                            matiere</label>
                        <Dropdown v-model="matiere" :options="matieresList" optionLabel="libelle"
                            placeholder="Select Matiere" unstyled :pt="{
                                root: { class: 'bg-white border border-solid border-green-300 rounded-lg inline-flex  ' },
                                input: { class: 'text-gray-500 p-2 cursor-pointer overflow-hidden flex-1 cursor-pointer' },
                                trigger: { class: 'text-gray-500 w-12 rounded-r-[6px] flex items-center justify-center flex-shrink-0 ' },
                                panel: { class: 'bg-white shadow-lg text-gray-600' },
                                item: { class: 'py-3 px-5 bg-white hover:bg-green-100 cursor-pointer flex items-center overflow-hidden' },

                            }" />
                        <span class="text-red-500 text-xs">{{ !object.matiere_id ? error.matiere_id : '' }}</span>
                    </div>
                </div>
                <div class="flex justify-between px-4 items-end">
                    <button @click="props.updateStatus(false)"
                        class="transition-all duration-300 bg-red-600 w-fit self-center text-white px-5 mt-5 py-2 rounded-full hover:bg-red-700">Annuler</button>
                    <button @click="onSubmitFunction"
                        class="transition-all duration-300 bg-green-600 w-fit self-center text-white px-5 mt-5 py-2 rounded-full hover:bg-green-700">Ajouter</button>
                </div>
            </div>
        </div>
    </div>
</template>