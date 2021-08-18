<template>
  <cr-panel ref="filterCtt" noGrow labelLeft>
    <div class="flexRow mt-1">
      <input-combo class="pr-0" v-model="selected" :collection="filtros" display="title" label="Filtros"
                   @input="onInput"/>
      <button v-if="activeFilters.length>0" class="crudButton warning w-auto ml-1 mb-2" type="button" @click="zerar">
        <font-awesome-icon icon="times"/>
        Remover Filtros
      </button>
      <button class="crudButton primary w-auto ml-1 mb-2" type="button" @click="atualizar">
        <font-awesome-icon icon="recycle"/>
        Atualizar
      </button>
    </div>
    <div class="flexWrap pl-2">
      <div v-for="(filter,index) in this.activeFilters" v-bind:key="index" class="filterOption flexRow">
        <label>{{filter.title}}:</label>
        <input class="p-1" v-if="filter.type === 'T'" type="text" v-model="values[index]">
        <div v-if="filter.type === 'C'">
          <label v-for="(op,j) in filter.collection" v-bind:key="j"><input type="checkbox" :id="op" :true-value="op" :false-value="null" v-model="values[index][j]" @change="$forceUpdate()">{{op}}</label>
        </div>
        <button class="crudButton primary w-auto " style="margin:-0.3em -0.3em -0.3em 0.3em; border-radius: 0 5px 0 0 " type="button" @click="remove(filter)">
          <font-awesome-icon icon="times"/>
        </button>
      </div>
    </div>
  </cr-panel>
</template>

<script>
  /* eslint-disable no-trailing-spaces */

  import CrPanel from '../form/crPanel';
  import InputCombo from '../form/inputCombo';

  /**
   * configFn - funcao de config
   *  ft.TEXT
   *  //ft.CHECK
   *  //ft.COMBO
   *  //ft.AUTOCOMPLETE
   *  //ft.INTEGER
   *  //ft.FLOAT
   *  //ft.DATE
   *  //ft.DATETIME
   *  //ft.BETWIN_INTEGER
   *  //ft.BETWIN_FLOAT
   *  //ft.BETWIN_DATE
   *  //ft.BETWIN_DATETIME
   *  function(ft) {
   *    return {
   *      filters: [
   *        {
   *        title: 'Nome do Filtro',id: 'variavel_de_envio',
   *        type: ft.TIPO,
   *        mask: '99.999/9999',
   *        collection: [op1,op2]
   *        onSendValue: function(selectedValue)...,
   *        config: autocomplete/combo...}, ...
   *      ]
   *    }
   *  }
   */
  export default {
    name: 'crud-filter',
    components: {CrPanel, InputCombo},
    props: ['configFn', 'visible'],
    created: function () {
      let self = this;
      if (this.configFn && typeof this.configFn === 'function') {
        let ft = {
          TEXT: 'T',
          CHECK: 'C'
        };
        let fts = this.configFn(ft).filters;
        fts.map((f, index) => {
          if (this.$crUtils.has('default',f)) {
            self.activeFilters.push(f);
            if (f.type === 'C') {
              self.values[self.activeFilters.length - 1] = [];
            }
          }
          self.filters.push(f);
        });
      }
      if (typeof this.visible === 'undefined') {
        this.enabled = true;
      } else {
        this.enabled = this.visible;
      }
    },
    data: function () {
      return {
        enabled: true,
        selected: undefined,
        config: {},
        filters: [],
        activeFilters: [],
        values: []
      };
    },
    methods: {
      show: function (display) {
        this.$refs.filterCtt.show(display);
      },
      remove: function (filter) {
        this.values[this.activeFilters.indexOf(filter)] = undefined;
        this.activeFilters.splice(this.activeFilters.indexOf(filter), 1);
      },
      zerar: function () {
        this.values = [];
        this.selected = undefined;
        this.activeFilters = [];
      },
      atualizar: function () {
        let grid = this.getGrid();
        let obj = {};
        this.activeFilters.map((f, index) => {
          obj[f.id] = (this.$crUtils.has('onSendValue',f)) ? f.onSendValue(this.values[index]) : this.values[index];
        });
        grid.setFiltros(obj);
        grid.carregarDados();
      },
      getGrid: function () {
        let result = null;
        for (let i = 0; i < this.$parent.$children.length; i++) {
            let g = this.$parent.$children[i];
            if (g.$options._componentTag === 'cr-crud-grid') {
              result = g;
              break;
            }
        }
        return result;
      },
      onInput: function (event) {
        this.activeFilters.push(this.selected);
        if (this.selected.type === 'C') {
          this.values[this.activeFilters.length - 1] = [];
        }
        this.selected = undefined;
      }

    },
    computed: {
      filtros: function () {
        let self = this;
        return this.filters.filter(f => self.activeFilters.indexOf(f) === -1);
      }
    }
  };
</script>

<style scoped>
</style>
