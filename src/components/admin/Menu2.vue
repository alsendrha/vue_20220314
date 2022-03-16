<template>
    <div>
        <h3>중분류</h3>

        <table border="1">
            <thead >
                <tr>
                    <th>번호</th>
                    <th>중분류코드</th>
                    <th>전체개수</th>
                    <th>가격합계</th>
                    <th>수량합계</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(tmp, idx) in state.items" :key="tmp">
                <td>{{idx}}</td>
                <td>{{tmp._id}}</td>
                <td>{{tmp.count}}</td>
                <td>{{tmp.pricetotal}}</td>
                <td>{{tmp.quantitytotal}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { reactive, onMounted, getCurrentInstance } from '@vue/runtime-core'
import axios from 'axios';
export default {
    setup () {
        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;
        console.log(socket);

        const state = reactive({
     
        });
        
        onMounted(() => {
            handleData();
            socket.on('subscribe', (recv) => {
                console.log(recv);
                if(recv.username === 'insert'){
                    handleData();
                }
            });
        });

        const handleData = async() => {
            const url = `/item/groupcode2`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200){
                state.items = response.data.result;
            }

        }
        

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>