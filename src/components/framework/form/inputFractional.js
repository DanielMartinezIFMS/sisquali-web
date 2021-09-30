import Vue from 'vue';

/**
 * label, colspan
 * ------------------------
 * focus(), error(message), ok()
 */
export default Vue.component('inputFractional', {
  render: function (createElement) {
    let self = this, propLabel = {class: 'crudLabel'}, propInput = {
      type: 'number',
      value: self.value
    };

    if (self.$parent.$attrs.labelLeft) {
      propLabel.style = 'min-width:' + self.$parent.$attrs.labelLeft;
    }

    if (self.$attrs.step) {
      propInput.step = self.$attrs.step;
    }

    if (self.$attrs.min) {
      propInput.min = self.$attrs.min;
    }

    if (self.$attrs.max) {
      propInput.max = self.$attrs.max;
    }

    let e;
    if (this.message !== undefined) {
      let i = createElement('font-awesome-icon', {attrs: {icon: 'exclamation-triangle'}});
      e = createElement('small', {class: 'inputErrorMessage'}, [i, this.message]);
    }
    return createElement('div', {class: 'inputGroup'}, [
      createElement('label', propLabel, [this.label + ': ']),
      createElement('input', {
        domProps: propInput,
        ref: 'input',
        on: {
          keydown: function (event) {
            if ('-0123456789,'.indexOf(event.key) === -1 &&
              event.keyCode !== 37 &&
              event.keyCode !== 38 &&
              event.keyCode !== 39 &&
              event.keyCode !== 40 &&
              event.keyCode !== 9 &&
              event.keyCode !== 8) {
              // event.keyCode=0;
              console.log(event.keyCode);
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          },
          input: function (event) {
            self.$emit('input', parseFloat(event.target.value));
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
