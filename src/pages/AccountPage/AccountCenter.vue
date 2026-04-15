<template>
  <div class="account-center">
    <el-row :gutter="20">
      <el-col :xs="24" :md="8">
        <el-card shadow="never" class="user-card">
          <div class="user-info">
            <el-avatar :size="100" :src="userInfo.avatar">
              <el-icon :size="50"><User /></el-icon>
            </el-avatar>
            <h2 class="username">{{ userInfo.username }}</h2>
            <p class="user-motto">海纳百川，有容乃大</p>
          </div>
          <el-divider />
          <div class="user-stats">
            <el-row>
              <el-col :span="8" class="stat-item">
                <div class="stat-value">156</div>
                <div class="stat-label">文章</div>
              </el-col>
              <el-col :span="8" class="stat-item">
                <div class="stat-value">1.2k</div>
                <div class="stat-label">粉丝</div>
              </el-col>
              <el-col :span="8" class="stat-item">
                <div class="stat-value">890</div>
                <div class="stat-label">关注</div>
              </el-col>
            </el-row>
          </div>
          <el-divider />
          <div class="user-tags">
            <h4 class="tags-title">标签</h4>
            <div class="tags-list">
              <el-tag v-for="tag in tags" :key="tag" class="user-tag" effect="plain">
                {{ tag }}
              </el-tag>
            </div>
          </div>
          <el-divider />
          <div class="user-team">
            <h4 class="team-title">团队</h4>
            <div class="team-list">
              <div v-for="team in teams" :key="team.name" class="team-item">
                <el-avatar :size="32" :src="team.avatar">
                  <el-icon><OfficeBuilding /></el-icon>
                </el-avatar>
                <span class="team-name">{{ team.name }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="16">
        <el-card shadow="never">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="文章" name="articles">
              <div class="article-list">
                <div v-for="article in articles" :key="article.id" class="article-item">
                  <h3 class="article-title">{{ article.title }}</h3>
                  <p class="article-desc">{{ article.description }}</p>
                  <div class="article-meta">
                    <span class="meta-item">
                      <el-icon><Clock /></el-icon>
                      {{ article.createTime }}
                    </span>
                    <span class="meta-item">
                      <el-icon><View /></el-icon>
                      {{ article.views }}
                    </span>
                    <span class="meta-item">
                      <el-icon><ChatDotRound /></el-icon>
                      {{ article.comments }}
                    </span>
                    <span class="meta-item">
                      <el-icon><Star /></el-icon>
                      {{ article.likes }}
                    </span>
                  </div>
                </div>
                <el-pagination
                  v-model:current-page="articlePage"
                  :page-size="5"
                  :total="articles.length"
                  layout="prev, pager, next"
                  class="article-pagination"
                />
              </div>
            </el-tab-pane>

            <el-tab-pane label="应用" name="applications">
              <el-row :gutter="20">
                <el-col
                  v-for="app in applications"
                  :key="app.name"
                  :xs="12"
                  :sm="8"
                  :md="6"
                >
                  <el-card shadow="hover" class="app-card">
                    <div class="app-icon" :style="{ backgroundColor: app.color }">
                      <el-icon :size="28">
                        <component :is="app.icon" />
                      </el-icon>
                    </div>
                    <h4 class="app-name">{{ app.name }}</h4>
                    <p class="app-desc">{{ app.description }}</p>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>

            <el-tab-pane label="项目" name="projects">
              <el-row :gutter="20">
                <el-col v-for="project in projects" :key="project.name" :xs="24" :md="12">
                  <el-card shadow="hover" class="project-card">
                    <template #header>
                      <div class="project-header">
                        <el-avatar :size="40" :src="project.logo">
                          <el-icon><Folder /></el-icon>
                        </el-avatar>
                        <div class="project-info">
                          <h4 class="project-name">{{ project.name }}</h4>
                          <p class="project-owner">{{ project.owner }}</p>
                        </div>
                      </div>
                    </template>
                    <p class="project-desc">{{ project.description }}</p>
                    <div class="project-progress">
                      <div class="progress-info">
                        <span>进度</span>
                        <span>{{ project.progress }}%</span>
                      </div>
                      <el-progress :percentage="project.progress" :stroke-width="8" />
                    </div>
                    <div class="project-members">
                      <el-avatar-group>
                        <el-avatar v-for="member in project.members" :key="member" :size="24">
                          {{ member }}
                        </el-avatar>
                      </el-avatar-group>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import {
  User,
  OfficeBuilding,
  Clock,
  View,
  ChatDotRound,
  Star,
  DataLine,
  Monitor,
  Setting,
  Document,
  Folder,
} from '@element-plus/icons-vue'

const activeTab = ref('articles')
const articlePage = ref(1)

const userInfo = ref({
  username: 'vue-template-admin',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
})

const tags = ref(['很有想法', '专注设计', '大长腿', '川妹子', '海纳百川'])

const teams = ref([
  {
    name: 'Vue 核心团队',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  },
  {
    name: '前端开发组',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  },
  {
    name: '设计团队',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  },
])

const articles = ref([
  {
    id: 1,
    title: 'Vue 3.4 新特性解析',
    description: 'Vue 3.4 带来了许多令人兴奋的新特性，包括响应式系统的改进、性能优化等...',
    createTime: '2024-01-15',
    views: 1234,
    comments: 56,
    likes: 89,
  },
  {
    id: 2,
    title: 'TypeScript 5.0 最佳实践',
    description: '深入探讨 TypeScript 5.0 中的新特性，以及如何在项目中最佳实践...',
    createTime: '2024-01-10',
    views: 890,
    comments: 34,
    likes: 67,
  },
  {
    id: 3,
    title: 'Vite 5.0 构建优化指南',
    description: '如何使用 Vite 5.0 进行项目构建优化，提升开发体验和构建速度...',
    createTime: '2024-01-05',
    views: 2345,
    comments: 78,
    likes: 123,
  },
])

const applications = ref([
  {
    name: '数据看板',
    description: '实时数据监控',
    icon: markRaw(DataLine),
    color: '#409eff',
  },
  {
    name: '监控中心',
    description: '系统运行监控',
    icon: markRaw(Monitor),
    color: '#67c23a',
  },
  {
    name: '系统设置',
    description: '系统配置管理',
    icon: markRaw(Setting),
    color: '#e6a23c',
  },
  {
    name: '文档中心',
    description: '项目文档管理',
    icon: markRaw(Document),
    color: '#f56c6c',
  },
])

const projects = ref([
  {
    name: 'Vue Admin Template',
    owner: 'Vue 团队',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    description: '一个基于 Vue 3 + TypeScript + Element Plus 的后台管理系统模板',
    progress: 85,
    members: ['A', 'B', 'C', 'D'],
  },
  {
    name: 'Vite Plugin Collection',
    owner: 'Vite 团队',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    description: 'Vite 插件集合，包含各种实用的开发插件',
    progress: 60,
    members: ['E', 'F', 'G'],
  },
  {
    name: 'Element Plus Components',
    owner: 'Element Plus 团队',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    description: 'Element Plus 组件库的扩展组件集合',
    progress: 95,
    members: ['H', 'I', 'J', 'K', 'L'],
  },
  {
    name: 'Pinia Store Utils',
    owner: 'Pinia 团队',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    description: 'Pinia 状态管理的实用工具函数集合',
    progress: 40,
    members: ['M', 'N'],
  },
])
</script>

<style lang="scss" scoped>
.account-center {
  .user-card {
    .user-info {
      text-align: center;
      padding: 20px 0;

      .username {
        margin: 16px 0 8px;
        font-size: 20px;
        font-weight: 500;
        color: #303133;
      }

      .user-motto {
        color: #909399;
        font-size: 14px;
      }
    }

    .user-stats {
      .stat-item {
        text-align: center;

        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #303133;
        }

        .stat-label {
          font-size: 12px;
          color: #909399;
          margin-top: 4px;
        }
      }
    }

    .user-tags,
    .user-team {
      .tags-title,
      .team-title {
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        margin-bottom: 12px;
      }

      .tags-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .user-tag {
          margin: 0;
        }
      }

      .team-list {
        .team-item {
          display: flex;
          align-items: center;
          padding: 8px 0;

          .team-name {
            margin-left: 12px;
            font-size: 14px;
            color: #606266;
          }
        }
      }
    }
  }

  .article-list {
    .article-item {
      padding: 20px 0;
      border-bottom: 1px solid #ebeef5;

      &:last-child {
        border-bottom: none;
      }

      .article-title {
        font-size: 16px;
        font-weight: 500;
        color: #303133;
        margin-bottom: 8px;
        cursor: pointer;

        &:hover {
          color: #409eff;
        }
      }

      .article-desc {
        font-size: 14px;
        color: #909399;
        margin-bottom: 12px;
        line-height: 1.6;
      }

      .article-meta {
        display: flex;
        gap: 20px;
        font-size: 12px;
        color: #c0c4cc;

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    .article-pagination {
      margin-top: 20px;
      justify-content: flex-end;
    }
  }

  .app-card {
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-4px);
    }

    .app-icon {
      width: 56px;
      height: 56px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      color: #fff;
    }

    .app-name {
      font-size: 14px;
      font-weight: 500;
      color: #303133;
      margin-bottom: 4px;
    }

    .app-desc {
      font-size: 12px;
      color: #909399;
    }
  }

  .project-card {
    .project-header {
      display: flex;
      align-items: center;

      .project-info {
        margin-left: 12px;

        .project-name {
          font-size: 14px;
          font-weight: 500;
          color: #303133;
          margin-bottom: 2px;
        }

        .project-owner {
          font-size: 12px;
          color: #909399;
        }
      }
    }

    .project-desc {
      font-size: 13px;
      color: #606266;
      margin: 16px 0;
      line-height: 1.6;
    }

    .project-progress {
      margin-bottom: 16px;

      .progress-info {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #909399;
        margin-bottom: 8px;
      }
    }

    .project-members {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
