import Vue from 'vue';

/**
 * criar uma div que se expande verticalmente.
 *
 * hBorder - Mostra uma borda simples horizontal
 */
export default Vue.component('lineGrow', {
  render: function (createElement) {
    let cl = 'lineGrow';
    if (this.hBorder !== undefined) {
      cl += ' hBorder';
    }
    return createElement('div', {class: cl});
  },
  props: ['value', 'hBorder']
});
