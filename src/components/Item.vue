<template>
    <div>
        <h3>물품관리</h3>
        <div>
            코드 : <input type="text" v-model="state.code" placeholder="000-000-000" /><br />
            이름 : <input type="text" v-model="state.name" placeholder="" /><br />
            가격 : <input type="text" v-model="state.price" placeholder="숫자만" /><br />
            수량 : <input type="text" v-model="state.quantity" placeholder="숫자만" /><br />
            <button @click="handleInsert">등록하기</button>
        </div>
        
        <hr />
        <table border="1">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>대분류</th>
                    <th>중분류</th>
                    <th>소문류</th>
                    <th>이름</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>등록일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.code1}}</td>
                    <td>{{tmp.code2}}</td>
                    <td>{{tmp.code3}}</td>
                    <td>{{tmp.name}}</td>
                    <td>{{tmp.price}}</td>
                    <td>{{tmp.quantity}}</td>
                    <td>{{tmp.regdate}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios';
export default {
    setup () {
        const state = reactive({
            code : '',
            name : '',
            price : 0,
            quantity : 0
        });

        onMounted(() => { // f5 최초 1번
            handleData();
        });

        const handleData = async() => {
            const url = `/item/select`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200){
                state.items = response.data.result;
            }
        }

        const handleInsert = async() => {
            const tmp = state.code.split("-");
            // 합치기 => tmp[0] + "-" + tmp[1] + "-" + tmp[2]
            console.log(tmp); // tmp[0],tmp[1],tmp[2] 
            const url = `/item/insert`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                code1 : tmp[0],
                code2 : tmp[1],
                code3 : tmp[2],
                name : state.name,
                price : state.price,
                quantity : state.quantity,
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('등록되었습니다');
                handleData();
            }
        }
        
        return {state, handleInsert}
    }
}
</script>

<style lang="scss" scoped>

</style>