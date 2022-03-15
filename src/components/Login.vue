<template>
    <div>
        <h3>로그인</h3>
        아이디 : <input type="text" ref="userid" v-model="state.userid" /><br />
        암호 : <input type="password" ref="userpw" v-model="state.userpw" /><br />
        <button @click="handleLogin">로그인</button>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default {
    setup () {
        const router = new useRouter;
        const store = useStore();

        const state = reactive({
            userid : '',
            userpw : '',

        });

        const userid = ref(null);
        const userpw = ref(null);

        const handleLogin = async() => {
            if(state.userid.length <= 0){
                alert('아이디를 입력하세요.');
                userid.value.focus();
                return false;
            }

            if(state.userpw.length <= 0){
                alert('암호를 입력하세요.');
                userpw.value.focus();
                return false;
            }

            const url = `/member/select`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : state.userid,
                pw : state.userpw,
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                sessionStorage.setItem("TOKEN", response.data.result);
                alert('로그인 되었습니다.');
                store.commit('setLogged', true);
                router.push({name : 'Home'});
            }
        }
        

        return {state, userid, userpw, handleLogin}
    }
}
</script>

<style lang="scss" scoped>

</style>