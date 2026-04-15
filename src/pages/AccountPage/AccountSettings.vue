<template>
  <div class="account-settings">
    <el-card shadow="never">
      <el-tabs v-model="activeTab" tab-position="left" style="min-height: 500px">
        <el-tab-pane label="基本设置" name="basic">
          <el-form
            ref="basicFormRef"
            :model="basicForm"
            :rules="basicRules"
            label-width="100px"
            class="settings-form"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="basicForm.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="basicForm.nickname" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="个人简介" prop="bio">
              <el-input
                v-model="basicForm.bio"
                type="textarea"
                :rows="4"
                placeholder="请输入个人简介"
                :maxlength="200"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="国家/地区" prop="country">
              <el-select v-model="basicForm.country" placeholder="请选择国家/地区" style="width: 100%">
                <el-option label="中国" value="CN" />
                <el-option label="美国" value="US" />
                <el-option label="日本" value="JP" />
                <el-option label="韩国" value="KR" />
              </el-select>
            </el-form-item>
            <el-form-item label="所在省市" prop="region">
              <el-cascader
                v-model="basicForm.region"
                :options="regionOptions"
                :props="{ value: 'value', label: 'label', children: 'children' }"
                placeholder="请选择省市"
                clearable
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="basicForm.phone" placeholder="请输入联系电话" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleBasicSubmit" :loading="basicLoading">
                保存设置
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="安全设置" name="security">
          <div class="security-list">
            <div class="security-item">
              <div class="security-info">
                <h4 class="security-title">账户密码</h4>
                <p class="security-desc">当前密码强度：强</p>
              </div>
              <el-button type="primary" link @click="showPasswordDialog = true">
                修改
              </el-button>
            </div>
            <el-divider />
            <div class="security-item">
              <div class="security-info">
                <h4 class="security-title">绑定手机</h4>
                <p class="security-desc">已绑定手机：138****8293</p>
              </div>
              <el-button type="primary" link>
                修改
              </el-button>
            </div>
            <el-divider />
            <div class="security-item">
              <div class="security-info">
                <h4 class="security-title">绑定邮箱</h4>
                <p class="security-desc">已绑定邮箱：ant-design@alipay.com</p>
              </div>
              <el-button type="primary" link>
                修改
              </el-button>
            </div>
            <el-divider />
            <div class="security-item">
              <div class="security-info">
                <h4 class="security-title">MFA 设备</h4>
                <p class="security-desc">未绑定 MFA 设备，绑定后，可以进行二次确认</p>
              </div>
              <el-button type="primary" link>
                绑定
              </el-button>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="新消息通知" name="notification">
          <div class="notification-list">
            <div class="notification-item">
              <div class="notification-info">
                <h4 class="notification-title">账户密码</h4>
                <p class="notification-desc">其他用户的消息将以站内信的形式通知</p>
              </div>
              <el-switch v-model="notificationSettings.account" />
            </div>
            <el-divider />
            <div class="notification-item">
              <div class="notification-info">
                <h4 class="notification-title">系统消息</h4>
                <p class="notification-desc">系统消息将以站内信的形式通知</p>
              </div>
              <el-switch v-model="notificationSettings.system" />
            </div>
            <el-divider />
            <div class="notification-item">
              <div class="notification-info">
                <h4 class="notification-title">待办任务</h4>
                <p class="notification-desc">待办任务将以站内信的形式通知</p>
              </div>
              <el-switch v-model="notificationSettings.todo" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog v-model="showPasswordDialog" title="修改密码" width="500px">
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="100px"
      >
        <el-form-item label="当前密码" prop="oldPassword">
          <el-input
            v-model="passwordForm.oldPassword"
            type="password"
            placeholder="请输入当前密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="handlePasswordSubmit" :loading="passwordLoading">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

const activeTab = ref('basic')
const basicLoading = ref(false)
const passwordLoading = ref(false)
const showPasswordDialog = ref(false)

const basicFormRef = ref<FormInstance>()
const passwordFormRef = ref<FormInstance>()

const basicForm = reactive({
  email: 'admin@example.com',
  nickname: 'vue-template-admin',
  bio: '海纳百川，有容乃大',
  country: 'CN',
  region: ['zhejiang', 'hangzhou'],
  phone: '13800138000',
})

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const notificationSettings = reactive({
  account: true,
  system: false,
  todo: true,
})

const regionOptions = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
      },
      {
        value: 'ningbo',
        label: '宁波市',
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
      },
      {
        value: 'suzhou',
        label: '苏州市',
      },
    ],
  },
]

const basicRules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  phone: [
    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
}

const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入新密码'))
  } else if (value !== passwordForm.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const passwordRules: FormRules = {
  oldPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' },
  ],
}

async function handleBasicSubmit() {
  if (!basicFormRef.value) return

  await basicFormRef.value.validate(async (valid) => {
    if (valid) {
      basicLoading.value = true
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        ElMessage.success('保存成功')
      } finally {
        basicLoading.value = false
      }
    }
  })
}

async function handlePasswordSubmit() {
  if (!passwordFormRef.value) return

  await passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      passwordLoading.value = true
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        ElMessage.success('密码修改成功')
        showPasswordDialog.value = false
        passwordForm.oldPassword = ''
        passwordForm.newPassword = ''
        passwordForm.confirmPassword = ''
      } finally {
        passwordLoading.value = false
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.account-settings {
  .settings-form {
    max-width: 500px;
  }

  .security-list,
  .notification-list {
    max-width: 600px;

    .security-item,
    .notification-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;

      .security-info,
      .notification-info {
        .security-title,
        .notification-title {
          font-size: 14px;
          font-weight: 500;
          color: #303133;
          margin-bottom: 4px;
        }

        .security-desc,
        .notification-desc {
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }
}
</style>
