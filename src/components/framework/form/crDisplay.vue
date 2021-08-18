<template>
  <div class="inputGroup">
    <label class="crudLabel" :style="labelStyle" >{{label}}:</label>
    <div class="crudDisplay" :style="inputStyle" v-html="display()"> </div>
  </div>
</template>

<script>
  /**
   * Mostra dados no mesmo layout que inputs.
   *
   * :value - valor que será mostrado
   * mask - mascara a ser aplicada
   * label - rotulo
   * right - alinhar a rireita
   * width - largura da caixa
   * rows  - numero de linhas antes de criar scroller
   */
  export default {
    name: 'crDisplay',
    props: ['value', 'mask', 'label', 'right', 'width', 'rows', 'hFull'],
    data: function () {
      return {
        labelStyle: undefined,
        inputStyle: ''
      };
    },
    created: function () {
      let self = this;
      if (self.$parent.$attrs.labelLeft) {
        this.labelStyle = 'min-width:' + self.$parent.$attrs.labelLeft + ';';
      } else {
        this.labelStyle = 'width: 100%;text-align: left;';
      }

      if (this.right !== undefined) {
        this.inputStyle += 'text-align: right;';
      }
      if (this.width) {
        this.inputStyle += 'width: ' + this.width + ';';
      }
      if(this.rows){
          this.inputStyle += 'height: ' + this.rows + 'em;';
          this.inputStyle += 'overflow: auto;';
      }
    },
    methods: {
      display: function () {
        let v = this.value;
        if(v === undefined)
            return v;
        if(this.rows){
            while(v.indexOf('\n')>=0)
              v = v.replace('\n','<br/>');
        }
        if (this.mask) {
          return this.$crUtils.mask(this.mask, v);
        } else {
          return v;
        }
      }
    }
  };
</script>

<style scoped>
  .crudDisplay{
    border: 1px solid silver;
    border-radius: 3px;
    background-color: #f5f5f5;
    font-size: 1em;
    padding: 5px 5px 5px 5px;
    width: 100%;
    min-height: 1.875em;
  }
</style>
