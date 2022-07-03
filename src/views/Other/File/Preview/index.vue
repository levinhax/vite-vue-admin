<template>
  <div>
    <h1>{{ msg }} 页面</h1>
    <a-upload
      v-model:file-list="fileList"
      name="file"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :headers="uploadHeaders"
      :accept="uploadAccepts"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        文件上传
      </a-button>
    </a-upload>

    <ComPdfView :pdf-url="uploadFile" />
  </div>
</template>

<script setup lang="ts">
import { UploadOutlined } from '@ant-design/icons-vue'
// import type { UploadChangeParam } from 'ant-design-vue'
import ComPdfView from './component/pdfView.vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { readBuffer } from '@/utils/file'

const { proxy } = useCurrentInstance()

const msg = ref('文件在线预览')
const fileList = ref([])
const uploadFile = ref()
const uploadHeaders = reactive({
  authorization: 'authorization-text',
})
const uploadAccepts = ref('.pdf, .docx, .doc')

const beforeUpload = async (file: any) => {
  const arrayBuffer = await readBuffer(file)
  uploadFile.value = arrayBuffer
  fileList.value = []

  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    proxy.$message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 20
  if (!isLt2M) {
    proxy.$message.error('Image must smaller than 20MB!')
  }
  // return isJpgOrPng && isLt2M
  return false
}

// const handleChange = (info: UploadChangeParam) => {
const handleChange = (info: any) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList)
  }
  if (info.file.status === 'done') {
    proxy.$message.success(`${info.file.name} 上传成功`)
  } else if (info.file.status === 'error') {
    proxy.$message.error(`${info.file.name} 上传失败`)
  }
}
</script>

<style lang="less" scoped></style>
