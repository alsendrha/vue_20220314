<template>
    <div>
        <h3>정보수정</h3>
        <el-card>
            <div v-if="state.item">
                <el-form :inline="true"  >
                    <el-form-item  label="이름" label-width="80px">
                        <el-input  size="mini" v-model="state.item.name" placeholder="이름" />
                    </el-form-item>
                </el-form>
                <el-form :inline="true"  >
                    <el-form-item  label="나이" label-width="80px" style="margin-top:-20px">
                        <el-input  size="mini" type="number" v-model="state.item.age"  placeholder="나이" />
                    </el-form-item>
                </el-form>
                <el-button type="primary" style="margin-left:80px" size="mini" round @click="handleUpdate" >수정하기</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import axios from 'axios'
export default {
    setup () {
        const state = reactive({
            token : sessionStorage.getItem("TOKEN")
        })

        const handleData = async() => {
            const url = `/member/selectone`;
            const headers = {"Content-type":"application/json", "auth":state.token}
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status ===200){
                state.item = response.data.result;
            }
        }

        onMounted( async() => {
            handleData();
        });

        const handleUpdate = async() => {
            const url = `/member/update`;
            const headers = {"Content-Type":"application/json", "auth":state.token};
            const body = {
                name : state.item.name,
                age : state.item.age
            }
            const response = await axios.put(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('수정되었습니다.');
                handleData();
            }
        }
        

        return {state, handleUpdate}
    }
}
</script>

<style lang="scss" scoped>

</style>