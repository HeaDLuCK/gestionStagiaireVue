<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiArrowUp } from '@mdi/js';
import { mdiArrowDown } from '@mdi/js';
import { ref, onMounted,reactive } from 'vue'
import AddProfesseur from '../components/professeur/AddProfesseur.vue';
import ModelProfesseur from '../components/professeur/ModelProfesseur.vue';
import { getProfesseurs } from '../services/professeurService.js'
const dataForModel = reactive({})
const data = ref([])
onMounted(() => {
    getProfesseurs().then(promise => { data.value =  promise.data.data })
})


const icon = ref(mdiArrowUp)
const count = ref(0)
const modelStatus = ref(false)
const updateModelStatus = (status) => {
    modelStatus.value = status
}
const formModel = ref(false)

const updateFormModelStatus = (status) => {
    formModel.value = status
}
const onClickFunc = () => {
    count.value++
    if (count.value == 1) {
        icon.value = mdiArrowUp
    } else if (count.value == 2) {
        icon.value = mdiArrowDown
    } else {
        count.value = 0
    }
}
</script>

<template>
    <AddProfesseur v-if="formModel" :status="formModel" :updateStatus="updateFormModelStatus" />
    <ModelProfesseur v-if="modelStatus" :status="modelStatus" :updateStatus="updateModelStatus" :data="dataForModel" />
    <h1 class="text-3xl mt-7 font-bold text-green-700">Liste des professeurs</h1>


    <div class="relative w-full flex justify-end py-3">
        <button class="transition-all duration-300 bg-green-500 p-3 text-white rounded-2xl hover:bg-green-700"
            @click="updateFormModelStatus(true)">ajouter professeur</button>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

        <table class="w-full text-sm text-left text-gray-700 ">
            <thead class="text-s font-medium text-gray-800 uppercase bg-green-500 ">
                <tr>
                    <th scope="col" class="px-6 py-3 flex cursor-pointer" @click="onClickFunc">
                        Numéro <svg-icon v-if="count" type="mdi" :path="icon" :size="15" />
                    </th>
                    <th scope="col" class="px-6 py-3 ">
                        Nom complet
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Adresse
                    </th>
                    <th scope="col" class="px-6 py-3">
                        matière
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Plus
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="elem in data" :key="elem.id" class="bg-green-100 border-b  ">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {{ elem.numero }}
                    </th>
                    <td class="px-6 py-4">
                        {{ elem.prenom ? elem.prenom + " " + elem.nom : elem.nom }}
                    </td>
                    <td class="px-6 py-4">
                        {{ elem.adresse ?? "sans adresse" }}
                    </td>
                    <td class="px-6 py-4">
                        {{ elem.matiere?.libelle ?? "sans matiere" }}
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        @click="() => {dataForModel = elem; updateModelStatus(true) }">montre plus</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>