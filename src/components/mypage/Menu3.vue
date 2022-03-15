<template>
    <div>
        <h3>회원탈퇴</h3>
        <el-card>
            <el-form :inline="true"  >
                <el-form-item  label="암호" label-width="80px">
                    <el-input  size="mini" type="password" v-model="state.pw" placeholder="암호" />
                </el-form-item>
            </el-form>
            <el-button type="primary" style="margin-left:80px" size="mini" round @click="handleDelete" >탈퇴하기</el-button>
        </el-card>
    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router';
export default {
    setup () {
        const router = new useRouter;
        const state = reactive({
            token : sessionStorage.getItem("TOKEN")
        });

        const handleDelete = async() => {
            if(confirm('탈퇴할까요?')){
                const url = `/member/delete`;
                const headers = {"Content-Type":"application/json","auth":state.token};
                const response = await axios.delete(url, {headers, data:{}});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('탈퇴되었습니다.');
                    router.push({name:'Logout'});
                }
            }
        }
        

        return {state, handleDelete}
    }
}
</script>

<style lang="scss" scoped>

</style>