<template>
  <div class="login-container">
    <div class="login-left">
      <div class="login-activity">
        <h2 class="activity-title">活动标题，可配置图片</h2>
        <p class="activity-subtitle">活动介绍说明文字</p>
        <el-button type="primary" size="large" class="activity-button">
          去看看
        </el-button>
      </div>
    </div>
    <div class="login-right">
      <div class="login-form-wrapper">
        <div class="login-header">
          <h1 class="login-title">vue-template-admin</h1>
          <p class="login-subtitle">一个轻量级 Vue3 后台管理系统</p>
        </div>

        <el-tabs v-model="activeTab" class="login-tabs">
          <el-tab-pane label="账号密码登录" name="account">
            <el-form
              ref="accountFormRef"
              :model="accountForm"
              :rules="accountRules"
              class="login-form"
              @submit.prevent="handleAccountLogin"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="accountForm.username"
                  placeholder="用户名: admin or user"
                  size="large"
                  :prefix-icon="User"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="accountForm.password"
                  type="password"
                  placeholder="密码: 123456"
                  size="large"
                  :prefix-icon="Lock"
                  show-password
                  @keyup.enter="handleAccountLogin"
                />
              </el-form-item>
              <el-form-item>
                <div class="login-options">
                  <el-checkbox v-model="accountForm.autoLogin">自动登录</el-checkbox>
                  <a class="forgot-password">忘记密码</a>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="large"
                  :loading="loading"
                  class="login-button"
                  @click="handleAccountLogin"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="手机号登录" name="phone">
            <el-form
              ref="phoneFormRef"
              :model="phoneForm"
              :rules="phoneRules"
              class="login-form"
              @submit.prevent="handlePhoneLogin"
            >
              <el-form-item prop="mobile">
                <el-input
                  v-model="phoneForm.mobile"
                  placeholder="手机号"
                  size="large"
                  :prefix-icon="Phone"
                />
              </el-form-item>
              <el-form-item prop="captcha">
                <el-input
                  v-model="phoneForm.captcha"
                  placeholder="请输入验证码"
                  size="large"
                  :prefix-icon="Lock"
                >
                  <template #append>
                    <el-button
                      :disabled="countdown > 0"
                      @click="getCaptcha"
                      class="captcha-button"
                    >
                      {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <div class="login-options">
                  <el-checkbox v-model="phoneForm.autoLogin">自动登录</el-checkbox>
                  <a class="forgot-password">忘记密码</a>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="large"
                  :loading="loading"
                  class="login-button"
                  @click="handlePhoneLogin"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <div class="login-other">
          <el-divider plain>
            <span class="other-text">其他登录方式</span>
          </el-divider>
          <div class="other-icons">
            <el-tooltip content="支付宝登录">
              <div class="icon-item alipay">
                <el-icon :size="20"><Wallet /></el-icon>
              </div>
            </el-tooltip>
            <el-tooltip content="淘宝登录">
              <div class="icon-item taobao">
                <el-icon :size="20"><ShoppingCart /></el-icon>
              </div>
            </el-tooltip>
            <el-tooltip content="微博登录">
              <div class="icon-item weibo">
                <el-icon :size="20"><ChatDotRound /></el-icon>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { User, Lock, Phone, Wallet, ShoppingCart, ChatDotRound } from '@element-plus/icons-vue'
import { useUserStore } from '@store/user'
import * as yup from 'yup'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const activeTab = ref<'account' | 'phone'>('account')
const loading = ref(false)
const countdown = ref(0)

const accountFormRef = ref<FormInstance>()
const phoneFormRef = ref<FormInstance>()

const accountForm = reactive({
  username: '',
  password: '',
  autoLogin: false,
})

const phoneForm = reactive({
  mobile: '',
  captcha: '',
  autoLogin: false,
})

const accountRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
}

const phoneRules: FormRules = {
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '手机号格式错误', trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 4, message: '验证码为4位数字', trigger: 'blur' },
  ],
}

