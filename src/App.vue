<template>
  <div>
    <button @click="handleMenu('home')">home</button>
    <button v-if="!logged" @click="handleMenu('login')">login</button>
    <button v-if="!logged" @click="handleMenu('Logout')">logout</button>
    <button v-if="logged === false" @click="handleMenu('join')">join</button>
    <button v-if="logged === true" @click="handleMenu('mypage')">mypage</button>
    <hr />

    <router-view></router-view>

  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

export default {
  setup () {
    const router = new useRouter();
    const store = useStore();

    // stores의 getters 호출
    const logged = computed(() => store.getters.getLogged )

    const handleMenu = (menu) => {
      console.log('App.vue => handleMenu =>', menu)
      router.push(menu);
    }
    /// 생명주기(f5, refresh 가 수행됨)
    onMounted(() =>{
      if(sessionStorage.getItem("TOKEN") !== null){
        store.commit('setLogged', true);
      }
      else {
        store.commit('setLogged', false);
      }
    });
    
    return {handleMenu, logged}
  }
}
</script>

<style lang="scss" scoped>

</style>