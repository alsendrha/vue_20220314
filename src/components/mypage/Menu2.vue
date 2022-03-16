<template>
    <div>
        <h3>암호변경</h3>
        <el-card>
            <el-form :inline="true"  >
                <el-form-item  label="기존암호" label-width="80px">
                    <el-input  size="mini" type="password" v-model="state.pw" placeholder="기존암호" />
                </el-form-item>
            </el-form>
            <el-form :inline="true"  >
                <el-form-item  label="새암호" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" type="password" v-model="state.pw1"  placeholder="새암호" />
                </el-form-item>
            </el-form>
            <el-form :inline="true"  >
                <el-form-item  label="암호확인" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" type="password" v-model="state.pw2"  placeholder="암호확인" />
                </el-form-item>
            </el-form>
            <el-button type="primary" style="margin-left:80px" size="mini" round @click="handleUpdate" >수정하기</el-button>
        </el-card>
    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios';
export default {
    setup () {
        const state = reactive({
            token : sessionStorage.getItem("TOKEN")

        });

        const handleUpdate = async() => {
            const url = `/member/updatepw`;
            const headers = {"Content=Type":"application/json", "auth":state.token};
            const body = {
                pw : state.pw,
                pw1 : state.pw1
            }
            const response = await axios.put(url, body, {headers});
            console.log(response.data);
            if(response.data.status===200){
                alert('수정되었습니다.');
            }
        }

        // onMounted(() => {
        //     handleData();
        // })

        // const handleData = async() => {
        //     const url = `/member/selectonepw`
        //     const headers = {"Content-Type":"application/json", "auth":state.token};

        // }
        

        return {state, handleUpdate}
    }
}
</script>

<style lang="scss" scoped>

</style>