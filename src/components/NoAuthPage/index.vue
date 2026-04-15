<template>
  <div class="no-auth-page">
    <div class="no-auth-content">
      <el-icon class="no-auth-icon" :size="120">
        <Lock />
      </el-icon>
      <h1 class="no-auth-title">暂无权限</h1>
      <p class="no-auth-desc">抱歉，您没有权限访问此页面</p>
      <p class="no-auth-tip">请联系管理员获取相应权限</p>
      <div class="no-auth-actions">
        <el-button type="primary" @click="goHome">
          <el-icon><HomeFilled /></el-icon>
          返回首页
        </el-button>
        <el-button @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回上一页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Lock, HomeFilled, ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

function goHome() {
  router.push('/')
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.no-auth-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
}

.no-auth-content {
  text-align: center;
  color: #606266;

  .no-auth-icon {
    color: #e6a23c;
    margin-bottom: 20px;
  }

  .no-auth-title {
    font-size: 32px;
    font-weight: 500;
    margin: 0 0 10px;
    color: #303133;
  }

  .no-auth-desc {
    font-size: 16px;
    margin: 0 0 8px;
  }

  .no-auth-tip {
    font-size: 14px;
    color: #909399;
    margin: 0 0 40px;
  }

  .no-auth-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
}
</style>
