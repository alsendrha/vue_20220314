<template>
    <div>
        <h3>관리자페이지</h3>
        <hr />
        <button @click="state.menu = 1">대분류</button>
        <button @click="state.menu = 2">중분류</button>
        <button @click="state.menu = 3">소분류</button>

        <menu-1 v-if="state.menu == 1" ></menu-1>
        <menu-2 v-if="state.menu == 2" ></menu-2>
        <menu-3 v-if="state.menu == 3" ></menu-3>

        

    </div>
</template>

<script>
import { reactive } from 'vue';
import Menu1 from './admin/Menu1.vue';
import Menu2 from './admin/Menu2.vue';
import Menu3 from './admin/Menu3.vue';

export default {
    components : {
        Menu1, Menu2, Menu3
    },
    setup () {
        const state = reactive({
            menu : 1
        });
        
        

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>