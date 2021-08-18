/* eslint-disable no-trailing-spaces,no-multi-spaces */
import Vue from 'vue';

/**
 * label, colspan
 * ------------------------
 * focus(), error(message), ok()
 */
export default Vue.component('inputCurrency', {
  render: function (createElement) {
    let self = this, i, propLabel = {class: 'crudLabel'},
      propInput = {
        value: self.initialize(self.value, false)
      };
    if (self.$parent.$attrs.labelLeft) {
      propLabel.style = 'min-width:' + self.$parent.$attrs.labelLeft;
    }
    if (self.$parent.$attrs.step) {
      propInput.step = self.$parent.$attrs.step;
    }
    if (self.$parent.$attrs.min) {
      propInput.min = self.$parent.$attrs.min;
    }
    if (self.$parent.$attrs.max) {
      propInput.max = self.$parent.$attrs.max;
    }

    let e;
    if (this.message !== undefined) {
      let i = createElement('font-awesome-icon', {attrs: {icon: 'exclamation-triangle'}});
      e = createElement('small', {class: 'inputErrorMessage'}, [i, this.message]);
    }

    return createElement('div', {class: 'inputGroup'}, [
      createElement('label', propLabel, [self.$attrs.label + ': ']),
      createElement('input', {
        ref: 'currencyInput',
        domProps: propInput,
        class: 'crudNumber',
        on: {
          focus: function (event) {
            self.selPartInt(event);
          },
          keydown: function (event) {
            i = self.getInfo(event);
            if ('0123456789.,'.indexOf(i.key) >= 0) {
              if (i.key === '.' || i.key === ',') {
                if (i.integerEdit) {
                  self.setPos(i.commaPos + 1, event);
                } else {
                  self.setPos(i.commaPos, event);
                }
              } else {
                if (i.sStart < i.sEnd) {
                  event.target.value = self.formatCurrency(
                    i.value.substr(0, i.sStart) + i.key + i.value.substr(i.sEnd)
                    , true);
                  if (i.sEnd - i.sStart === 0) {
                    self.manteinPos(i, event);
                  } else {
                    self.nextPos(i, event);
                  }
                } else {
                  if (i.integerEdit) {
                    event.target.value = self.formatCurrency(i.value.substr(0, i.sEnd) + i.key + i.value.substr(i.sEnd));
                    self.manteinPos(i, event);
                  } else {
                    event.target.value = self.formatCurrency(
                      i.value.substr(0, i.sEnd) + i.key + i.value.substr(i.sEnd)
                    , true);
                    self.nextPos(i, event);
                  }
                }
              }
            } else if (i.keyCode === 36) { // home
              event.target.setSelectionRange(0, 0);
            } else if (i.keyCode === 35) { // end
              event.target.setSelectionRange(
                event.target.value.length, event.target.value.length
              );
            } else if (i.keyCode === 37) { // left
              return true;
            } else if (i.keyCode === 39) { // right
              return true;
            } else if (i.keyCode === 8) { // backspace
              if (i.charBefore === ',') {
                self.setPos(i.commaPos, event);
              } else {
                event.target.value = self.formatCurrency(
                  i.value.substr(0, i.sEnd - 1) + i.value.substr(i.sEnd)
                  , true);
                if (i.integerEdit) {
                  self.manteinPos(i, event);
                } else {
                  self.priorPos(i, event);
                }
                if (event.target.value.substr(0, 2) === '0,') {
                  event.target.setSelectionRange(0, 1);
                }
              }
            } else if (i.keyCode === 46) { // delete
              if (i.char === ',') {
                self.setPos(i.commaPos + 1, event);
              } else {
                event.target.value = self.formatCurrency(
                  i.value.substr(0, i.sEnd) + i.value.substr(i.sEnd + 1)
                  , true);
                if (i.integerEdit) {
                  self.nextPos(i, event);
                } else {
                  self.manteinPos(i, event);
                }
                if (event.target.value.substr(0, 2) === '0,') {
                  event.target.setSelectionRange(0, 1);
                }
              }
            } else if (i.keyCode === 9) { // tab
              return true;
            }

            if (event.target.value !== i.value) {
              self.$emit('input', self.unformatCurrency(event.target.value));
            }
            event.stopPropagation();
            event.preventDefault();
            return false;
          },
          blur: function (event) {
            self.$refs.currencyInput.value = self.formatCurrency(event.currentTarget.value, true);
          }
        }
      }),
      e
    ]);
  },
  data: function () {
    return {
      message: undefined
    };
  },
  methods: {
    manteinPos: function (i, event) {
      this.setPos(i.sStart + (event.target.value.length - i.length), event);
    },
    nextPos: function (i, event) {
      if (i.sStart === 0 && i.sEnd !== 0) {
        this.setPos(1, event);
      } else {
        this.setPos(i.sStart + (event.target.value.length - i.length) + 1, event);
      }
    },
    priorPos: function (i, event) {
      this.setPos(i.sStart + (event.target.value.length - i.length) - 1, event);
    },
    initialize: function (value) {
      if (value) {
        return this.formatCurrency(value, true);
      } else {
        return this.formatCurrency(0.0, true);
      }
    },
    formatCurrency: function (value, full) {
      if (typeof value === 'number') {
        value = value.toString().replace('.', ',');
      } else if (!value || value === undefined) {
        value = '0,00';
      } else if (value.indexOf(',') === -1) {
        value = value + ',00';
      }
      let tc, i = '', v = value.replace(/\./g, '').split(','), t = v[0].length;
      if (t === 0) {
        i = '0';
      }
      for (let x = v[0].length; x >= 0; x--) {
        if (x > 0 && x < t && (t - x) % 3 === 0) {
          i = '.' + i;
        }
        i = v[0].charAt(x - 1) + i;
      }
      if (full) {
        if (!v[1]) {
          v[1] = '0';
        }
        tc = v[1].substring(0, 2).length;
        if (tc === 0) v[1] = '00';
        else if (tc === 1) v[1] += '0';
      }
      return i + ',' + v[1].substring(0, 2);
    },
    unformatCurrency: function (value) {
      return parseFloat(parseFloat(value.replace(/\./g, '').replace(/,/g, '.')).toFixed(2));
    },
    setPos: function (pos, event) {
      if (pos < 0) {
        event.currentTarget.selectionStart = 0;
        event.currentTarget.selectionEnd = 0;
      } else {
        event.currentTarget.selectionStart = pos;
        event.currentTarget.selectionEnd = pos;
      }
    },
    getInfo: function (event) {
      let result = {};
      result.sStart = event.currentTarget.selectionStart;
      result.sEnd = event.currentTarget.selectionEnd;
      result.commaPos = event.target.value.indexOf(',');
      result.integerEdit = (result.sEnd <= result.commaPos);
      result.length = event.target.value.length;
      result.value = event.target.value;
      result.key = event.key;
      result.keyCode = event.keyCode;
      result.charBefore = event.target.value.charAt(result.sStart - 1);
      result.char = event.target.value.charAt(result.sStart);
      return result;
    },
    selPartInt: function (event) {
      document.execCommand('OverWrite', false, false);
      let comma = event.target.value.indexOf(',');
      event.currentTarget.setSelectionRange(0, comma);
    },
    focus: function () {
      let self = this;
      this.$nextTick(() => {
        self.$refs.currencyInput.focus();
      });
    },
    error: function (message) {
      this.message = message;
    },
    ok: function () {
      this.message = undefined;
    }
  },
  props: ['value']

});
