<script setup>
import { reactive,ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';
import { useRouter } from 'vue-router';
import { ajouterEtablissement } from '../../services/etablissementService';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const props = defineProps(['status', 'updateStatus'])
const router = useRouter()
const object = reactive({})
const error=ref({})
const onSubmitFunction = () => {
    ajouterEtablissement(object).then(promise => {
        toast.add({ severity: 'success', summary: 'Success', detail: promise.data.message, life: 4500 })
    })
        .then(() => {
            setTimeout(() => {
                router.go()
            }, 1000);
        })
        .catch(e => {
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
                <h1 class="font-bold text-xl text-center">ajouter nouveau établissement</h1>
                <svg-icon type="mdi" :path="mdiClose" class="self-end cursor-pointer" @click="props.updateStatus(false)" />
            </div>

            <div class=" flex flex-col px-3  gap-2 py-9">
                <div class="flex  gap-3">
                    <div class="flex flex-1  flex-col">
                        <label for="libelle" class="after:content-['*'] after:ml-0.5 after:text-red-500">Libellé</label>
                        <input v-model="object.libelle" id="libelle" type="text" @input="(e) => {
                            if (e.target.value) {
                                delete error.libelle
                            }
                        }" class="border border-green-300 focus:outline-none rounded-md p-2">
                        <span class="text-red-500 text-xs">{{ error?.libelle }}</span>
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