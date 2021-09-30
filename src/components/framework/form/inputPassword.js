import Vue from 'vue';

/**
 * label, colspan
 * ------------------------
 * focus(), error(message), ok()
 */
export default Vue.component('inputPassword', {
  render: function (createElement) {
    var self = this, propLabel = {class: 'crudLabel'};
    if (self.$parent.$attrs.labelLeft) {
      propLabel.style = 'min-width:' + self.$parent.$attrs.labelLeft;
    }
    let e;
    if (this.message !== undefined) {
      let i = createElement('font-awesome-icon', {attrs: {icon: 'exclamation-triangle'}});
      e = createElement('small', {class: 'inputErrorMessage'}, [i, this.message]);
    }
    return createElement('div', {class: {'inputGroup': true}}, [
      createElement('label', propLabel, [this.label + ': ']),
      createElement('input', {
        domProps: {
          type: 'password',
          value: self.value
        },
        ref: 'input',
        on: {
          input: function (event) {
            self.$emit('input', event.target.value);
          },
          blur: function () {
            self.$emit('blur');
          }
        }
      }),
      e
    ]);
  },
  props: ['value'],
  data: function () {
    return {
      message: undefined,
      label: this.$attrs.label
    };
  },
  methods: {
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
  }
});
