<template>
  <div class="detail-container">
    <el-card shadow="never" class="detail-card">
      <template #header>
        <span class="card-title">退款申请</span>
      </template>
      <el-descriptions :column="4" border>
        <el-descriptions-item label="取货单号">1000000000</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag type="success" effect="dark">已取货</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="销售单号">1234123421</el-descriptions-item>
        <el-descriptions-item label="子订单">3214321432</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never" class="detail-card mt-20">
      <template #header>
        <span class="card-title">用户信息</span>
      </template>
      <el-descriptions :column="4" border>
        <el-descriptions-item label="用户姓名">付小小</el-descriptions-item>
        <el-descriptions-item label="联系电话">18100000000</el-descriptions-item>
        <el-descriptions-item label="常用快递">菜鸟仓储</el-descriptions-item>
        <el-descriptions-item label="取货地址">浙江省杭州市西湖区万塘路18号</el-descriptions-item>
        <el-descriptions-item label="备注" :span="4">无</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never" class="detail-card mt-20">
      <template #header>
        <div class="card-header">
          <span class="card-title">商品信息</span>
          <el-button type="primary" size="small">添加商品</el-button>
        </div>
      </template>
      <el-table :data="productData" stripe border>
        <el-table-column prop="id" label="商品编号" width="150" align="center" />
        <el-table-column prop="name" label="商品名称" min-width="200" />
        <el-table-column prop="price" label="单价" width="120" align="center">
          <template #default="{ row }">
            ¥{{ row.price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="100" align="center" />
        <el-table-column prop="total" label="小计" width="120" align="center">
          <template #default="{ row }">
            ¥{{ (row.price * row.quantity).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '正常' ? 'success' : 'danger'" effect="dark">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card shadow="never" class="detail-card mt-20">
      <template #header>
        <span class="card-title">操作记录</span>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
          placement="top"
        >
          <el-card shadow="never">
            <h4>{{ activity.title }}</h4>
            <p>{{ activity.description }}</p>
            <el-tag v-if="activity.tag" :type="activity.tagType" size="small">
              {{ activity.tag }}
            </el-tag>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Product {
  id: string
  name: string
  price: number
  quantity: number
  status: string
}

interface Activity {
  timestamp: string
  title: string
  description: string
  tag?: string
  tagType?: 'success' | 'warning' | 'danger' | 'info'
}

const productData = ref<Product[]>([
  {
    id: 'SP001',
    name: 'MacBook Pro 14寸',
    price: 14999,
    quantity: 1,
    status: '正常',
  },
  {
    id: 'SP002',
    name: 'Magic Mouse 2',
    price: 699,
    quantity: 2,
    status: '正常',
  },
  {
    id: 'SP003',
    name: 'Magic Keyboard',
    price: 999,
    quantity: 1,
    status: '缺货',
  },
])

const activities = ref<Activity[]>([
  {
    timestamp: '2024-01-15 14:30:00',
    title: '退款申请已提交',
    description: '用户提交了退款申请，等待审核',
    tag: '待处理',
    tagType: 'warning',
  },
  {
    timestamp: '2024-01-15 15:00:00',
    title: '客服已审核',
    description: '客服人员已审核通过退款申请',
    tag: '已通过',
    tagType: 'success',
  },
  {
    timestamp: '2024-01-15 16:00:00',
    title: '商品已取货',
    description: '快递员已上门取货，商品正在返回仓库',
    tag: '处理中',
    tagType: 'info',
  },
  {
    timestamp: '2024-01-16 10:00:00',
    title: '退款已完成',
    description: '商品已入库，退款已原路返回',
    tag: '已完成',
    tagType: 'success',
  },
])
</script>

<style lang="scss" scoped>
.detail-container {
  .detail-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-title {
      font-size: 16px;
      font-weight: 500;
    }
  }

  .mt-20 {
    margin-top: 20px;
  }

  :deep(.el-timeline-item__timestamp) {
    color: #909399;
  }

  :deep(.el-timeline-item__tail) {
    border-left: 2px solid #e4e7ed;
  }

  :deep(.el-timeline-item__node--normal) {
    background-color: #409eff;
  }
}
</style>
