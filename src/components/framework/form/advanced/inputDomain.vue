<template>
  <div class="inputGroup">
    <label v-if="label !== undefined" class="crudLabel" :style="labelStyle">{{ label }}:</label>
    <select v-model="dominio" v-on:change="selecionado">
      <option v-for="(op,index) in opcoes" v-bind:key="index" :value="op">{{ (sigla) ? op.sigla : op.nome }}</option>
    </select>
    <small v-if="message" class="inputErrorMessage">
      <font-awesome-icon icon="exclamation-triangle"/>
      {{ message }}</small>
  </div>
</template>

<script>
/**
 * label - rotulo para o select (topo por padrão)
 * labelLeft - rotulo posicionado a esquerda
 * codGroup - id do dominiogrupo
 * sigla - mostrar sigla invés de nome
 * :excludedList - lista de elementos a ser removido do select
 * ---------------------
 * focus(), error(message), ok()
 */

import ctt from '../../../parametros/Constants';

export default {
  name: 'inputDomain',
  props: ['value','labelLeft', 'codGroup', 'sigla', 'excludedList'],
  created: function () {
    this.carregarOpcoes();
    if (this.$parent.$attrs.labelLeft) {
      this.labelStyle = 'min-width:' + this.$parent.$attrs.labelLeft;
    }
    this.dominio = this.value;
  },
  watch: {
    value: function (newVal) {
      this.dominio = newVal;
      if (this.dominio) {
        for (let i = 0; i < this.lista.length; i++) {
          if (this.lista[i].id === this.dominio.id) {
            this.lista[i] = this.dominio;
          }
        }
      }
    }
  },
  data: function () {
    return {
      lista: [],
      dominio: undefined,
      labelStyle: undefined,
      message: undefined,
      label: this.$attrs.label
    };
  },
  methods: {
    carregarOpcoes: function () {
      let self = this;
      this.$get(ctt.rest + '/dominio/listar?args=' + encodeURI('{"grupo":' + this.codGroup + '}')).then(data => {
        self.lista = data;
        if (self.dominio) {
          for (let i = 0; i < self.lista.length; i++) {
            if (self.lista[i].id === self.dominio.id) {
              self.lista[i] = self.dominio;
            }
          }
        }
      });
    },
    selecionado: function (event) {
      if (this.opcoes) {
        if (event.target.selectedIndex === -1 || (this.opcoes.length - 1) < event.target.selectedIndex) {
          this.$emit('input', null);
          this.$emit('chane', null);

        } else {
          this.$emit('input', this.dominio);
          this.$emit('change', this.dominio);
        }
      }
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
  computed: {
    opcoes: function () {
      let self = this;
      if (!this.excludedList || this.excludedList.length === 0) {
        return this.lista;
      } else {
        let l = [];
        this.lista.map(op => {
          if (self.excludedList) {
            let add = true;
            self.excludedList.map(e => {
              if (e.id === op.id) {
                add = false;
              }
            });
            if (add) {
              l.push(op);
            }
          }
        });
        return l;
      }
    }
  }
};
</script>

<style scoped>

</style>
