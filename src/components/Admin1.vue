<template>
    <div>
        <vue3-chart-js v-bind="barChart" ref="chartRef" ></vue3-chart-js>
    </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
import { onMounted, reactive, ref , getCurrentInstance} from '@vue/runtime-core';
import axios from 'axios';
export default {
    components:{
        Vue3ChartJs
    },
    setup () {
        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;
        console.log(socket);
       
        // 빈 ref변수를 생성(focus)
        const chartRef = ref(0);

        // 차트 설정
        const barChart = reactive({
            type : "bar",
            options : {
            },
            data : {
                labels : [],
                datasets : [
                    {
                        label : "전체개수", 
                        backgroundColor : [],
                        data : [],
                    },
                    {
                        label : "가격합계",
                        backgroundColor : [],
                        data : [],

                    },
                    {
                        label : "수량합계",
                        backgroundColor : [],
                        data : [],
                    }
                ],
            }
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
            const url = `/item/groupcode1`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            //[{},{},{},{},{},{}] => []
            if(response.data.status===200){
                // _id만 가져와서 보관하기 위함
                const arr1 = []; // ['101', '102', '111']

                // 전체개수를 보관하기 위해
                const arr2 = []; // [84, 24, 86]
                const arr2color = [];

                const arr3 = [];
                const arr3color = [];
                
                const arr4 = [];
                const arr4color = [];

                for(let tmp of response.data.result){//반복문
                    console.log(tmp);
                    arr1.push(tmp._id);

                    arr2.push(tmp.count);
                    arr2color.push('#DC143C');

                    arr3.push(tmp.pricetotal);
                    arr3color.push('#4682B4');

                    arr4.push(tmp.pricetotal);
                    arr4color.push('#32CD32');
                }
                console.log(arr1);
                barChart.data.labels = arr1;

                barChart.data.datasets[0].backgroundColor = arr2color;
                barChart.data.datasets[0].data = arr2;

                barChart.data.datasets[1].backgroundColor = arr3color;
                barChart.data.datasets[1].data = arr3;

                barChart.data.datasets[2].backgroundColor = arr4color;
                barChart.data.datasets[2].data = arr4;
                chartRef.value.update(200);
            }
        }

        return {barChart, chartRef}
    }
}
</script>

<style lang="scss" scoped>

</style>