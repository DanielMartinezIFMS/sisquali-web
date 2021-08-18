<template>
  <div class="dialogBlock" v-if="show">
    <div ref="dialogContainer" class="dialogContainer" style="top:10px;left:10px;" >
      <div class="dialogTitle flexRow" @mousedown="mdown($event)">
        <div class="flexGrow ml-1" >{{title}}</div>
        <div v-if="showClose" class="mr-1" style="cursor: pointer;" @click="close()">
          <font-awesome-icon icon="times"/>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /**
   * Janela flutuante.
   * title - titulo da janela
   * width - largura da janela
   * hideCloseButton - esconde botao fechar
   * ----------------------------
   * open() - abre a janela
   * close() - fecha
   */
  let lastX, lastY;
  export default {
    name: 'crWindow',
    props: ['title', 'width', 'height'],
    data: function () {
      return {
        style: undefined,
        showClose: true,
        show: false
      };
    },
    created: function () {
      if (this.$crUtils.has('hideCloseButton',this.$attrs)) {
        this.showClose = false;
      }
    },
    methods: {
      mdown: function (event) {
        lastX = event.clientX;
        lastY = event.clientY;
        event.preventDefault();
        document.onmousemove = this.mmove;
        document.onmouseup = this.mup;
      },
      mmove: function (event) {
        event.preventDefault();
        let mx = event.clientX - lastX, my = event.clientY - lastY;
        let sy = (this.$refs.dialogContainer.offsetTop + my).toString() + 'px';
        let sx = (this.$refs.dialogContainer.offsetLeft + mx).toString() + 'px';
        this.$refs.dialogContainer.style.top = sy;
        this.$refs.dialogContainer.style.left = sx;
        lastX = event.clientX;
        lastY = event.clientY;
      },
      mup: function () {
        event.preventDefault();
        document.onmouseup = null;
        document.onmousemove = null;
      },
      close: function () {
        this.show = false;
      },
      open: function () {
        this.show = true;
        let self = this;
        setTimeout(() => {
          if (self.width) {
            self.$refs.dialogContainer.style.width = self.width;
          }
          if (self.height) {
            self.$refs.dialogContainer.style.height = self.height;
          }
          self.$refs.dialogContainer.style.top = (((window.innerHeight - self.$refs.dialogContainer.clientHeight) / 2) - ((window.outerHeight - window.innerHeight) / 2)).toString() + 'px';
          self.$refs.dialogContainer.style.left = (((window.innerWidth - self.$refs.dialogContainer.clientWidth) / 2) - ((window.outerWidth - window.innerWidth) / 2)).toString() + 'px';
        });
      }

    }
  };
</script>

<style scoped>
  .dialogBlock {
    position: absolute;
    overflow: hidden;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(152, 152, 152, 0.49);
  }

  .dialogContainer {
    box-shadow: 7px 10px 13px -10px rgba(0, 0, 0, 0.75);
    position: absolute;
    width: auto;
    height: auto;
    border: 1px solid silver;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: white;
  }

  .dialogTitle {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 0.3em;
    font-weight: bold;
    font-size: 1.1em;
    background-color: #235080;
    color: white;
  }
</style>
