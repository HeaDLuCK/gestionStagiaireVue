<script setup>
import { ref } from 'vue';
const props = defineProps(['status', 'updateStatus', 'name', 'data', 'filterData', 'selectedData', 'setData'])
const selected = ref(props.selectedData)
const onSubmit = () => {
    props.setData(selected.value)
    props.updateStatus(false)
}
</script>
<template>
    <div class="bg-[#0000002a] fixed w-[100%] left-0 top-0 min-h-[100vh] z-20 flex items-center justify-center"
        @click="props.updateStatus(false)">
        <div class="w-[30%] h-[30vh] rounded-[8px] translate-x-9 translate-y-2 shadow-lg bg-white"
            @click="(e) => { e.stopPropagation(); }">

            <div class="flex flex-col items-center justify-around h-full p-4">
                <h2 class="font-bold text-xl">select {{ props.name }}</h2>
                <MultiSelect class="w-full" v-model="selected" display="chip" :options="props.data"
                    optionLabel="nom_complet" :placeholder="'Select' + props.name" :maxSelectedLabels="3" unstyled :pt="{
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
                        wrapper:{class:'max-h-[200px] overflow-y-auto'},
                        item: { class: 'py-3 px-5 bg-white hover:bg-green-100 cursor-pointer flex items-center overflow-hidden' },
                        list: { class: 'py-3' },
                        headerCheckbox: { class: 'w-[22px] h-[22px] text-gray-400 rounded-[6px] flex items-center justify-center border border-2 ' }

                    }" />
                <div class="flex justify-around w-full">
                    <button @click="props.updateStatus(false)"
                        class="bg-red-500 transition-all duration-300 p-2 px-3 text-white rounded-2xl hover:bg-red-600">Annuler</button>
                    <button @click="onSubmit"
                        class="bg-green-500 transition-all duration-300 p-2 px-3 text-white rounded-2xl hover:bg-green-600 ">Sauvegarder</button>
                </div>
            </div>
        </div>
    </div>
</template>