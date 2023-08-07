<script setup>
import { ref, reactive } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';
import { modifierEtablissement, supprimerEtablissement } from '../../services/etablissementService.js'
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const props = defineProps(['status', 'updateStatus', 'data'])
const router = useRouter();
const object = reactive(props.data)
const id = ref(object.id)
const error = ref({})
const inEdit = ref(false)


// listener pour "onclick event" de delete et supprimer
const onDelete = () => {
    supprimerEtablissement(id.value).then(promise => {
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
    modifierEtablissement(id.value, object).then(promise => {
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
    <div class="bg-[#0000002a] fixed w-[100%] left-0 top-0 min-h-[100vh] z-10 flex items-center justify-center"
        @click="props.updateStatus(false)">
        <Toast />
        <div class="h-[50vh] w-[30%] flex flex-col justify-around rounded-[8px] translate-x-9 translate-y-2 shadow-lg bg-white
        p-10 overflow-x-auto " @click="(e) => { e.stopPropagation(); inEdit = false }">
            <div class="items-self-start  flex flex-col-reverse items-center justify-center ">
                <h2 class="text-xl font-bold -translate-y-4">Plus d'informations</h2>
                <svg-icon type="mdi" :path="mdiClose" class="self-end !translate-x-8 !-translate-y-10 cursor-pointer"
                    @click="props.updateStatus(false)" />
            </div>
            <div class='w-full'>
                <label for="adresse" class="font-bold">Adresse</label>
                <div class="mt-2" v-if="inEdit">
                    <input class="border-2 w-full border-green-300   focus:outline-none rounded-md p-1" type="text"
                        v-model="object.adresse" @click="(e) => { e.stopPropagation(); }">
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.adresse ?? 'sans addresse' }}</div>
            </div>
            <div class='item'>
                <label for="etablissement"
                    class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">Libelle</label>
                <div class="mt-2" v-if="inEdit">
                    <input @input="(e) => {
                        if (e.target.value) {
                            delete error.libelle
                        }
                    }" class="border-2 w-full border-green-300   focus:outline-none rounded-md p-1" type="text"
                        v-model="object.libelle" @click="(e) => { e.stopPropagation(); }">
                </div>
                <div v-else @dblclick="() => { inEdit = true }">{{ object.libelle }}</div>
                <span class="text-red-500 text-xs">{{ error?.libelle }}</span>
            </div>
            <div class="flex justify-between">
                <button @click="onDelete"
                    class="bg-red-500 transition-all duration-300 text-white w-fit p-4 py-2 h-fit justify-self-start self-center rounded-3xl  hover:bg-red-600">Delete</button>
                <button @click="onUpdate"
                    class=" bg-orange-400 transition-all duration-300 text-white w-fit p-4 py-2 h-fit justify-self-end self-center rounded-3xl col-start-3 hover:bg-orange-500">Update</button>

            </div>
        </div>
    </div>
</template>