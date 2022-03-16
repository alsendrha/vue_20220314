<template>
    <div>
        <h3>암호변경</h3>
        <el-card>
                <el-form :inline="true"  >
                    <el-form-item  label="기존암호" label-width="80px">
                        <el-input  size="mini" type="password" ref="pw" v-model="state.pw" placeholder="기존암호" />
                    </el-form-item>
                </el-form>
                <el-form :inline="true"  >
                    <el-form-item  label="새암호" label-width="80px" style="margin-top:-20px">
                        <el-input  size="mini" type="password" ref="newpw" v-model="state.newpw"  placeholder="새암호" />
                    </el-form-item>
                </el-form>
                <el-form :inline="true"  >
                    <el-form-item  label="암호확인" label-width="80px" style="margin-top:-20px">
                        <el-input  size="mini" type="password" ref="newpw1" v-model="state.newpw1"  placeholder="암호확인" />
                    </el-form-item>
                </el-form>
                <el-button type="primary" style="margin-left:80px" size="mini" round @click="handleUpdate" >수정하기</el-button>
        </el-card>
    </div>
</template>

<script>
import { reactive, ref} from 'vue'
import axios from 'axios';
export default {
    setup () {

        const state = reactive({
            pw : '',
            newpw : '',
            newpw1 : '',
            token : sessionStorage.getItem("TOKEN")

        });

        const pw = ref(null);
        const newpw = ref(null);
        const newpw1 = ref(null);

        const handleUpdate = async() => {
            if(state.pw.length <= 0){
                alert('암호를 입력하세요');
                pw.value.focus();
                return false;
            }

            if(state.newpw.length <= 0){
                alert('새암호를 입력하세요');
                newpw.value.focus();
                return false;
            }
            if(state.newpw1.length <= 0){
                alert('암호확인을 입력하세요');
                newpw1.value.focus();
                return false;
            }
            if(state.newpw1 !== state.newpw){
                alert('암호가 일치하지 않습니다.');
                newpw1.value.focus();
                return false;
            }

            const url = `/member/updatepw`;
            const headers = {"Content-Type":"application/json", "auth":state.token};
            const body = {
                pw : state.pw,
                newpw : state.newpw
            }
            const response = await axios.put(url, body, {headers});
            console.log(response.data);
            if(response.data.status===200){
                alert('수정되었습니다.');
                state.pw = '';
                state.newpw = '';
                state.newpw1 = '';
            }
        }



        return {state, pw, newpw, newpw1, handleUpdate}
    }
}
</script>

<style lang="scss" scoped>

</style>