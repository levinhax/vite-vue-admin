<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Activity name" v-bind="validateInfos.name">
      <a-input v-model:value="modelRef.name" />
    </a-form-item>

    <FormA ref="formARef" />

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
// import { defineComponent, reactive, toRaw } from 'vue'
import { Form } from 'ant-design-vue'
import FormA from './formA.vue'

const useForm = Form.useForm

const labelCol = reactive({ span: 4 })
const wrapperCol = reactive({ span: 14 })

const typeRefMap = reactive({
  1: 'form1',
  2: 'form2',
  3: 'form3',
  4: 'form4',
})
const formARef = ref(null)

const modelRef = reactive({
  name: '',
})
const rulesRef = reactive({
  name: [
    {
      required: true,
      message: 'Please input name',
    },
  ],
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args: any) => console.log(...args),
})

// const getFormData = () => {
//   return modelRef
// }

const onSubmit = () => {
  validate()
    .then(() => {
      console.log('typeRefMap: ', typeRefMap, typeRefMap[1])
      console.log(formARef.value)
      console.log(toRaw(modelRef))
    })
    .catch((err: any) => {
      console.log('error', err)
    })
}
</script>
