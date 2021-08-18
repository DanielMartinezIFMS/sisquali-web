<template>
  <div class="inputGroup flexRow">
    <label class="crudLabel">{{label}}:</label>
    <div>
      <div class="flexCol" style="text-align: center; background-color:#eeeeee;padding:0.5em;padding-top:0.2em;margin-bottom: 0.3em;border: 1px solid silver;">
        <div class="flexRow">
          <small class="flexGrow" style="font-size: 0.5em;text-align: left;">{{width}} x {{height}}</small>
          <small style="font-size: 0.5em;">{{size}}</small>
        </div>

        <img ref="image_show" title="clique aqui ou arraste uma imagem para cá" @load="carregado" :src="imgUrl(value)" @click="selecionar" @dragover.prevent
             @drop.prevent="aceitar"
             style="width: 200px;cursor: pointer;">
        <button style="width: 6em;margin-top: 0.3em;align-self: center" type="button" @click="apagar">
          <font-awesome-icon icon="eraser"/>
          Apagar
        </button>
      </div>
    </div>
    <input type="file" ref="input_image" @change="carregar" accept=".png,.jpg,.bmp,.gif,.jpeg,.tiff,.tif" style="position: absolute;top:-1000px;left:-1000px;width: 1px;height: 1px; tab-index: -1;">
    <small v-if="message" class="inputErrorMessage"><font-awesome-icon icon="exclamation-triangle"/>{{message}}</small>
  </div>
</template>

<script>
  /**
   *  :config  - Objeto de confirguração
   *    { type: sessão de armazenamento
   *      defaultImage: imagem default a ser apresentada
   *    }
   *   label - Rótulo do input
   *   colspan - quantidade de colunas no crPanel a agrupar
   */
  import ctt from '../../parametros/Constants';

  export default {
    name: 'inputImage',
    props: ['value', 'config', 'label'],
    data: () => {
      return {
        width: '?',
        height: '?',
        size: '',
        cache: true,
        message: undefined
      };
    },
    created: function () {
      if (this.$crUtils.has('cache',this.config)) {
        this.cache = this.config.cache;
      }
    },
    methods: {
      error: function (message) {
        this.message = message;
      },
      ok: function () {
        this.message = undefined;
      },
      carregado: function (event) {
        this.width = event.target.naturalWidth;
        this.height = event.target.naturalHeight;
        this.size = '';
        if (this.$root.crudFiles && this.$root.crudFiles[this.label]) {
          var file = this.$root.crudFiles[this.label].file;
          if (file.size < (1024 * 1024)) {
            this.size = Math.round((file.size / 1024) * 100) / 100 + 'kb';
          } else {
            this.size = Math.round((file.size / 1024 / 1024) * 100) / 100 + 'Mb';
          }
        }
      },
      imgUrl: function (v) {
        if (v) {
          return ctt.image + '/' + this.config.type + '/' + v.nome;
        } else {
          return ctt.image + '/default/' + this.config.defaultImage;
        }
      },
      aceitar: function (event) {
        this.carregar({target: {files: event.dataTransfer.files}});
      },
      selecionar: function (event) {
        this.$refs.input_image.click();
      },
      apagar: function (event) {
        this.$emit('input', undefined);
        this.$refs.image_show.src = ctt.image + '/' + this.config.type + '/' + this.config.defaultImage;
        this.$root.crudFiles = {};
      },
      carregar: async function (event) {
        let self = this, file = event.target.files[0], reader = new FileReader();
        if (this.cache) {
          if (!self.$root.crudFiles) {
            self.$root.crudFiles = {};
          }
          self.$root.crudFiles[self.label] = {
            file: file,
            type: self.config.type,
            name: file.name,
            label: self.label,
            callback: function (newname) {
              let vl = {};
              vl.nome = newname;
              vl.tipo = self.config.type.toUpperCase();
              self.$emit('input', vl);
            }
          };

          let cvl = {};
          cvl.nome = file.name;
          cvl.tipo = self.config.type.toUpperCase();
          self.$emit('input', cvl);

          reader.onload = function (e) {
            self.$refs.image_show.src = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          let fd = new FormData();
          fd.append('file', file);
          let novoNome = await this.$post(ctt.image + '/' + self.config.type.toUpperCase(), fd);
          let cvl = {};
          cvl.nome = novoNome;
          cvl.tipo = self.config.type.toUpperCase();
          self.$emit('input', cvl);
        }
      }
    }
  };
</script>

<style scoped>

</style>
