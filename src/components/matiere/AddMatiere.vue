<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';
import { mdiAutorenew } from '@mdi/js';
import { ref, reactive, onMounted } from 'vue'
import { profSelect, matiereNumeroGenere } from '../../services/formsService.js'
import { ajouterMatiere } from '../../services/matiereService';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps(['status', 'updateStatus'])

const object = reactive({})
// for numero genere select
const getNumero = () => {
    matiereNumeroGenere().then(promise => { object.numero = promise.data.numero })
}
// pour stagiaires select
const selectedProfs = ref([])
const profsList = ref([])
onMounted(() => {
    profSelect().then(promise => { profsList.value = promise.data.data })
})




const onSubmitFunction = () => {
    object.professeurs_ids = selectedProfs.value.map(elem => elem.id);
    ajouterMatiere(object).then(promise => { console.log(promise); })
        .then(() => { router.go() })
}

</script>
<template>
    <div class="bg-[#0000002a] fixed w-[100%] left-0 top-0 min-h-[100vh] z-20 flex items-center justify-center"
        @click="props.updateStatus(false)">
        <div class="w-[50%] bg-white py-5 px-3 rounded-lg shadow-lg" @click="(e) => { e.stopPropagation() }">
            <div class="flex flex-col-reverse items-center justify-center">
                <h1 class="font-bold text-xl text-center">ajouter nouveau matière</h1>
                <svg-icon type="mdi" :path="mdiClose" class="self-end cursor-pointer" @click="props.updateStatus(false)" />
            </div>

            <div class=" flex flex-col px-3  gap-2 py-9">
                <div class="flex flex-col gap-3">
                    <label for="numero">Numéro</label>
                    <div class="flex items-center relative">
                        <input id="numero" type="text"
                            class="border flex-1 border-green-300 focus:outline-none rounded-md p-2" v-model="object.numero"
                            readonly disabled="disabled">
                        <div @click="getNumero"
                            class="absolute right-0 h-full w-[60px] flex items-center justify-center bg-green-500 rounded-r-md cursor-pointer">
                            <svg-icon class="text-white" type="mdi" :size="26" :path="mdiAutorenew" />
                        </div>

                    </div>
                </div>
                <div class="flex gap-3">
                    <div class="flex flex-1 flex-col ">
                        <label for="select1">Select professeurs</label>
                        <MultiSelect v-model="selectedProfs" display="chip" :options="profsList" optionLabel="nom_complet"
                            placeholder="Select Professeurs" :maxSelectedLabels="3" unstyled :pt="{
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

                            }" />
                    </div>
                    <div class="flex flex-1  flex-col">
                        <label for="select2">Libellé</label>
                        <input v-model="object.libelle" id="libelle" type="text"
                            class="border border-green-300 focus:outline-none rounded-md p-2">
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