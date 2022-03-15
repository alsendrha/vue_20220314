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
export default {
    setup () {
        const state = reactive({
            pw : '',
            pw1 : '',
            pw2 : '',

        });

        const handleUpdate = async() => {
            
        }
        

        return {state, handleUpdate}
    }
}
</script>

<style lang="scss" scoped>

</style>