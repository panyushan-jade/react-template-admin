<template>
  <div class="dashboard-container">
    <div class="stat-cards">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="6" v-for="card in statCards" :key="card.title">
          <el-card class="stat-card" shadow="hover">
            <div class="stat-card-content">
              <div class="stat-info">
                <div class="stat-title">{{ card.title }}</div>
                <div class="stat-value">{{ card.value }}</div>
              </div>
              <div class="stat-icon" :style="{ backgroundColor: card.color }">
                <el-icon :size="28">
                  <component :is="card.icon" />
                </el-icon>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20" class="chart-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <span class="card-title">趋势图表</span>
          </template>
          <div ref="lineChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row">
      <el-col :xs="24" :md="12">
        <el-card shadow="hover">
          <template #header>
            <span class="card-title">销售统计</span>
          </template>
          <div ref="columnChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="12">
        <el-card shadow="hover">
          <template #header>
            <span class="card-title">分类占比</span>
          </template>
          <div ref="pieChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import * as echarts from 'echarts'
import { Wallet, UserFilled, DocumentChecked, View } from '@element-plus/icons-vue'

const lineChartRef = ref<HTMLElement>()
const columnChartRef = ref<HTMLElement>()
const pieChartRef = ref<HTMLElement>()

let lineChart: echarts.ECharts | null = null
let columnChart: echarts.ECharts | null = null
let pieChart: echarts.ECharts | null = null

const statCards = [
  {
    title: '支付金额',
    value: '¥ 2,176',
    icon: markRaw(Wallet),
    color: '#409eff',
  },
  {
    title: '访客数',
    value: '475',
    icon: markRaw(UserFilled),
    color: '#67c23a',
  },
  {
    title: '成功订单数',
    value: '87',
    icon: markRaw(DocumentChecked),
    color: '#e6a23c',
  },
  {
    title: '浏览量',
    value: '1,754',
    icon: markRaw(View),
    color: '#f56c6c',
  },
]

function initLineChart() {
  if (!lineChartRef.value) return

  lineChart = echarts.init(lineChartRef.value)

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
      },
    },
    color: ['#1979C9', '#D62A0D', '#FAA219'],
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth: true,
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
        smooth: true,
      },
      {
        name: '视频广告',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410],
        smooth: true,
      },
    ],
  }

  lineChart.setOption(option)
}

function initColumnChart() {
  if (!columnChartRef.value) return

  columnChart = echarts.init(columnChartRef.value)

  const data = [
    { type: '家具家电', sales: 38 },
    { type: '粮油副食', sales: 52 },
    { type: '生鲜水果', sales: 61 },
    { type: '美容洗护', sales: 145 },
    { type: '母婴用品', sales: 48 },
    { type: '进口食品', sales: 38 },
    { type: '食品饮料', sales: 38 },
    { type: '家庭清洁', sales: 38 },
  ]

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.type),
      axisLabel: {
        rotate: 30,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      name: '销售额',
    },
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: data.map((item) => item.sales),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' },
            ]),
          },
        },
      },
    ],
  }

  columnChart.setOption(option)
}

function initPieChart() {
  if (!pieChartRef.value) return

  pieChart = echarts.init(pieChartRef.value)

  const data = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: '其他', value: 5 },
  ]

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}: {d}%',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
        },
        data: data.map((item) => ({
          value: item.value,
          name: item.type,
        })),
      },
    ],
  }

  pieChart.setOption(option)
}

function handleResize() {
  lineChart?.resize()
  columnChart?.resize()
  pieChart?.resize()
}

onMounted(() => {
  initLineChart()
  initColumnChart()
  initPieChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  lineChart?.dispose()
  columnChart?.dispose()
  pieChart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 0;
}

.stat-cards {
  margin-bottom: 20px;
}

.stat-card {
  :deep(.el-card__body) {
    padding: 20px;
  }
}

.stat-card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-info {
  .stat-title {
    font-size: 14px;
    color: #909399;
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 28px;
    font-weight: bold;
    color: #303133;
  }
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.chart-row {
  margin-bottom: 20px;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.chart-container {
  width: 100%;
  height: 350px;
}
</style>
