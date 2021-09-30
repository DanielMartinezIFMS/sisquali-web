import Vue from 'vue';

/**
 * input para inteiros.
 *
 * label, colspan, width, min, max, step
 * -----------------------------------------
 * focus(), error(message), ok()
 */
export default Vue.component('inputInteger', {
  render: function (createElement) {
    let self = this, propLabel = {class: 'crudLabel'}, styleInput = '';

    if (self.$parent.$attrs.labelLeft) {
      propLabel.style = 'min-width:' + self.$parent.$attrs.labelLeft;
    }

    let propInput = {
      type: 'number',
      value: self.value
    };

    if (self.step) {
      propInput.step = self.step;
    }

    if (self.min) {
      propInput.min = self.min;
    }

    if (self.max) {
      propInput.max = self.max;
    }

    if (self.width) {
      styleInput += 'width:' + this.width + ';';
    }

    let e;
    if (this.message !== undefined) {
      let i = createElement('font-awesome-icon', {attrs: {icon: 'exclamation-triangle'}});
      e = createElement('small', {class: 'inputErrorMessage'}, [i, this.message]);
    }
    return createElement('div', {class: 'inputGroup'}, [
      createElement('label', propLabel, [self.label + ': ']),
      createElement('input', {
        domProps: propInput,
        style: styleInput,
        ref: 'input',
        on: {
          keydown: function (event) {
            if (event.key === '.' || event.key === ',' || event.key === 'e') {
              // event.keyCode=0;
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          },
          input: function (event) {
            self.$emit('input', parseInt(event.target.value));
          }
        }
      }),
      e

    ]);
  },
  props: ['value', 'width', 'min', 'max', 'step'],
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
