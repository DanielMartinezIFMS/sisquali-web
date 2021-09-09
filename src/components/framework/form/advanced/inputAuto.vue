<template>
  <div class="inputGroup">
    <label class="crudLabel" :style="autostyle">{{label}}:</label>
    <input type="search" class="remaining" autocomplete="off" v-model="texto"
           @input="input" @blur="show=false"
           @keydown.up.stop.prevent="key_up"
           @keydown.down.stop.prevent="key_down" @keyup.enter="select">
    <small v-if="message" class="inputErrorMessage"><font-awesome-icon icon="exclamation-triangle"/>{{message}}</small>
    <select ref="_ac" v-model="preselect" size="10" @click="optionSelect"
            :class="{remaining:true, inputAutocompleteOptions:true, hide:!this.show}">
      <option v-for="item in lista" v-bind:value="item" v-bind:key="item[config.indexField]">{{print(item)}}</option>
    </select>
  </div>
</template>

<script>
  /**
   * id - identificação do autocomplete para processamento do servidor
   * label - label do input
   * labelLeft - largura do label css width
   * :config {
   *      url:'url/do/servico',
   *      displayField: 'nome do campo para mostrar (default "nome")',
   *      indexField:'nome do campo chave (default "id") ,
   *      onDisplay: function(item)...  (funcao de impressão da opção)
   *   }
   */
  export default {
    name: 'inputAuto',
    props: ['config', 'value', 'label', 'labelLeft'],
    created: function () {
      this.texto = this.print(this.value);
    },
    watch: {
      value: function (newValue) {
        this.texto = this.print(newValue);
      }
    },
    methods: {
      optionSelect () {
        this.$emit('input', this.preselect);
        this.texto = this.print(this.preselect);
        this.show = false;
      },
      input (event) {
        this.$refs._ac.style.width = event.target.offsetWidth + 'px';
        let r = event.target.getBoundingClientRect();
        this.$refs._ac.style.top = (r.bottom + 1) + 'px';
        this.$refs._ac.style.left = r.left + 'px';
        let url = this.config.url;
        if(url.indexOf('autocomplete') === -1){
            url = url+'/autocomplete';
        }
        this.$post(url, {key: event.target.value}).then((data) => {
          this.lista = data;
          this.preselect = data[0];
          this.show = true;
        });
      },
      key_up () {
        if (this.lista.indexOf(this.preselect) > 0) {
          this.preselect = this.lista[this.lista.indexOf(this.preselect) - 1];
        }
        return false;
      },
      key_down () {
        if (this.lista.indexOf(this.preselect) < (this.lista.length - 1)) {
          this.preselect = this.lista[this.lista.indexOf(this.preselect) + 1];
        }
        return false;
      },
      select () {
        this.$emit('input', this.preselect);
        this.texto = this.print(this.preselect);
        this.show = false;
      },
      print (item) {
        if (!item) {
          return '';
        }
        if (this.config && this.config.displayField) {
          return item[this.config.displayField];
        } else if (this.config && this.config.onDisplay) {
          return this.config.inDisplay(item);
        } else if (item.nome) {
          return item.nome;
        }
        return item;
      },
      focus: function () {
        let self = this;
        this.$nextTick(() => {
          self.$refs.input.focus();
        });
      },
      error: function (message) {
        this.message = message;
      },
      ok: function () {
        this.message = undefined;
      }
    },
    data: () => {
      return {
        autostyle: '',
        show: false,
        lista: [],
        texto: '',
        preselect: undefined,
        message: undefined,
      };
    }
  };
</script>

<style scoped>

</style>
