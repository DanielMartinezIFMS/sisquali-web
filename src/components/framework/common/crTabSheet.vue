<template>
  <div class="tabBorder remaining" :class="{hide:hide,'d-flex': true}">
    <slot></slot>
  </div>
</template>

<script>
  /**
   * Abas de CrTab
   * :onShow - callback
   * title
   * ---------------------------------------------
   * show(bool) - mostra/esconde o tabsheet
   */
  export default {
    name: 'crTabSheet',
    props: ['title', 'onShow'],
    created: function () {
      if (this.$parent.addTab) {
        this.$parent.addTab(this);
      }
    },
    data: function () {
      return {
        hide: true
      };
    },
    methods: {
      show: function (show) {
        if (show && this.onShow) {
          this.onShow(this.title);
        }
        this.hide = !show;
      }
    }
  };
</script>

<style scoped>
  .tabBorder {
    border: 1px solid silver;
    border-top: none;
    background-color: #f8f8f8;
  }
</style>
