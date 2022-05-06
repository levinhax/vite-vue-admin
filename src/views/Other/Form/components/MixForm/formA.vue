<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Activity zone" v-bind="validateInfos.region">
      <a-select v-model:value="modelRef.region" placeholder="please select your zone">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
// import { defineComponent, reactive, toRaw } from 'vue'
import { Form } from 'ant-design-vue'

const useForm = Form.useForm

const labelCol = reactive({ span: 4 })
const wrapperCol = reactive({ span: 14 })

const modelRef = reactive({
  region: undefined,
})
const rulesRef = reactive({
  region: [
    {
      required: true,
      message: 'Please select region',
    },
  ],
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args: any) => console.log(...args),
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getFormData = () => {
  return modelRef
}

// const onSubmit = () => {
//   validate()
//     .then(() => {
//       console.log(toRaw(modelRef))
//     })
//     .catch((err: any) => {
//       console.log('error', err)
//     })
// }
</script>
