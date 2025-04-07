<template>
    <div class="chart-example">
        <div class="page-header">
            <h1 class="page-title">图表示例</h1>
            <p class="page-desc">这是一个使用Echarts图表的示例</p>
        </div>

        <el-row :gutter="20" class="chart-row">
            <el-col :span="12">
                <el-card class="chart-card">
                    <template #header>
                        <div class="card-header">
                            <span>柱状图示例</span>
                            <el-switch v-model="barDarkMode" @change="updateBarChart" />
                        </div>
                    </template>
                    <div ref="barChartRef" class="chart-container"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="chart-card">
                    <template #header>
                        <div class="card-header">
                            <span>饼图示例</span>
                            <el-switch v-model="pieDarkMode" @change="updatePieChart" />
                        </div>
                    </template>
                    <div ref="pieChartRef" class="chart-container"></div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="chart-row">
            <el-col :span="24">
                <el-card class="chart-card">
                    <template #header>
                        <div class="card-header">
                            <span>折线图示例</span>
                            <el-switch v-model="lineDarkMode" @change="updateLineChart" />
                        </div>
                    </template>
                    <div ref="lineChartRef" class="chart-container line-chart"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { getTheme } from '../../utils/theme'

// 图表引用
const barChartRef = ref<HTMLElement>()
const pieChartRef = ref<HTMLElement>()
const lineChartRef = ref<HTMLElement>()

// 图表实例
let barChart: echarts.ECharts
let pieChart: echarts.ECharts
let lineChart: echarts.ECharts

// 深色模式状态
const barDarkMode = ref(getTheme() === 'dark')
const pieDarkMode = ref(getTheme() === 'dark')
const lineDarkMode = ref(getTheme() === 'dark')

// 颜色配置
const getColors = (isDark: boolean) => {
    return isDark
        ? ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4']
        : ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4']
}

// 创建柱状图
const initBarChart = () => {
    if (!barChartRef.value) return

    barChart = echarts.init(barChartRef.value)
    const colors = getColors(barDarkMode.value)

    const option = {
        title: {
            text: '月度销售数据',
            left: 'center',
            textStyle: {
                color: barDarkMode.value ? '#ddd' : '#333'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['2023年', '2024年'],
            bottom: 0,
            textStyle: {
                color: barDarkMode.value ? '#ddd' : '#333'
            }
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月'],
            axisLine: {
                lineStyle: {
                    color: barDarkMode.value ? '#555' : '#ccc'
                }
            },
            axisLabel: {
                color: barDarkMode.value ? '#ddd' : '#333'
            }
        },
        yAxis: {
            type: 'value',
            name: '销售额 (万元)',
            axisLine: {
                lineStyle: {
                    color: barDarkMode.value ? '#555' : '#ccc'
                }
            },
            axisLabel: {
                color: barDarkMode.value ? '#ddd' : '#333'
            },
            splitLine: {
                lineStyle: {
                    color: barDarkMode.value ? '#333' : '#eee'
                }
            }
        },
        series: [
            {
                name: '2023年',
                type: 'bar',
                data: [120, 132, 101, 134, 90, 230],
                itemStyle: {
                    color: colors[0]
                }
            },
            {
                name: '2024年',
                type: 'bar',
                data: [220, 182, 191, 234, 290, 330],
                itemStyle: {
                    color: colors[1]
                }
            }
        ],
        backgroundColor: barDarkMode.value ? 'transparent' : 'transparent'
    }

    barChart.setOption(option)
}

// 更新柱状图
const updateBarChart = () => {
    barChart.dispose()
    initBarChart()
}

// 创建饼图
const initPieChart = () => {
    if (!pieChartRef.value) return

    pieChart = echarts.init(pieChartRef.value)
    const colors = getColors(pieDarkMode.value)

    const option = {
        title: {
            text: '访问来源',
            left: 'center',
            textStyle: {
                color: pieDarkMode.value ? '#ddd' : '#333'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            bottom: 0,
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
            textStyle: {
                color: pieDarkMode.value ? '#ddd' : '#333'
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '40%'],
                data: [
                    { value: 335, name: '直接访问', itemStyle: { color: colors[0] } },
                    { value: 310, name: '邮件营销', itemStyle: { color: colors[1] } },
                    { value: 234, name: '联盟广告', itemStyle: { color: colors[2] } },
                    { value: 135, name: '视频广告', itemStyle: { color: colors[3] } },
                    { value: 1548, name: '搜索引擎', itemStyle: { color: colors[4] } }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    color: pieDarkMode.value ? '#ddd' : '#333'
                }
            }
        ],
        backgroundColor: pieDarkMode.value ? 'transparent' : 'transparent'
    }

    pieChart.setOption(option)
}

// 更新饼图
const updatePieChart = () => {
    pieChart.dispose()
    initPieChart()
}

// 创建折线图
const initLineChart = () => {
    if (!lineChartRef.value) return

    lineChart = echarts.init(lineChartRef.value)
    const colors = getColors(lineDarkMode.value)

    const option = {
        title: {
            text: '用户增长趋势',
            left: 'center',
            textStyle: {
                color: lineDarkMode.value ? '#ddd' : '#333'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['注册用户', '活跃用户', '付费用户'],
            bottom: 0,
            textStyle: {
                color: lineDarkMode.value ? '#ddd' : '#333'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine: {
                lineStyle: {
                    color: lineDarkMode.value ? '#555' : '#ccc'
                }
            },
            axisLabel: {
                color: lineDarkMode.value ? '#ddd' : '#333'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: lineDarkMode.value ? '#555' : '#ccc'
                }
            },
            axisLabel: {
                color: lineDarkMode.value ? '#ddd' : '#333'
            },
            splitLine: {
                lineStyle: {
                    color: lineDarkMode.value ? '#333' : '#eee'
                }
            }
        },
        series: [
            {
                name: '注册用户',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
                itemStyle: {
                    color: colors[0]
                }
            },
            {
                name: '活跃用户',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149],
                itemStyle: {
                    color: colors[1]
                }
            },
            {
                name: '付费用户',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410, 182, 191, 234, 290, 330],
                itemStyle: {
                    color: colors[2]
                }
            }
        ],
        backgroundColor: lineDarkMode.value ? 'transparent' : 'transparent'
    }

    lineChart.setOption(option)
}

// 更新折线图
const updateLineChart = () => {
    lineChart.dispose()
    initLineChart()
}

// 窗口大小变化时调整图表大小
const handleResize = () => {
    barChart && barChart.resize()
    pieChart && pieChart.resize()
    lineChart && lineChart.resize()
}

// 组件挂载后初始化图表
onMounted(() => {
    // 初始化图表
    initBarChart()
    initPieChart()
    initLineChart()

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)
})

// 组件卸载前销毁图表实例
onUnmounted(() => {
    barChart && barChart.dispose()
    pieChart && pieChart.dispose()
    lineChart && lineChart.dispose()

    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.chart-example {
    padding: 0 10px;
}

.page-header {
    margin-bottom: 20px;
}

.page-title {
    font-size: 24px;
    color: var(--el-text-color-primary);
    margin: 0 0 8px 0;
}

.page-desc {
    font-size: 14px;
    color: var(--el-text-color-regular);
    margin: 0;
}

.chart-row {
    margin-bottom: 20px;
}

.chart-card {
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
}

.chart-container {
    height: 300px;
    width: 100%;
}

.line-chart {
    height: 400px;
}
</style>