const yupAccountSchema = yup.object({
  username: yup.string().required('请输入用户名').min(2, '用户名至少2个字符').max(20, '用户名最多20个字符'),
  password: yup.string().required('请输入密码').min(6, '密码至少6个字符').max(20, '密码最多20个字符'),
})

const yupPhoneSchema = yup.object({
  mobile: yup.string().required('请输入手机号').matches(/^1\d{10}$/, '手机号格式错误'),
  captcha: yup.string().required('请输入验证码').length(4, '验证码为4位数字'),
})

const redirectPath = computed(() => {
  const query = route.query as { redirect?: string }
  return query.redirect || '/'
})

async function handleAccountLogin() {
  if (!accountFormRef.value) return

  try {
    await yupAccountSchema.validate(accountForm, { abortEarly: false })
  } catch (error: any) {
    const errors = error.inner?.map((e: any) => e.message) || [error.message]
    ElMessage.error(errors[0])
    return
  }

  await accountFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const result = await userStore.loginAction({
          username: accountForm.username,
          password: accountForm.password,
        })
        if (result.success) {
          ElMessage.success('登录成功')
          router.push(redirectPath.value)
        } else {
          ElMessage.error(result.message || '登录失败')
        }
      } catch (error: any) {
        ElMessage.error(error.message || '登录失败')
      } finally {
        loading.value = false
      }
    }
  })
}

async function handlePhoneLogin() {
  if (!phoneFormRef.value) return

  try {
    await yupPhoneSchema.validate(phoneForm, { abortEarly: false })
  } catch (error: any) {
    const errors = error.inner?.map((e: any) => e.message) || [error.message]
    ElMessage.error(errors[0])
    return
  }

  await phoneFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const result = await userStore.loginAction({
          mobile: phoneForm.mobile,
          captcha: phoneForm.captcha,
        })
        if (result.success) {
          ElMessage.success('登录成功')
          router.push(redirectPath.value)
        } else {
          ElMessage.error(result.message || '登录失败')
        }
      } catch (error: any) {
        ElMessage.error(error.message || '登录失败')
      } finally {
        loading.value = false
      }
    }
  })
}

function getCaptcha() {
  if (!phoneForm.mobile) {
    ElMessage.warning('请先输入手机号')
    return
  }

  if (!/^1\d{10}$/.test(phoneForm.mobile)) {
    ElMessage.warning('手机号格式错误')
    return
  }

  ElMessage.success('获取验证码成功！验证码为：1234')
  countdown.value = 60

  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;

  .login-activity {
    max-width: 500px;
    color: #fff;
    text-align: center;

    .activity-title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .activity-subtitle {
      font-size: 18px;
      opacity: 0.9;
      margin-bottom: 32px;
    }

    .activity-button {
      border-radius: 25px;
      padding: 12px 40px;
      font-size: 16px;
    }
  }
}

.login-right {
  width: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 40px;
}

.login-form-wrapper {
  width: 100%;
  max-width: 360px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  .login-title {
    font-size: 28px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 8px;
  }

  .login-subtitle {
    font-size: 14px;
    color: #909399;
  }
}

.login-tabs {
  :deep(.el-tabs__nav-wrap::after) {
    display: none;
  }

  :deep(.el-tabs__item) {
    font-size: 16px;
    font-weight: 500;
  }
}

.login-form {
  margin-top: 24px;

  .login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .forgot-password {
      color: #409eff;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .login-button {
    width: 100%;
    border-radius: 6px;
  }
}

.captcha-button {
  white-space: nowrap;
  border-left: none;
  border-radius: 0 4px 4px 0;
}

.login-other {
  margin-top: 32px;

  .other-text {
    color: #ccc;
    font-weight: normal;
    font-size: 14px;
  }

  .other-icons {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: 16px;

    .icon-item {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #d4d8dd;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.1);
      }

      &.alipay {
        color: #1677ff;
      }

      &.taobao {
        color: #ff6a10;
      }

      &.weibo {
        color: #333;
      }
    }
  }
}

@media (max-width: 900px) {
  .login-left {
    display: none;
  }

  .login-right {
    width: 100%;
  }
}
</style>
