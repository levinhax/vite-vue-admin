<template>
  <div class="pdf-view">
    <div class="pdf-container">
      <!-- <canvas id="pdfCanvas" ref="refPdfCanvas"></canvas> -->
      <canvas v-for="page in pdfPages" :id="'pdfCanvas' + page" :key="page"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
// import pdfJs from 'pdfjs-dist'

import pdfFile from '../../../../../assets/file/前端新工具-Vite.pdf'

import * as pdfJs from 'pdfjs-dist/legacy/build/pdf'
// import * as pdfJsWorkerSrc from 'pdfjs-dist/legacy/build/pdf.worker.entry.js'
import pdfJsWorkerSrc from 'pdfjs-dist/legacy/build/pdf.worker.entry.js'
// 设置pdf.worker.js文件的引入地址
// pdfJs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/legacy/build/pdf.worker.entry.js')
pdfJs.GlobalWorkerOptions.workerSrc = pdfJsWorkerSrc

// defineProps<{ pdfUrl: string }>()

const props = defineProps({
  pdfUrl: {
    type: Object,
    required: false,
  },
})

const refPdfCanvas = ref(null)
const loadingPdf = ref<boolean>(false)
const pdfUrl = ref<string>('') // pdf的base64
const pdfDoc = ref<any>(null) // pdfjs 生成的对象
const pdfPageNum = ref<number>(0) // 当前页数
const pdfPages = ref([])

// const renderPage = (num: number, pdfDoc: any) => {
//   pdfDoc.getPage(num).then(function (pdfPage: any) {
//     const viewport = pdfPage.getViewport(2.0)
//     let canvas: any = toRaw(refPdfCanvas.value)
//     const ctx = canvas.getContext('2d')
//     canvas.width = viewport.width
//     canvas.height = viewport.height

//     const renderTask = pdfPage.render({
//       canvasContext: ctx,
//       viewport,
//     })
//     return renderTask.promise
//   })
// }

const renderPdf = (url: any) => {
  console.log('renderPdf url: ', url)
  // data是一个ArrayBuffer格式，也是一个buffer流的数据
  pdfJs.getDocument(url).promise.then(pdfDoc => {
    console.log('pdfDoc: ', pdfDoc)
    return pdfDoc.getPage(1).then(function (pdfPage) {
      // Display page on the existing canvas with 100% scale.
      const viewport = pdfPage.getViewport({ scale: 2.0 })
      console.log('viewport: ', viewport)
      let canvas: any = toRaw(refPdfCanvas.value)
      if (canvas == null) return
      canvas.width = viewport.width
      canvas.height = viewport.height
      const ctx = canvas.getContext('2d')
      const renderTask = pdfPage.render({
        canvasContext: ctx,
        viewport,
      })
      return renderTask.promise
    })
  })
}

// 渲染pdf

const renderPage = async (num = 1) => {
  pdfPageNum.value = num
  //渲染pdf页
  console.log('渲染pdf页')
  const page = await pdfDoc.value.getPage(num)
  const canvas = document.getElementById('pdfCanvas' + num)
  // const canvas = document.getElementById("the_canvas");
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const bsr =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  const ratio = dpr / bsr
  const viewport = page.getViewport({ scale: this.pdf_scale })
  canvas.width = viewport.width * ratio
  canvas.height = viewport.height * ratio
  canvas.style.width = viewport.width + 'px'
  this.pdf_div_width = viewport.width + 'px'
  canvas.style.height = viewport.height + 'px'
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  const renderContext = {
    canvasContext: ctx,
    viewport: viewport,
  }
  page.render(renderContext)
  if (this.pdf_pages > num) {
    setTimeout(() => {
      return this.renderPage(num + 1)
    })
  }
}

const loadFile = async (url: any) => {
  //初始化pdf
  console.log('初始化pdf')
  console.log(url)
  pdfDoc.value = await pdfJs.getDocument(url).promise
  pdfPages.value = pdfDoc.value.numPages
  renderPage()
}

onMounted(() => {
  console.log('onMounted')
  renderPdf(pdfFile)
  //   pdfJs.getDocument(pdfFile).promise.then(pdfDoc => {
  //     for (var i = 1; i <= pdfDoc.numPages; i++) {
  //       renderPage(i, pdfDoc)
  //     }
  //   })
})

watch(props, (newValue, oldValue) => {
  console.log('watch 已触发', newValue)
  renderPdf(props.pdfUrl)
})
</script>

<style lang="less" scoped>
.pdf-view {
  background: #fff;
  display: flex;
  flex-direction: column;
}
</style>
