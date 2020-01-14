<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
            <!-- 左上角文字，类名为md-title -->
            <slot name="md-title"></slot>
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
              <!-- 中间部分消息插槽 -->
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
              <!-- 按钮部分插槽 -->
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <!-- 遮罩 -->
    <div class="md-overlay" v-show="mdShow" @click="closeModal"></div>
  </div>
</template>

<script>
export default {
  props: ["mdShow"],
  data() {
    return {};
  },
  methods:{
      closeModal(){
          this.$emit("close")
      }
  }
};
</script>

<style>
</style>