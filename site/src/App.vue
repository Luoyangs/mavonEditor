<template>
  <div id="app">
    <mavon-editor v-model="value"></mavon-editor>
  </div>
</template>
<script>
import defaultGuide from 'shopee-editor/src/lib/lang/zh-CN/help_zh-CN.md';
export default {
  name: 'App',
  data () {
    return {
      value: defaultGuide
    }
  }
}
</script>
<style>
#editor {
  margin: auto;
  width: 80%;
  height: 580px;
}
</style>
