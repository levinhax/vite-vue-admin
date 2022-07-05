<template>
  <div class="pdf-view">
    <!-- <div class="pdf-container"> -->
    <div
      class="pdf-container"
      :style="{
        width: state.pdfWidth,
        height: state.pdfHeight,
        border: '1px solid green',
      }"
    >
      <!-- <canvas id="pdfCanvas" ref="refPdfCanvas"></canvas> -->
      <!-- v-show="state.pdfPageNum === page" -->
      <canvas v-for="page in state.pdfPagesTotal" :id="`pdfCanvas${page}`" :key="page"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
// import pdfJs from 'pdfjs-dist'

import pdfFile from '../../../../../assets/file/前端新工具-Vite.pdf'

import * as pdfJs from 'pdfjs-dist/legacy/build/pdf'
// import * as pdfJsWorkerSrc from 'pdfjs-dist/legacy/build/pdf.worker.entry.js'
import pdfJsWorkerSrc from 'pdfjs-dist/legacy/build/pdf.worker.entry.js'
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
// 设置pdf.worker.js文件的引入地址
// pdfJs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/legacy/build/pdf.worker.entry.js')
pdfJs.GlobalWorkerOptions.workerSrc = pdfJsWorkerSrc

// defineProps<{ pdfUrl: string }>()

const props = defineProps({
  pdfUrl: {
    type: Object,
    required: false,
    default: null,
  },
})

const state = reactive({
  pdfDoc: '', // pdfjs 生成的对象
  pdfPageNum: 1, // 当前页数
  pdfPagesTotal: 0, // 总页数
  pdfWidth: '', // 宽度
  pdfHeight: '',
  pdfScale: 1, // 放大倍数
})

const renderPdf = (url: any) => {
  console.log('renderPdf url: ', url)
  // data是一个ArrayBuffer格式，也是一个buffer流的数据
  pdfJs.getDocument(url).promise.then(pdfDoc => {
    // console.log('pdfDoc: ', pdfDoc._pdfInfo.numPages)
    // pdfPages.value = pdfDoc._pdfInfo.numPages

    // state.pdfDoc = pdfDoc
    state.pdfPagesTotal = pdfDoc._pdfInfo.numPages

    nextTick(() => {
      renderPage(1, pdfDoc)
    })
  })
}

// 渲染pdf

const renderPage = async (num = 1, pdfDoc: PDFDocumentProxy) => {
  //渲染pdf页
  console.log('渲染pdf页: ', num)
  state.pdfPageNum = num
  const pdfPageRender = await pdfDoc.getPage(num)
  // let canvas: any = toRaw(refPdfCanvas.value)
  let canvas: any = document.getElementById('pdfCanvas' + num)
  if (canvas == null) return
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
  const viewport = pdfPageRender.getViewport({ scale: state.pdfScale * 1 })
  canvas.width = viewport.width * ratio
  canvas.height = viewport.height * ratio
  canvas.style.width = viewport.width + 'px'
  // canvas.style.height = viewport.height + 'px'
  // canvas.style.width = '100%'
  // canvas.style.height = '100%'
  console.log('canvas: ', canvas.width, canvas.height, canvas.style.width, canvas.style.height)
  state.pdfWidth = viewport.width + 20 + 'px'
  state.pdfHeight = viewport.height + 'px'
  // console.log('viewport: ', viewport)
  console.log('radio, dpr: ', ratio, dpr)

  // ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  // ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

  // 将 PDF 页面渲染到 canvas 上下文中
  const renderTask = pdfPageRender.render({
    canvasContext: ctx,
    viewport,
    transform: [ratio, 0, 0, ratio, 0, 0],
  })
  // if (state.pdfPagesTotal > num) {
  //   renderPage(num + 1, pdfDoc)
  // }
  return renderTask.promise
}

onMounted(() => {
  console.log('onMounted')
  renderPdf(pdfFile)
})

watch(props, (newValue, oldValue) => {
  console.log('watch 已触发', newValue)
  renderPdf(props.pdfUrl)
})
</script>

<style lang="less" scoped>
.pdf-view {
  height: 640px;
  background: #fff;
  display: flex;
  flex-direction: column;
  // overflow-y: scroll;

  .pdf-container {
    // width: 900px;
    // height: auto;
    // min-height: 100px;
    margin: 0 auto;

    // transform: scale(0.2, 1);

    overflow-y: scroll;
  }
}
</style>
