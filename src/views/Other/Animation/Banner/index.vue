<template>
  <div class="banner-wrapper">
    <div class="banner-content">
      <div class="banner-slide">
        <img :src="BannerImg1" alt="banner1" class="banner-img" />
        <img :src="BannerImg2" alt="banner2" class="banner-img" />
        <img :src="BannerImg3" alt="banner3" class="banner-img" />
        <img :src="BannerImg4" alt="banner4" class="banner-img" />
        <img :src="BannerImg5" alt="banner5" class="banner-img" />

        <img :src="BannerImg6" alt="banner-arrow-l" class="banner-arrow banner-arrow-l" @click="change(false)" />
        <img :src="BannerImg7" alt="banner-arrow-r" class="banner-arrow banner-arrow-r" @click="change(true)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BannerImg1 from '@/assets/images/banner1.jpg'
import BannerImg2 from '@/assets/images/banner2.jpg'
import BannerImg3 from '@/assets/images/banner3.jpg'
import BannerImg4 from '@/assets/images/banner4.jpg'
import BannerImg5 from '@/assets/images/banner5.jpg'
import BannerImg6 from '@/assets/images/banner6.png'
import BannerImg7 from '@/assets/images/banner7.png'

let json = [
  {
    width: 400,
    top: 20,
    left: 50,
    opacity: 60,
    zIndex: 2,
  },
  {
    width: 490,
    top: 70,
    left: 0,
    opacity: 88,
    zIndex: 3,
  },
  {
    width: 600,
    top: 100,
    left: 200,
    opacity: 100,
    zIndex: 4,
  },
  {
    width: 490,
    top: 70,
    left: 510,
    opacity: 80,
    zIndex: 3,
  },
  {
    width: 400,
    top: 20,
    left: 550,
    opacity: 88,
    zIndex: 2,
  },
]

let images: Array<any> = []
let throttle = true // 可设置节流

onMounted(() => {
  images = [...document.querySelectorAll('.banner-img')]
  json.forEach((attr, index) => {
    if (index < images.length) {
      animate(images[index], attr, () => {
        // console.log('轮播动画')
      })
    }
  })
})

// 获取元素原本的属性信息
const getStyle = (obj: HTMLElement, attr: string) => {
  // return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj, null)[attr] // 只有IE和Opera支持使用CurrentStyle
  return window.getComputedStyle(obj, null)[attr]
}

const animate = (
  obj: any,
  json: { [x: string]: number; width?: number; top?: number; left?: number; opacity?: number; zIndex?: number },
  fn: { (): void; (): void; (): any }
) => {
  clearInterval(obj.timer)
  // 开启一个定时器
  obj.timer = setInterval(() => {
    let flag = true
    for (let attr in json) {
      let current = 0
      // 获取元素属性的当前值, 没有则取0
      current =
        attr === 'opacity'
          ? Math.round(parseInt(String(getStyle(obj, attr) * 100))) || 0
          : parseInt(getStyle(obj, attr))
      // 计算一个 "叠加值", (目标值 - 当前值) / 10, 10不是固定, 可根据效果来调整, 就好比控制时间
      let step = (json[attr] - current) / 10
      // 大于零向上取整, 小于零向下取整
      step = step > 0 ? Math.ceil(step) : Math.floor(step)
      if (attr == 'opacity') {
        // 判断是否支持透明度属性
        if ('opacity' in obj.style) {
          obj.style.opacity = (current + step) / 100
        } else {
          obj.style.filter = 'alpha(opacity = ' + (current + step) * 10 + ')'
        }
      } else if (attr == 'zIndex') {
        obj.style.zIndex = json[attr]
      } else {
        obj.style[attr] = current + step + 'px' // 不断添加 "叠加值" 让当前值最终等于目标值
      }
      if (current != json[attr]) flag = false // 当前值等于目标值, 即可停止定时器
    }
    if (flag) {
      clearInterval(obj.timer)
      // 执行回调
      fn && fn()
    }
  }, 10)
}

// 切换
const changeBanner = (flag: boolean) => {
  if (flag) {
    json.push(json.shift())
  } else {
    json.unshift(json.pop())
  }
  // 重新调整样式
  json.forEach((attr, index) => {
    animate(images[index], attr, () => {
      // console.log('轮播动画')
    })
  })
}

const change = (flag: boolean) => {
  throttle && changeBanner(flag)
}
</script>

<style scoped>
.banner-wrapper {
  width: 100%;
  height: 600px;
  margin-top: 20px;
  user-select: none;
}

.banner-content {
  width: 1000px;
  margin: 0px auto;
}

.banner-slide {
  height: 500px;
  position: relative;
}

.banner-img {
  position: absolute;
  width: 100%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  border-radius: 2px;
}

.banner-arrow {
  width: 76px;
  height: 112px;
  position: absolute;
  bottom: 24px;
  z-index: 10;
  opacity: 0.6;
  transform: scale(1);
  transition: all 0.4s;
}
.banner-arrow:hover {
  opacity: 1;
  transform: scale(1.2);
}
.banner-arrow-l {
  left: 0;
}
.banner-arrow-r {
  right: 0;
}
</style>
