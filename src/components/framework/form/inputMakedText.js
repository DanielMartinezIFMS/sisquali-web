import Vue from 'vue';

/**
 * label, colspan
 * mask - cpf,cnpj,cep, customizadas com "9" e "#" e preenchimento  ">" e "<"
 * ------------------------
 * focus(), error(message), ok()
 */
export default Vue.component('inputMaskedText', {
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
    return createElement('div', {class: 'inputGroup'}, [
      createElement('label', propLabel, [this.label + ': ']),
      createElement('input', {
        domProps: {
          value: self.value
        },
        ref: 'input',
        on: {
          input: function (event) {
            let v = self.removeMask(event.target.value);
            event.target.value = self.addMask(v);
            self.$emit('input', event.target.value);
          }
        }
      }),
      e

    ]);
  },
  props: ['value', 'mask'],
  data: function () {
    return {
      message: undefined,
      label: this.$attrs.label
    };
  },
  methods: {
    direction: function (mask) {
      return (mask.indexOf('<')) ? 'right' : 'left';
    },
    umask: function () {
      let msk, m, c, r = '';
      if (this.mask.toUpperCase() === 'CPF') {
        msk = '>999.999.999-99';
      } else if (this.mask.toUpperCase() === 'CNPJ') {
        msk = '>99.999.999/9999-99';
      } else if (this.mask.toUpperCase() === 'CEP') {
        msk = '>99.999-999';
      } else {
        msk = this.mask;
      }
      for (m = 0; m < msk.length; m++) {
        c = msk.charAt(m);
        if (c !== '9' && c !== '#' && c !== '<' && c !== '>' && r.indexOf(c) === -1) {
          r += c;
        }
      }
      return r;
    },
    addMask: function (value) {
      let msk, result = '', m, c, v = 0;
      if (this.mask.toUpperCase() === 'CPF') {
        msk = '>999.999.999-99';
      } else if (this.mask.toUpperCase() === 'CNPJ') {
        msk = '>99.999.999/9999-99';
      } else if (this.mask.toUpperCase() === 'CEP') {
        msk = '>99.999-999';
      } else {
        msk = this.mask;
      }

      if (this.direction(msk) === 'right') {
        for (m = 0; m < msk.length && v < value.length; m++) {
          c = msk.charAt(m);
          if (c === '9' || c === '#') {
            result += value.charAt(v);
            v++;
          } else {
            if (c !== '>') {
              result += c;
            }
          }
        }
      } else {
        v = value.length - 1;
        for (m = msk.length - 1; m >= 0 && v >= 0; m--) {
          c = msk.charAt(m);
          if (c === '9' || c === '#') {
            result = value.charAt(v) + result;
            v--;
          } else {
            if (c !== '<') {
              result = c + result;
            }
          }
        }
      }
      return result;
    },
    removeMask: function (text) {
      let result = '', v, c, um = this.umask();
      for (v = 0; v < text.length; v++) {
        c = text.charAt(v);
        if (um.indexOf(c) === -1) {
          result += c;
        }
      }
      return result;
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

  }

});
