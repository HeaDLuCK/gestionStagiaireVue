<script setup>
import { reactive, ref } from 'vue'
import { login } from '../services/authService.js'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountOutline } from '@mdi/js';
import { mdiLockOutline } from '@mdi/js';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();
const data = reactive({})
const error = ref({})
const submitFunction = () => {
    login(data)
        .then(promise => {
            localStorage.setItem('token', promise.data.token)
            localStorage.setItem('username', promise.data.username)
            router.push({ path: '/' }).then(() => { router.go() })
        })
        .catch(e => {
            console.log(e.response.data);
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
    <div class="flex bg-green-500 w-[50vw]  m-auto shadow-md p-[2px] h-96">
        <div class="w-[65%] flex flex-col text-white items-center justify-start pt-14 px-5 gap-10">
            <h3 class="font-bold text-3xl ">Welcome to gestiS</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda debitis sunt quis, vero eligendi aperiam,
                illum iusto necessitatibus architecto tempore odit beatae iste accusamus! Quidem harum ad similique fuga
                adipisci.</p>
        </div>
        <div class="w-[35%] flex flex-col  items-center justify-start gap-4 bg-white p-1 pt-16">

            <h3 class="font-bold text-xl text-green-600">USER LOGIN</h3>
            <div class="flex items-center">
                <svg-icon type="mdi" :path="mdiAccountOutline" class="-mr-7 text-green-600" />
                <input type="text" v-model="data.login" placeholder="username"
                    class="border-2 border-green-300 bg-green-200 rounded-md py-1.5  pl-7 pr-3 focus:outline-none placeholder:italic placeholder:text-green-400">

            </div>
            <span class="text-red-500 text-xs self-start -mt-4">{{ error?.login }}</span>
            <div class="flex items-center">
                <svg-icon type="mdi" :path="mdiLockOutline" class="-mr-7 text-green-600" />
                <input type="password" v-model="data.mot_de_passe" placeholder="mot de passe"
                    class="border-2 border-green-300  bg-green-200 rounded-md py-1.5 pl-7 pr-3 focus:outline-none placeholder:italic placeholder:text-green-400">

            </div>
            <span class="text-red-500 text-xs self-start -mt-4">{{ error?.mot_de_passe }}</span>
            <button class="transition-all duration-300 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700"
                @click="submitFunction">LOGIN</button>


        </div>
    </div>
</template>

<style scoped></style>