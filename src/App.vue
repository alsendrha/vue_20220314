<template>
  <div>
    <button @click="handleMenu('home')">home</button>
    <button @click="handleMenu('login')">login</button>
    <button @click="handleMenu('join')">join</button>
    <button @click="handleMenu('mypage')">mypage</button>
    <hr />

    <router-view></router-view>

  </div>
</template>

<script>
import {useRouter} from 'vue-router';

export default {
  setup () {
    const router = new useRouter();
    const handleMenu = (menu) => {
      console.log('App.vue => handleMenu =>', menu)
      router.push(menu);

    }
    
    return {handleMenu}
  }
}
</script>

<style lang="scss" scoped>

</style>