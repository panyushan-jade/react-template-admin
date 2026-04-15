<template>
  <el-container class="layout-container">
    <el-aside :width="sidebarWidth" class="layout-aside">
      <div class="logo">
        <img src="/favicon.ico" alt="logo" class="logo-img" />
        <span v-show="!collapsed" class="logo-text">vue-template-admin</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :collapse-transition="false"
        :unique-opened="true"
        router
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <template v-for="item in menuItems" :key="item.path">
          <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
            <template #title>
              <el-icon v-if="item.meta?.icon">
                <component :is="item.meta.icon" />
              </el-icon>
              <span>{{ item.meta?.title }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.path"
              :index="resolvePath(item.path, child.path)"
            >
              <el-icon v-if="child.meta?.icon">
                <component :is="child.meta.icon" />
              </el-icon>
              <span>{{ child.meta?.title }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="item.path">
            <el-icon v-if="item.meta?.icon">
              <component :is="item.meta.icon" />
            </el-icon>
            <template #title>
              <span>{{ item.meta?.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container class="layout-main">
      <el-header class="layout-header">
        <div class="header-left">
          <el-icon class="collapse-icon" @click="toggleSidebar">
            <component :is="collapsed ? 'Expand' : 'Fold'" />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
              {{ item.meta?.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-badge :value="12" class="item">
            <el-icon class="header-icon"><Bell /></el-icon>
          </el-badge>
          <div class="skin">
            <el-button type="primary" :circle="true">
              <el-icon><MagicStick /></el-icon>
            </el-button>
            <input
              type="color"
              class="skin-input"
              :value="primaryColor"
              @input="handleColorChange"
            />
          </div>
          <el-dropdown @command="handleCommand">
            <div class="user-info">
              <el-avatar :size="32" :src="userInfo?.avatar">
                <el-icon><User /></el-icon>
              </el-avatar>
              <span class="username">{{ userInfo?.username }}</span>
              <el-icon class="arrow-icon"><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item command="logout" divided>
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="layout-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive :include="keepAliveNames">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
      <el-footer class="layout-footer">
        vue-template-admin ©2024 Created by Vue3
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@store/user'
import { useGlobalStore } from '@store/global'
import { usePermissionStore } from '@store/permission'
import { debounce } from '@utils/func'
import { ElMessageBox, ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const globalStore = useGlobalStore()
const permissionStore = usePermissionStore()

const collapsed = computed(() => globalStore.sidebarCollapsed)
const primaryColor = computed(() => globalStore.primaryColor)
const userInfo = computed(() => userStore.userInfo)
const menuItems = computed(() => {
  const layoutRoute = permissionStore.routes.find((r) => r.path === '/')
  return layoutRoute?.children?.filter((r) => !r.meta?.hidden) || []
})

const sidebarWidth = computed(() => (collapsed.value ? '64px' : '210px'))

const activeMenu = computed(() => route.path)

const breadcrumbs = computed(() => {
  const matched = route.matched.filter((item) => item.meta?.title)
  return matched
})

const keepAliveNames = computed(() => {
  return permissionStore.routes
    .filter((route) => route.meta?.keepAlive)
    .map((route) => route.name as string)
})

function toggleSidebar() {
  globalStore.toggleSidebar()
}

const handleColorChange = debounce((event: Event) => {
  const target = event.target as HTMLInputElement
  globalStore.setPrimaryColor(target.value)
}, 300)

function resolvePath(parent: string, child: string): string {
  if (child.startsWith('/')) {
    return child
  }
  return `${parent}/${child}`.replace(/\/+/g, '/')
}

async function handleCommand(command: string) {
  switch (command) {
    case 'profile':
      router.push('/account/center')
      break
    case 'logout':
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await userStore.logoutAction()
        permissionStore.resetRoutes()
        router.push('/login')
        ElMessage.success('退出成功')
      } catch {
        // 用户取消
      }
      break
  }
}

watch(
  () => route.path,
  () => {
    document.title = route.meta?.title ? `${route.meta.title} - vue-template-admin` : 'vue-template-admin'
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
}

.layout-aside {
  background-color: #304156;
  transition: width 0.3s;
  overflow: hidden;

  .logo {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    background-color: #2b3a4a;

    .logo-img {
      width: 32px;
      height: 32px;
    }

    .logo-text {
      margin-left: 12px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}

.layout-main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .header-left {
    display: flex;
    align-items: center;

    .collapse-icon {
      font-size: 20px;
      cursor: pointer;
      margin-right: 16px;
      padding: 4px;
      border-radius: 4px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;

    .header-icon {
      font-size: 20px;
      cursor: pointer;
    }

    .skin {
      position: relative;
      width: 32px;
      height: 32px;

      .skin-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f5f7fa;
      }

      .username {
        margin: 0 8px;
        font-size: 14px;
      }

      .arrow-icon {
        font-size: 12px;
      }
    }
  }
}

.layout-content {
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
  overflow-y: auto;
}

.layout-footer {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #909399;
  font-size: 14px;
  border-top: 1px solid #ebeef5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
