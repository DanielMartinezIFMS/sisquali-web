<template >
  <div id="form" style="flex-grow: 1;" :class="cssClass" >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'crCrudForm',
    data: function () {
      return {
        showthis: false
      };
    },
    computed: {
      enabled: function () {
        return (this.visible) || (this.showthis);
      },
      cssClass: function () {
        let ret = {
          hide: !this.enabled,
          show: this.enabled
        };
        if (this.background) {
          ret['bkg' + this.background] = true;
        }
        return ret;
      }
    },
    props: ['visible', 'background'],
    methods: {
      show: function (mostrar) {
        this.showthis = mostrar;
      }
    }
  };
</script>

<style scoped>
  .show {
    display: flex;
    flex-direction: column;
    padding-bottom: 0.3em;
  }

  .hide {
    display: none;
  }
  /*.bkg1{
    background: url("../../../assets/bkg1_cadastro.png") no-repeat center;
  } */
</style>
