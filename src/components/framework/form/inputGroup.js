import Vue from 'vue';
/**
 * label, colspan
 */
export default Vue.component('inputGroup', {
   inheritAttrs: false,
   render: function (createElement) {
      let self = this;
      let propLabel = {class: 'crudLabel'};
      if (self.$parent.$attrs.labelLeft) {
         propLabel.style = 'min-width:' + self.$parent.$attrs.labelLeft;
      }

      if (self.label !== undefined ) {
        return createElement('div', {class: 'inputGroup'}, [
          createElement('label', propLabel, [self.label + ': ']),
          createElement('div', {class: 'inputGroupGeneral'}, self.$slots.default)

        ]);
      } else {
        return createElement('div', {class: 'inputGroup'}, [
          createElement('div', {class: 'inputGroupGeneral'}, self.$slots.default)

        ]);
      }
   },
   props: ['value','label']

});
