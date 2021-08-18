import Vue from 'vue';


/**
 * columns - Quantidade de colunas
 * colspan - Numero de colunas usadas do crudpannel pai
 * title - titulo do conjunto de dados
 * labelTop - posicao do label nos inputs filhos (Topo)
 * labelLeft - posicao do label nos inputs filhos(Esquerda)
 * boxShadow - mostra uma borda com sombra
 * box - mostra uma borda simples
 * noPadding - nao aplica padding
 * noMargin - não aplica margin
 * noGrow - não estica
 * visible - true/false mostra ou nao a camada inicialmente
 * -------------------------------------------------
 * show(true/false) - mostra/esconde a camada
 */
export default Vue.component('CrPanel', {
  render: function (createElement) {
    var css, rows, lns = [], l = [], ct = 0, span = 0, cfat = 0, cols = 1;
    if (this.$attrs.cols) {
      cols = this.$attrs.cols;
    } else {
      if (this.$attrs.columns) {
        cols = this.$attrs.columns;
      }
    }
    cfat = 100 / cols;

    this.$slots.default.map((e) => {
      if (e.componentOptions && e.componentOptions.tag === 'line-grow') {
        if (ct > 0) {
          lns.push(l);
          l = [];
          ct = 0;
        }
        lns.push(e);
      } else {
        if (e.tag) {
          span = (e.data && e.data.attrs && e.data.attrs.colspan) ? e.data.attrs.colspan : 1;
          l.push(createElement('div', {class: 'crudPanelCell', style: 'width:' + (span * cfat) + '%;'}, [e]));
          ct += parseInt(span);
          if (ct >= cols) {
            lns.push(l);
            l = [];
            ct = 0;
          }
        }
      }
    });
    if (ct < cols) {
      lns.push(l);
    }
    css = this.$crUtils.has('labelTop',this.$attrs) ? 'crudPanel labelTop' : 'crudPanel labelLeft';
    css += this.$crUtils.has('box',this.$attrs) ? ' boxSingle' : '';
    css += this.$crUtils.has('boxShadow',this.$attrs) ? ' boxShadow' : '';
    css += this.$crUtils.has('noMargin',this.$attrs) ? ' m-0' : '';
    css += this.$crUtils.has('noPadding',this.$attrs) ? ' p-0' : '';
    css += this.$crUtils.has('noGrow',this.$attrs) ? ' noGrow' : '';
    css += (!this.display) ? ' d-none' : ' d-block';
    rows = [];

    if (this.title) {
      rows.push(createElement('div', {class: 'panelTitle'}, this.title));
    }

    lns.map(v => {
      if (Array.isArray(v)) {
        rows.push(createElement('div', {class: 'crudFormLine'}, v));
      } else {
        rows.push(v);
      }
    });
    return createElement('div', {class: css}, rows);
  },
  props: ['title', 'visible'],
  data: function () {
    return {
      display: true
    };
  },
  created: function () {
    if (typeof this.visible === 'undefined') {
      this.display = true;
    } else {
      this.display = this.visible;
    }
  },
  methods: {
    show: function (display) {
      this.display = display;
      this.$forceUpdate();
    }
  }
});
