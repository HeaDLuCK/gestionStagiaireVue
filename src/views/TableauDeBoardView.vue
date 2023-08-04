<script setup>
import { use } from 'echarts/core'
import { BarChart, PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import {
    TitleComponent,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    VisualMapComponent
} from "echarts/components";
import VChart from "vue-echarts";
import { onBeforeMount, ref } from 'vue';
import { barChartData, pieChartData } from '../services/chartService.js'

const matiere = ref([])
const TotalProf = ref([])
const pieData = ref([])

onBeforeMount(() => {
    barChartData().then((promise) => {
        matiere.value = promise.data.data.map(elem => elem[0])
        TotalProf.value = promise.data.data.map(elem => elem[1])
    }).catch((e) => { console.log(e); })
})

onBeforeMount(() => {
    pieChartData().then((promise) => {
        pieData.value = promise.data.data.map(elem => { return { value: elem[1], name: elem[0] } })
    }).catch((e) => { console.log(e) })
})


use([
    VisualMapComponent,
    BarChart,
    PieChart,
    CanvasRenderer,
    TitleComponent,
    GridComponent,
    TooltipComponent,
    LegendComponent
])
const barOptions = ref({
    title: {
        text: 'les nombre de profs par matière',
        left: 'center',
    },
    xAxis: {
        type: 'category',
        data: matiere,
    },
    yAxis: {
        type: 'value'

    },
    series: [
        {
            data: TotalProf,
            type: 'bar',
            itemStyle: {
                color: '#22c55e',
                borderRadius: 5,
            }
        }
    ],

})

const PieOptions = ref(
    {
        title: {
            text: 'la repartition nombre d\'élèves par prof',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        visualMap: {
            show: false,
            min: 0,
            max: 10,
            inRange: {
                colorLightness: [0.1, 0.8]
            }
        },
        series: [
            {
                name: 'Traffic Sources',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: pieData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                itemStyle: {
                    color: '#a4fcc2',
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
            },
        ],
    })


</script>

<template>
    <div class="w-full py-4 mt-4 ">
        <div v-if="pieData.length > 0">
            <v-chart class="chart" :option="PieOptions" autoresize />
            <v-chart class="chart" :option="barOptions" autoresize />
        </div>
        <h2 v-else class="text-2xl font-bold text-center mt-4"> NO DATA</h2>


    </div>
</template>

<style scoped>
.chart {
    height: 50vh;
}
</style>