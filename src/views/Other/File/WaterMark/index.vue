<template>
  <div ref="refBox" class="watermask-wrapper">
    <h1>{{ msg }} 页面</h1>
    <p>qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。</p>
    <p>
      qiankun
      孵化自蚂蚁金融科技基于微前端架构的云产品统一接入平台，在经过一批线上应用的充分检验及打磨后，我们将其微前端内核抽取出来并开源，希望能同时帮助社区有类似需求的系统更方便的构建自己的微前端系统，同时也希望通过社区的帮助将
      qiankun 打磨的更加成熟完善。
    </p>

    <img :src="Img3" alt="Img3" class="preview-img" />

    <h4>微前端架构具备以下几个核心价值：</h4>
    <p>技术栈无关: 主框架不限制接入应用的技术栈，微应用具备完全自主权</p>
    <p>独立开发、独立部署: 微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新</p>
    <p>
      增量升级:
      在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略
    </p>
    <p>独立运行时: 每个微应用之间状态隔离，运行时状态不共享</p>
  </div>
</template>

<script setup lang="ts">
import Img3 from '@/assets/images/banner3.jpg'

defineProps<{ propWatermaskStr?: string }>()

const msg = ref('水印')

const refBox = ref<Element>()

const initWatermark = (str: string) => {
  const canvas = document.createElement('canvas')
  canvas.width = 160
  canvas.height = 60
  let ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.rotate((-18 * Math.PI) / 180)
    ctx.font = '14px Vedana'
    ctx.fillStyle = 'rgba(200, 200, 200, .4)'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(str, 16, 40)
  }

  const div = document.createElement('div')
  div.style.pointerEvents = 'none'
  div.style.position = 'absolute'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.zIndex = '9999'
  div.style.width = '100%'
  div.style.height = '100%'
  div.style.background = `url(${canvas.toDataURL('image/png')}) left top repeat`
  // document.body.appendChild(div)
  refBox.value && refBox.value.appendChild(div)
}

onMounted(() => {
  initWatermark('20220615')
})
</script>

<style lang="less" scoped>
.watermask-wrapper {
  width: 100%;
  min-height: 640px;

  .preview-img {
    width: 560px;
  }
}
</style>
