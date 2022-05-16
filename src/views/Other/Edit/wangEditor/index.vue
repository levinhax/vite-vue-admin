<template>
  <div>
    <div style="border: 1px solid #ccc">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
      <Editor
        v-model="valueHtml"
        style="height: 500px; overflow-y: hidden"
        :default-config="editorConfig"
        :mode="mode"
        @on-created="handleCreated"
        @custom-paste="customPaste"
      />
    </div>
    <div style="margin-top: 16px">
      <textarea v-model="valueHtml" readonly style="width: 100%; height: 200px; outline: none"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const mode = ref('default') // 默认模式 - 集成了 wangEditor 所有功能，simple 简洁模式 - 仅有部分常见功能

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  console.log('editor created', editor)
  editorRef.value = editor // 记录 editor 实例，重要！
}

const customPaste = (editor: { insertText: (arg0: string) => void }, event: any, callback: (arg0: boolean) => void) => {
  console.log('ClipboardEvent 粘贴事件对象', event)
  // 自定义插入内容
  editor.insertText('xxx')
  // 返回值（注意，vue 事件的返回值，不能用 return）
  callback(false) // 返回 false ，阻止默认粘贴行为
  // callback(true) // 返回 true ，继续默认的粘贴行为
}
</script>

<style lang="less" scoped></style>
