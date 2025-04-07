<template>
    <div class="form-example">
        <div class="page-header">
            <h1 class="page-title">表单示例</h1>
            <p class="page-desc">这是一个使用Element Plus表单组件的示例</p>
        </div>

        <el-card class="form-card">
            <template #header>
                <div class="card-header">
                    <span>用户信息表单</span>
                    <el-button type="primary" @click="resetForm(ruleFormRef)">重置表单</el-button>
                </div>
            </template>

            <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="120px" status-icon>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password />
                </el-form-item>

                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="formData.confirmPassword" type="password" placeholder="请再次输入密码" show-password />
                </el-form-item>

                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="formData.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        <el-radio :label="0">不便透露</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="年龄" prop="age">
                    <el-input-number v-model="formData.age" :min="1" :max="120" />
                </el-form-item>

                <el-form-item label="所在地区" prop="region">
                    <el-cascader v-model="formData.region" :options="regionOptions" placeholder="请选择地区" />
                </el-form-item>

                <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker v-model="formData.birthday" type="date" placeholder="选择出生日期" format="YYYY-MM-DD" />
                </el-form-item>

                <el-form-item label="职业" prop="occupation">
                    <el-select v-model="formData.occupation" placeholder="请选择职业">
                        <el-option label="程序员" value="programmer" />
                        <el-option label="设计师" value="designer" />
                        <el-option label="产品经理" value="pm" />
                        <el-option label="运营" value="operator" />
                        <el-option label="其他" value="other" />
                    </el-select>
                </el-form-item>

                <el-form-item label="兴趣爱好" prop="hobbies">
                    <el-checkbox-group v-model="formData.hobbies">
                        <el-checkbox label="阅读" />
                        <el-checkbox label="音乐" />
                        <el-checkbox label="电影" />
                        <el-checkbox label="运动" />
                        <el-checkbox label="旅行" />
                        <el-checkbox label="编程" />
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="技能评级" prop="skills">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="skill-item">
                                <span>HTML/CSS</span>
                                <el-slider v-model="formData.skills.htmlCss" :max="10" show-stops />
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="skill-item">
                                <span>JavaScript</span>
                                <el-slider v-model="formData.skills.javascript" :max="10" show-stops />
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="skill-item">
                                <span>Vue</span>
                                <el-slider v-model="formData.skills.vue" :max="10" show-stops />
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="skill-item">
                                <span>TypeScript</span>
                                <el-slider v-model="formData.skills.typescript" :max="10" show-stops />
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="简介" prop="introduction">
                    <el-input v-model="formData.introduction" type="textarea" :rows="4" placeholder="请简要介绍一下自己" />
                </el-form-item>

                <el-form-item label="接收通知" prop="notification">
                    <el-switch v-model="formData.notification" active-text="是" inactive-text="否" />
                </el-form-item>

                <el-form-item label="用户协议" prop="agreement">
                    <el-checkbox v-model="formData.agreement">
                        我已阅读并同意<el-link type="primary">《用户协议》</el-link>
                    </el-checkbox>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

// 表单引用
const ruleFormRef = ref<FormInstance>()

// 表单数据
const formData = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    gender: 1,
    age: 18,
    region: [],
    birthday: '',
    occupation: '',
    hobbies: [],
    skills: {
        htmlCss: 5,
        javascript: 5,
        vue: 5,
        typescript: 5
    },
    introduction: '',
    notification: true,
    agreement: false
})

// 校验规则
const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (formData.confirmPassword !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('confirmPassword', () => { })
        }
        callback()
    }
}

const validatePass2 = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== formData.password) {
        callback(new Error('两次输入密码不一致!'))
    } else {
        callback()
    }
}

// 验证规则
const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度应为3到20个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, validator: validatePass, trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, validator: validatePass2, trigger: 'blur' }
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'change' }
    ],
    age: [
        { required: true, message: '请输入年龄', trigger: 'blur' }
    ],
    region: [
        { required: true, message: '请选择地区', trigger: 'change' }
    ],
    birthday: [
        { required: true, message: '请选择出生日期', trigger: 'change' }
    ],
    occupation: [
        { required: true, message: '请选择职业', trigger: 'change' }
    ],
    hobbies: [
        { type: 'array', required: true, message: '请至少选择一个兴趣爱好', trigger: 'change' }
    ],
    introduction: [
        { required: true, message: '请填写个人简介', trigger: 'blur' },
        { min: 10, max: 200, message: '长度应为10到200个字符', trigger: 'blur' }
    ],
    agreement: [
        {
            validator: (_: any, value: boolean, callback: any) => {
                if (!value) {
                    callback(new Error('必须同意用户协议'))
                } else {
                    callback()
                }
            },
            trigger: 'change'
        }
    ]
})

// 省市区数据
const regionOptions = [
    {
        value: 'beijing',
        label: '北京市',
        children: [
            {
                value: 'beijing',
                label: '北京市',
                children: [
                    { value: 'chaoyang', label: '朝阳区' },
                    { value: 'haidian', label: '海淀区' },
                    { value: 'dongcheng', label: '东城区' },
                    { value: 'xicheng', label: '西城区' }
                ]
            }
        ]
    },
    {
        value: 'shanghai',
        label: '上海市',
        children: [
            {
                value: 'shanghai',
                label: '上海市',
                children: [
                    { value: 'pudong', label: '浦东新区' },
                    { value: 'huangpu', label: '黄浦区' },
                    { value: 'jingan', label: '静安区' },
                    { value: 'xuhui', label: '徐汇区' }
                ]
            }
        ]
    }
]

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate((valid, fields) => {
        if (valid) {
            ElMessage({
                message: '表单提交成功！',
                type: 'success'
            })
            console.log('表单数据: ', formData)
        } else {
            console.log('表单验证失败', fields)
            ElMessage({
                message: '表单验证失败，请检查输入',
                type: 'error'
            })
        }
    })
}

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    ElMessage({
        message: '表单已重置',
        type: 'info'
    })
}
</script>

<style scoped>
.form-example {
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

.form-card {
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
}

.skill-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.skill-item span {
    margin-bottom: 5px;
    font-size: 14px;
    color: var(--el-text-color-regular);
}
</style>