<template>
  <div class="form-container">
    <el-card shadow="never">
      <template #header>
        <span class="card-title">注册表单</span>
      </template>

      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="140px"
        class="register-form"
      >
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱地址" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>

        <el-form-item label="Nickname" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入昵称" />
          <template #label>
            <span>
              Nickname
              <el-tooltip content="What do you want others to call you?" placement="top">
                <el-icon class="ml-5"><QuestionFilled /></el-icon>
              </el-tooltip>
            </span>
          </template>
        </el-form-item>

        <el-form-item label="Habitual Residence" prop="residence">
          <el-cascader
            v-model="formData.residence"
            :options="residenceOptions"
            :props="{ value: 'value', label: 'label', children: 'children' }"
            placeholder="请选择居住地"
            clearable
            filterable
          />
        </el-form-item>

        <el-form-item label="Phone Number" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号">
            <template #prepend>
              <el-select v-model="formData.prefix" style="width: 100px">
                <el-option label="+86" value="86" />
                <el-option label="+87" value="87" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="Donation" prop="donation">
          <el-input-number
            v-model="formData.donation"
            :min="0"
            :precision="2"
            placeholder="请输入捐赠金额"
            style="width: 100%"
          >
            <template #append>
              <el-select v-model="formData.suffix" style="width: 80px">
                <el-option label="$" value="USD" />
                <el-option label="¥" value="CNY" />
              </el-select>
            </template>
          </el-input-number>
        </el-form-item>

        <el-form-item label="Website" prop="website">
          <el-autocomplete
            v-model="formData.website"
            :fetch-suggestions="querySearch"
            placeholder="请输入网站"
            @select="handleSelect"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="Intro" prop="intro">
          <el-input
            v-model="formData.intro"
            type="textarea"
            :maxlength="100"
            show-word-limit
            placeholder="请输入简介"
            :rows="3"
          />
        </el-form-item>

        <el-form-item label="Gender" prop="gender">
          <el-select v-model="formData.gender" placeholder="请选择性别" style="width: 100%">
            <el-option label="Male" value="male" />
            <el-option label="Female" value="female" />
            <el-option label="Other" value="other" />
          </el-select>
        </el-form-item>

        <el-form-item label="Captcha">
          <template #label>
            <span>
              Captcha
              <el-tooltip content="We must make sure that your are a human." placement="top">
                <el-icon class="ml-5"><InfoFilled /></el-icon>
              </el-tooltip>
            </span>
          </template>
          <el-row :gutter="8">
            <el-col :span="12">
              <el-form-item prop="captcha">
                <el-input v-model="formData.captcha" placeholder="请输入验证码" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" @click="getCaptcha" :disabled="captchaCountdown > 0">
                {{ captchaCountdown > 0 ? `${captchaCountdown}s` : 'Get captcha' }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="agreement">
          <el-checkbox v-model="formData.agreement">
            I have read the <a href="javascript:;">agreement</a>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="loading">
            Register
          </el-button>
          <el-button @click="handleReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { QuestionFilled, InfoFilled } from '@element-plus/icons-vue'

const formRef = ref<FormInstance>()
const loading = ref(false)
const captchaCountdown = ref(0)

const residenceOptions = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]

const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  residence: [] as string[],
  phone: '',
  prefix: '86',
  donation: 0,
  suffix: 'CNY',
  website: '',
  intro: '',
  gender: '',
  captcha: '',
  agreement: false,
})

const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== formData.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const validateAgreement = (rule: any, value: boolean, callback: any) => {
  if (!value) {
    callback(new Error('请阅读并同意协议'))
  } else {
    callback()
  }
}

const formRules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度在 2 到 20 个字符', trigger: 'blur' },
  ],
  residence: [
    { type: 'array', required: true, message: '请选择居住地', trigger: 'change' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  donation: [
    { required: true, message: '请输入捐赠金额', trigger: 'blur' },
    { type: 'number', min: 0, message: '捐赠金额不能为负数', trigger: 'blur' },
  ],
  website: [
    { required: true, message: '请输入网站', trigger: 'blur' },
  ],
  intro: [
    { required: true, message: '请输入简介', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 4, message: '验证码为4位数字', trigger: 'blur' },
  ],
  agreement: [
    { validator: validateAgreement, trigger: 'change' },
  ],
}

const websites = [
  { value: 'google.com' },
  { value: 'github.com' },
  { value: 'stackoverflow.com' },
  { value: 'baidu.com' },
]

function querySearch(queryString: string, cb: any) {
  const results = queryString
    ? websites.filter((item) => item.value.toLowerCase().includes(queryString.toLowerCase()))
    : websites
  cb(results)
}

function handleSelect(item: any) {
  console.log('select:', item)
}

function getCaptcha() {
  if (!formData.phone) {
    ElMessage.warning('请先输入手机号')
    return
  }

  ElMessage.success('获取验证码成功！验证码为：1234')
  captchaCountdown.value = 60

  const timer = setInterval(() => {
    captchaCountdown.value--
    if (captchaCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

async function handleSubmit() {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        ElMessage.success('注册成功')
        console.log('表单数据:', formData)
      } finally {
        loading.value = false
      }
    }
  })
}

function handleReset() {
  formRef.value?.resetFields()
}
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  justify-content: center;

  .el-card {
    max-width: 800px;
    width: 100%;
  }

  .card-title {
    font-size: 16px;
    font-weight: 500;
  }

  .register-form {
    max-width: 600px;
    margin: 0 auto;
  }

  .ml-5 {
    margin-left: 5px;
  }
}
</style>
