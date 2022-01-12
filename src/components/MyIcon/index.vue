<template>
  <icon-font :type="iconType" :style="iconStyle" :class="iconClass" />
</template>

<script lang="ts">
import { createFromIconfontCN } from '@ant-design/icons-vue'
import Config from '../../config'
const IconFont = createFromIconfontCN({
  scriptUrl: Config.scriptUrl,
})

export default defineComponent({
  name: 'MyIcon',
  components: {
    IconFont,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    align: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '18px',
    },
  },
  setup(props) {
    return {
      iconType: computed(() => `custom-icon-${props.type}`),
      iconClass: computed(() => (props.className ? `custom-icon ${props.className}` : 'custom-icon')),
      iconStyle: computed(() => {
        const style: any = {}
        if (props.align) style['vertical-align'] = props.align
        if (props.size) style['font-size'] = props.size
        return style
      }),
    }
  },
})
</script>

<style scoped>
.custom-icon {
  font-size: 18px;
  vertical-align: middle;
  fill: currentColor;
}
</style>
