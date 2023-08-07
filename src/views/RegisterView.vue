<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import moment from 'moment';
import { useRouter } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAutorenew } from '@mdi/js';
import { profSelect, etablissementSelect, stagiaireNumeroGenere } from '../services/formsService.js'
import { register } from '../services/authService.js'
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();
const selectedProfesseurs = ref([]);
const seletectedEtablissement = ref();
const professeurs = ref([]);
const etablissements = ref([]);
const error = ref({})


onBeforeMount(() => {
    profSelect().then(promise => { professeurs.value = promise.data.data })
    etablissementSelect().then(promise => { etablissements.value = promise.data.data })
})
const numeroGenereFunction = () => {
    stagiaireNumeroGenere().then(promise => { object.numero = promise.data.numero })
}
const object = reactive({});
const submitFunction = () => {
    object.professeurs_ids = selectedProfesseurs.value.map(elem => elem.id);
    object.etablissement_id = !seletectedEtablissement.value?.id ? null : seletectedEtablissement.value.id
    object.date_de_naissance = moment(object.date_de_naissance).format("DD-MM-YYYY")
    console.log(object);
    register(object).then(promise => {
        toast.add({ severity: 'success', summary: 'Success', detail: promise.data.message, life: 4500 });
    }).then(() => {
        setTimeout(() => {
            router.push({ path: '/login' })
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
    <Toast />
    <div class="flex flex-col bg-green-500 w-[50vw]  m-auto shadow-md p-[2px]  mt-8 rounded-md">
        <div class="py-8">
            <h1 class="text-2xl text-center text-white font-bold">Register</h1>
        </div>
        <div class=" flex flex-col px-3  gap-2 py-9 bg-white">
            <div class="flex flex-col gap-3">
                <label for="numero" class="after:content-['*'] after:ml-0.5 after:text-red-500">Numéro</label>
                <div class="flex items-center relative">
                    <input id="numero" type="text" class="border flex-1 border-green-300 focus:outline-none rounded-md p-2"
                        v-model="object.numero" readonly disabled="disabled">
                    <div @click="numeroGenereFunction"
                        class="absolute right-0 h-full w-[60px] flex items-center justify-center bg-green-500 rounded-r-md cursor-pointer">
                        <svg-icon class="text-white" type="mdi" :size="26" :path="mdiAutorenew" />
                    </div>
                </div>
                <span class="text-red-500 text-xs">{{ !object.numero ? error?.numero : '' }}</span>
            </div>
            <div class="flex  gap-3">
                <div class="flex flex-1  flex-col">
                    <label for="nom" class="after:content-['*'] after:ml-0.5 after:text-red-500">Nom</label>
                    <input id="nom" type="text" v-model="object.nom" @input="(e) => {
                        if (e.target.value) {
                            delete error.nom
                        }
                    }" class="border border-green-300 focus:outline-none rounded-md p-2">
                    <span class="text-red-500 text-xs">{{ error?.nom }}</span>
                </div>
                <div class="flex flex-1  flex-col">
                    <label for="prenom">Prénom</label>
                    <input id="prenom" type="text" v-model="object.prenom"
                        class="border border-green-300   focus:outline-none rounded-md p-2">
                </div>
            </div>
            <div class="flex gap-3">
                <div class="flex flex-1  flex-col">
                    <label for="datedeNaissance" class="after:content-['*'] after:ml-0.5 after:text-red-500">Date de
                        naissance</label>
                    <input id="datedeNaissance" type="date" v-model="object.date_de_naissance" @input="(e) => {
                        if (e.target.value) {
                            delete error.date_de_naissance
                        }
                    }" class="border border-green-300 focus:outline-none rounded-md p-2">
                    <span class="text-red-500 text-xs">{{ error?.date_de_naissance }}</span>
                </div>
                <div class="flex flex-1  flex-col">
                    <label for="adresse">Adresse</label>
                    <input v-model="object.adresse" id="adresse" type="text"
                        class="border border-green-300 focus:outline-none  rounded-md p-2">
                </div>
            </div>
            <div class="flex gap-3">
                <div class="flex flex-1 flex-col ">
                    <label for="select1">Select professeurs</label>
                    <MultiSelect v-model="selectedProfesseurs" display="chip" :options="professeurs"
                        optionLabel="nom_complet" placeholder="Select profs" :maxSelectedLabels="3" unstyled :pt="{
                            root: { class: 'bg-white border border-solid border-green-300 rounded-lg inline-flex  ' },
                            labelContainer: { class: 'overflow-hidden flex-1 cursor-pointer' },
                            label: { class: 'text-gray-500 p-2 cursor-pointer overflow-hidden ' },
                            trigger: { class: 'text-gray-500 w-12 rounded-r-[6px] flex items-center justify-center flex-shrink-0 ' },
                            panel: { class: 'bg-white shadow-lg text-gray-600' },
                            header: { class: ' bg-green-50  p-3 rounded-r-[6px] flex items-center justify-between border border-solid border-r-white' },
                            headerCheckboxContainer: { class: 'inline-flex cursor-pointer relative m-1 w-[22px] h-[22px]' },
                            headerCheckbox: { class: 'w-[22px] h-[22px] text-gray-400 rounded-[6px] border border-2' },
                            checkbox: { class: 'w-[22px] h-[22px] text-gray-400 rounded-[6px] flex items-center justify-center border border-2 ' },
                            token: { class: 'inline-flex items-center rounded-[16px] bg-green-300 text-gray-600 px-2 py-1 mx-1 gap-1' },
                            checkboxcontainer: { class: 'inline-flex cursor-pointer mr-1' },
                            item: { class: 'py-3 px-5 bg-white hover:bg-green-100 cursor-pointer flex items-center overflow-hidden' },
                            list: { class: 'py-3' },
                            wrapper: { class: 'max-h-[200px] overflow-y-auto' },
                            headerCheckbox: { class: 'w-[22px] h-[22px] text-gray-400 rounded-[6px] flex items-center justify-center border border-2 ' }

                        }" />
                </div>
                <div class="flex flex-1  flex-col">
                    <label for="select2">Select Etablissement</label>
                    <Dropdown v-model="seletectedEtablissement" :options="etablissements" optionLabel="libelle"
                        placeholder="Select etablissement" unstyled :pt="{
                            root: { class: 'bg-white border border-solid border-green-300 rounded-lg inline-flex  ' },
                            input: { class: 'text-gray-500 p-2 cursor-pointer overflow-hidden flex-1 cursor-pointer' },
                            trigger: { class: 'text-gray-500 w-12 rounded-r-[6px] flex items-center justify-center flex-shrink-0 cursor-pointerq' },
                            panel: { class: 'bg-white shadow-lg text-gray-600' },
                            item: { class: 'py-3 px-5 bg-white hover:bg-green-100 cursor-pointer flex items-center overflow-hidden' },

                        }" />
                </div>
            </div>
            <div class="flex gap-3">
                <div class="flex flex-1  flex-col">
                    <label for="login" class="after:content-['*'] after:ml-0.5 after:text-red-500">Login</label>
                    <input id="login" v-model="object.login" type="text" @input="(e) => {
                        if (e.target.value) {
                            delete error.login
                        }
                    }" class="border border-green-300 focus:outline-none rounded-md p-2">
                    <span class="text-red-500 text-xs">{{ error?.login }}</span>
                </div>
                <div class="flex flex-1  flex-col">
                    <label for="password" class="after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
                    <input id="password" v-model="object.mot_de_passe" type="password" @input="(e) => {
                        if (e.target.value) {
                            delete error.mot_de_passe
                        }
                    }" class="border border-green-300 focus:outline-none rounded-md p-2">
                    <span class="text-red-500 text-xs">{{ error?.mot_de_passe }}</span>
                </div>
            </div>
            <button @click="submitFunction"
                class="transition-all duration-300 bg-green-600 w-fit self-center text-white px-5 mt-5 py-2 rounded-full hover:bg-green-700">Register</button>
        </div>
    </div>
</template>