<template>
  <el-config-provider :locale="zhCn" :theme="themeConfig">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <suspense>
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback>
            <div class="global-loading">
              <el-icon class="is-loading" size="40"><Loading /></el-icon>
            </div>
          </template>
        </suspense>
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useGlobalStore } from '@store/index'

const globalStore = useGlobalStore()

const themeConfig = computed(() => ({
  token: {
    colorPrimary: globalStore.primaryColor,
  },
}))
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.global-loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
