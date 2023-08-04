<script setup>
import { reactive } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';
import { useRouter } from 'vue-router';
import { ajouterEtablissement } from '../../services/etablissementService';
const props = defineProps(['status', 'updateStatus'])
const router = useRouter()
const object = reactive({})
const onSubmitFunction = () => {
    ajouterEtablissement(object).then(promise => { promise.data })
        .then(() => { router.go() })
}
</script>
<template>
    <div class="bg-[#0000002a] fixed w-[100%] left-0 top-0 min-h-[100vh] z-20 flex items-center justify-center"
        @click="props.updateStatus(false)">
        <div class="w-[50%] bg-white py-5 px-3 rounded-lg shadow-lg" @click="(e) => { e.stopPropagation() }">
            <div class="flex flex-col-reverse items-center justify-center">
                <h1 class="font-bold text-xl text-center">ajouter nouveau établissement</h1>
                <svg-icon type="mdi" :path="mdiClose" class="self-end cursor-pointer" @click="props.updateStatus(false)" />
            </div>

            <div class=" flex flex-col px-3  gap-2 py-9">
                <div class="flex  gap-3">
                    <div class="flex flex-1  flex-col">
                        <label for="libelle">Libellé</label>
                        <input v-model="object.libelle" id="libelle" type="text"
                            class="border border-green-300 focus:outline-none rounded-md p-2">
                    </div>
                    <div class="flex flex-1  flex-col">
                        <label for="adresse">Adresse</label>
                        <input v-model="object.adresse" id="adresse" type="text"
                            class="border border-green-300   focus:outline-none rounded-md p-2">
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