<script lang="ts" setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx'

const tableData = []

let data = ref(tableData)

const handleImport = () => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.click()
  input.onchange = async (e: Event) => {
    const file = e.target.files[0]
    if (file) {
      // const workbook = XLSX.readFile(file.name)

      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'binary' })
      // console.log(workbook)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      // console.log(worksheet)
      const arrayjson = XLSX.utils.sheet_to_json(worksheet)
      arrayjson.forEach(item => {
        // tableData.push({
        data.value.push({
          name: item['题干内容\n（必填）'],
          type: item['题型\n（必填）'],
          state: item['题目标签'],
          select: [item['选项 A\n（必填）'], item['选项 B\n（必填）'], item['选项 C'], item['选项 D']].join('|'),
          anwser: item['正确答案\n（必填）'],
        })
      })
      // data = ref(tableData)
    }
  }
}

const handleExport = () => {
  const workbook = XLSX.utils.table_to_book(document.getElementById('table'))
  XLSX.writeFileXLSX(workbook, '考试题库导出.xlsx')
}
const handleDelete = () => {
  data.value = []
}
const handleDownload = () => {
  const worksheet = {
    "!ref": "A2:E2",
    A1: { t: 'n', v: '题目' },
    A2: { t: 'n', v: '如需在工作票上增加安全措施，（ ）。' },
    B1: { t: 'n', v: '题目类型' },
    B2: { t: 'n', v: '单选题' },
    C1: { t: 'n', v: '难易程度' },
    C2: { t: 'n', v: '易' },
    D1: { t: 'n', v: '选项' },
    D2: { t: 'n', v: 'A.不得超过原工作票的工作项目|B.应征得工作票签发人和工作许可人同意|C.在工作票上增填安全措施|D.必须办理新的工作票' },
    E1: { t: 'n', v: '答案' },
    E2: { t: 'n', v: 'D' }
  }
  const workbook = XLSX.utils.book_new()
  workbook.SheetNames[0] = 'Sheet1'
  workbook.Sheets['Sheet1'] = worksheet
  XLSX.writeFileXLSX(workbook, '题库模板.xlsx')
}
</script>

<template>
  <div class="action-warpper">
    <button class="action" @click="handleImport">导入题库</button>
    <button class="action" @click="handleDownload">下载模板</button>
    <button class="action" @click="handleExport">导出题库</button>
    <button class="action" @click="handleDelete">删除</button>
  </div>
  <div class="table-header">
    <colgroup>
      <col width="80">
      <col width="80">
      <col width="80">
      <col width="80">
      <col width="80">
      <col width="80">
    </colgroup>
    <table border="1">
      <tr>
        <th>序号</th>
        <th>题目</th>
        <th>题目类型</th>
        <th>难易程度</th>
        <th>选项</th>
        <th>答案</th>
      </tr>
    </table>
  </div>
  <div class="tabel-body">
    <table id="table" border="1">
      <colgroup>
        <col width="80">
        <col width="80">
        <col width="80">
        <col width="80">
        <col width="80">
        <col width="80">
      </colgroup>
      <tr v-for="(item, index) in data" :key="index">
        <td align="center">{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td align="center">{{ item.type }}</td>
        <td align="center">{{ item.state }}</td>
        <td>{{ item.select }}</td>
        <td align="center">{{ item.anwser }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.action-warpper {
  margin-bottom: 20px;
}
button {
  margin-right: 10px;
  outline: none;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  width: 200px;
  padding: 5px 20px;
}
tr:nth-of-type(2n) {
  background-color: darkgrey;
}
.tabel-body {
  height: 75vh;
  overflow: auto;
  margin-right: -16px;
}
</style>