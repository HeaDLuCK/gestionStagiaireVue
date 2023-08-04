<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { logOut } from './services/authService';
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

const router = useRouter()
const authenticated = ref(false);
const username = ref(localStorage.getItem('username'))
const logOutModel = ref(false)

const switchModelStatus = () => {
  logOutModel.value = !logOutModel.value
}

onBeforeMount(() => {
  authenticated.value = localStorage.getItem('token') != null ? true : false
})
const logoutFunction = () => {
  logOut()
  router.go()
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />

    <div class="wrapper">
      <nav>
        <RouterLink v-if="authenticated" class="underline-animation" to="/">Tableau de board </RouterLink>
        <RouterLink v-if="authenticated" class="underline-animation" to="/stagiaire">Stagiaire</RouterLink>
        <RouterLink v-if="authenticated" class="underline-animation" to="/professeur">Professeur</RouterLink>
        <RouterLink v-if="authenticated" class="underline-animation" to="/matiere">Matiere</RouterLink>
        <RouterLink v-if="authenticated" class="underline-animation" to="/etablissement">Etablissement</RouterLink>
      </nav>
      <nav v-if="!authenticated">
        <RouterLink class="underline-animation" to="/login">login</RouterLink>
        <RouterLink class="underline-animation" to="/register">register</RouterLink>
      </nav>
      <nav class="font-medium text-md text-green-400 tracking-wide " v-else>
        <div class="flex flex-col cursor-pointer relative" @click="switchModelStatus()">
          <h2>{{ username }}</h2>
          <div v-if="logOutModel"
            class="border-2 border-green-500  rounded-md  h-10 py-2 shadow-lg   absolute top-6 w-[90px]">
            <div class="absolute arrow -top-1.5"></div>
            <button class="hover:bg-green-500 w-full hover:text-white px-2" @click="logoutFunction">LOG OUT</button>
          </div>
        </div>
      </nav>
    </div>

  </header>

  <RouterView @click="switchModelStatus()" />
</template>

<style scoped>
.arrow {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;

  border-bottom: 5px solid rgb(34 197 94 / var(--tw-border-opacity));
}

header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 5px 10px;
}

.wrapper {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

img.logo {
  width: 55px;
}

.wrapper>nav {
  display: flex;
  gap: 20px;
}
</style>
