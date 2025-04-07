<template>
    <div class="table-example">
        <div class="page-header">
            <h1 class="page-title">表格示例</h1>
            <p class="page-desc">这是一个使用Element Plus表格组件的示例</p>
        </div>

        <el-card class="table-card">
            <div class="table-header">
                <div class="search-box">
                    <el-input v-model="searchKeyword" placeholder="请输入关键字搜索" clearable @clear="handleSearch"
                        @input="handleSearch">
                        <template #prefix>
                            <el-icon>
                                <Search />
                            </el-icon>
                        </template>
                    </el-input>
                </div>
                <div class="table-actions">
                    <el-button type="primary" @click="handleAdd">
                        <el-icon>
                            <Plus />
                        </el-icon>新增
                    </el-button>
                    <el-button type="danger" :disabled="!hasSelected" @click="handleBatchDelete">
                        <el-icon>
                            <Delete />
                        </el-icon>批量删除
                    </el-button>
                </div>
            </div>

            <el-table :data="filteredTableData" border stripe style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="id" label="ID" width="70" />
                <el-table-column prop="name" label="姓名" width="120" />
                <el-table-column prop="age" label="年龄" width="80" />
                <el-table-column prop="address" label="地址" />
                <el-table-column prop="date" label="日期" width="120" />
                <el-table-column prop="status" label="状态" width="100">
                    <template #default="scope">
                        <el-tag :type="getStatusType(scope.row.status)">
                            {{ getStatusText(scope.row.status) }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-container">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Delete } from '@element-plus/icons-vue'

// 数据类型定义
interface TableItem {
    id: number
    name: string
    age: number
    address: string
    date: string
    status: 0 | 1 | 2 // 0-待处理，1-已处理，2-已取消
}

// 模拟数据
const generateData = () => {
    const data: TableItem[] = []
    const statuses: [0, 1, 2] = [0, 1, 2]

    for (let i = 1; i <= 100; i++) {
        data.push({
            id: i,
            name: `用户${i}`,
            age: Math.floor(Math.random() * 50) + 18,
            address: `北京市朝阳区某某街道第${i}号`,
            date: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
            status: statuses[Math.floor(Math.random() * 3)] as 0 | 1 | 2
        })
    }

    return data
}

// 数据和分页
const allTableData = ref<TableItem[]>(generateData())
const searchKeyword = ref('')
const selectedRows = ref<TableItem[]>([])
const currentPage = ref(1)
const pageSize = ref(10)

// 计算属性：是否有选中项
const hasSelected = computed(() => selectedRows.value.length > 0)

// 计算属性：筛选后的表格数据
const filteredTableData = computed(() => {
    let data = [...allTableData.value]

    // 搜索过滤
    if (searchKeyword.value) {
        const keyword = searchKeyword.value.toLowerCase()
        data = data.filter(
            item =>
                item.name.toLowerCase().includes(keyword) ||
                item.address.toLowerCase().includes(keyword)
        )
    }

    // 分页
    const startIndex = (currentPage.value - 1) * pageSize.value
    return data.slice(startIndex, startIndex + pageSize.value)
})

// 计算总数
const totalCount = computed(() => {
    let data = [...allTableData.value]

    // 搜索过滤
    if (searchKeyword.value) {
        const keyword = searchKeyword.value.toLowerCase()
        data = data.filter(
            item =>
                item.name.toLowerCase().includes(keyword) ||
                item.address.toLowerCase().includes(keyword)
        )
    }

    return data.length
})

// 处理表格选择变化
const handleSelectionChange = (rows: TableItem[]) => {
    selectedRows.value = rows
}

// 处理搜索
const handleSearch = () => {
    currentPage.value = 1
}

// 处理分页大小变化
const handleSizeChange = (size: number) => {
    pageSize.value = size
    currentPage.value = 1
}

// 处理当前页变化
const handleCurrentChange = (page: number) => {
    currentPage.value = page
}

// 获取状态类型
const getStatusType = (status: number) => {
    switch (status) {
        case 0: return 'warning'
        case 1: return 'success'
        case 2: return 'info'
        default: return ''
    }
}

// 获取状态文本
const getStatusText = (status: number) => {
    switch (status) {
        case 0: return '待处理'
        case 1: return '已处理'
        case 2: return '已取消'
        default: return '未知'
    }
}

// 处理添加
const handleAdd = () => {
    ElMessage({
        type: 'success',
        message: '点击了添加按钮'
    })
}

// 处理编辑
const handleEdit = (row: TableItem) => {
    ElMessage({
        type: 'info',
        message: `正在编辑ID为 ${row.id} 的用户`
    })
}

// 处理删除
const handleDelete = (row: TableItem) => {
    ElMessageBox.confirm(
        `确定要删除 ${row.name} 吗？`,
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            allTableData.value = allTableData.value.filter(item => item.id !== row.id)
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消删除',
            })
        })
}

// 处理批量删除
const handleBatchDelete = () => {
    if (selectedRows.value.length === 0) return

    const selectedIds = selectedRows.value.map(item => item.id)
    const names = selectedRows.value.map(item => item.name).join('、')

    ElMessageBox.confirm(
        `确定要删除选中的 ${selectedRows.value.length} 项吗？包括: ${names}`,
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            allTableData.value = allTableData.value.filter(item => !selectedIds.includes(item.id))
            selectedRows.value = []
            ElMessage({
                type: 'success',
                message: '批量删除成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消删除',
            })
        })
}
</script>

<style scoped>
.table-example {
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

.table-card {
    margin-bottom: 20px;
}

.table-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.search-box {
    width: 300px;
}

.table-actions {
    display: flex;
    gap: 10px;
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>