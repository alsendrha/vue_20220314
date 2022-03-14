<template>
    <div>
        <el-card>
            <h3>회원가입</h3>
            <!-- 아이디 : <input type="text" v-model="state.userid" @keyup="handleCheck" placeholder="아이디" />
            <label>{{state.idcheck}}</label> -->
            <el-form :inline="true"  >
                <el-form-item  label="아이디" label-width="80px">
                    <el-input  size="mini" ref="userid" v-model="state.userid" @keyup="handleCheck" placeholder="아이디" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" round >{{state.idcheck}}</el-button> 
                </el-form-item>
            </el-form>
            <el-form :inline="true"  >
                <el-form-item  label="암호" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" ref="userpw" type="password" v-model="state.userpw" placeholder="암호" />
                </el-form-item>
            </el-form>
            <el-form :inline="true"  >
                <el-form-item  label="암호확인" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" ref="userpw1" type="password" v-model="state.userpw1" placeholder="암호확인" />
                </el-form-item>
            </el-form>
            <el-form :inline="true"  >
                <el-form-item  label="이름" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" ref="username" v-model="state.username" placeholder="이름" />
                </el-form-item>
            </el-form>
            <el-form :inline="true"  style="margin-top:-20px">
                <el-form-item label="이메일" label-width="80px">
                    <el-input ref="useremail" v-model="state.useremail" size="mini" placeholder="이메일" />
                </el-form-item>
                <el-form-item>@</el-form-item>
                <el-form-item>
                        <el-select ref="useremail2" v-model="state.useremail2" size="mini" clearable placeholder="Select">
                            <el-option  v-for="tmp in state.emailoption" :key="tmp" :label="tmp" :value="tmp">
                            </el-option>
                        </el-select>
                </el-form-item>
            </el-form>
            <el-form :inline="true"  >
                <el-form-item  label="나이" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" type="number" ref="userage" v-model="state.userage" placeholder="나이" />
                </el-form-item>
            </el-form>
            
            <el-button type="primary" style="margin-left:80px" size="mini" round @click="handleJoin" >회원가입</el-button> 
            <el-button type="primary" size="mini" round @click="handleHome">돌아가기</el-button> 
        </el-card>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import {useRouter} from 'vue-router';
import axios from 'axios';
export default {
    setup () {

        const router = new useRouter;

        const state = reactive({
            userid : '',
            idcheck : '중복확인',
            userpw : '',
            userpw1 : '',
            username : '',
            useremail : '',
            useremail2 : '',
            userage : '',
            emailoption : ['naver.com','gmail.com', 'daum.net']
        });

        const handleHome = () => {
            router.push({name : 'Home'});
        }

        const handleCheck = async() => {
            if(state.userid.length > 0){
                const url = `/member/idcheck?id=${state.userid}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    if(response.data.result === 1){
                        state.idcheck = '사용불가';
                    }
                    else if(response.data.result === 0){
                        state.idcheck = '사용가능';
                    }
                }
            }
            else{
                state.idcheck = '중복확인';
            }
        }
        const userid = ref(null);
        const userpw = ref(null);
        const userpw1 = ref(null);
        const username = ref(null);
        const useremail = ref(null);
        const useremail2 = ref(null);
        const userage = ref(null);

        const handleJoin = async() => {
            // 유효성검사 통과 후
            if(state.userid.length <= 0){
                alert('아이디 입력하세요.')
                userid.value.focus();
                return false;
            }
            if(state.userpw.length <= 0){
                alert('암호를 입력하세요.');
                userpw.value.focus();
                return false;
            }
            if(state.userpw1.length <= 0){
                alert('암호확인을 입력하세요.');
                userpw1.value.focus();
                return false;
            }

            if(state.userpw1 !== state.userpw ){
                alert('암호가 일치하지않습니다.');
                userpw1.value.focus();
                return false;
            }

            if(state.username.length <= 0){
                alert('이름을 입력하세요.');
                username.value.focus();
                return false;
            }
            if(state.useremail.length <= 0){
                alert('이메일을 입력하세요.');
                useremail.value.focus();
                return false;
            }
            if(state.useremail2.length <= 0){
                alert('이메일을 입력하세요.');
                useremail2.value.focus();
                return false;
            }
            if(state.userage.length <= 0){
                alert('나이를 입력하세요.');
                userage.value.focus();
                return false;
            }


            const url = `/member/insert`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : state.userid,
                pw : state.userpw,
                name : state.username,
                email : state.useremail + "@" + state.useremail2,
                age : Number(state.userage)
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('가입되었습니다.');
                router.push({name : 'Home'});
            }

        }

        return {state, userid, userpw, userpw1, username, useremail, useremail2, userage,  handleHome, handleCheck, handleJoin}
    }
}
</script>

<style lang="scss" scoped>

</style>