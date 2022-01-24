<template>
  <svg aria-hidden="true" class="svg-icon" :class="calsses">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
  size: {
    type: String,
    default: 'default',
  },
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const calsses = computed(() => {
  return {
    [`svg-icon-size-${props.size}`]: props.size,
  }
})
const fontSize = reactive({ default: '32px', large: '48px', small: '16px' })
</script>

<style lang="less" scoped>
.svg-icon {
  width: v-bind('fontSize.default');
  height: v-bind('fontSize.default');
  fill: v-bind(color);
  vertical-align: middle;
  color: v-bind(color);

  &.svg-icon-size-small {
    font-size: v-bind('fontSize.small');
    height: v-bind('fontSize.small');
  }
  &.svg-icon-size-large {
    font-size: v-bind('fontSize.large');
    height: v-bind('fontSize.large');
  }
}
</style>
