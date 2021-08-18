import Vue from 'vue';

export default Vue.component('inputAutocomplete', {
  data: function () {
    return {ult: undefined, lista: []};
  },
  render: function (createElement) {
    var self = this,
      propLabel = {class: 'crudLabel'};

    if (self.$parent.$attrs.labelLeft) {
      propLabel.style = 'min-width:' + self.$parent.$attrs.labelLeft;
    }
    return createElement('div', {class: 'inputGroup'}, [
      createElement('label', propLabel, [self.$attrs.label + ': ']),
      this.lista,
      createElement('div', {class: 'inputAutocompleContainer'}, [
        createElement('input', {
          class: 'remaining',
          domProps: {
            type: 'search',
            autocomplete: 'off',
            value: self.value,
            list: 'datalist'
          },
          on: {
            input: function (event) {
              // event OPS
            },
            focus: function (event) {
              event.currentTarget.parentNode.childNodes[1].style.width = (event.currentTarget.parentNode.childNodes[0].clientWidth + 4) + 'px';
              event.currentTarget.parentNode.childNodes[1].classList.remove('hide');
            },
            blur: function (event) {
              event.currentTarget.parentNode.childNodes[1].classList.add('hide');
            }
          }
        }),
        createElement('select', {
          class: 'remaining inputAutocompleteOptions hide',
          domProps: {
            size: '10'
          }
        })
      ])
    ]);
  },
  props: ['value', 'config']

});
