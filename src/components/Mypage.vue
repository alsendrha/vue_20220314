<template>
    <div>
        <h3>마이페이지</h3>

        <button @click="state.menu=1">정보수정</button>
        <button @click="state.menu=2">암호변경</button>
        <button @click="state.menu=3">회원탈퇴</button>

        <hr />
        <menu-1 v-if="state.menu == 1"></menu-1>
        <menu-2 v-if="state.menu == 2"></menu-2>
        <menu-3 v-if="state.menu == 3"></menu-3>

    </div>
</template>

<script>
import { reactive } from 'vue';
import Menu1 from './mypage/Menu1.vue';
import Menu2 from './mypage/Menu2.vue';
import Menu3 from './mypage/Menu3.vue';
export default {
    components : {
        Menu1, Menu2, Menu3
    },
    setup () {
        const state = reactive({
            menu : 1,
        });
        

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>