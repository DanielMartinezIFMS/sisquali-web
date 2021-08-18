import Vue from 'vue';

/**
 * label, colspan
 * ------------------------
 * focus(), error(message), ok()
 */
export default Vue.component('inputDateTime', {
  render: function (createElement) {
    var self = this, propInput, propLabel = {class: 'crudLabel'};

    if (self.$parent.$attrs.labelLeft) {
      propLabel.style = 'min-width:' + self.$parent.$attrs.labelLeft;
    }

    propInput = {
      type: 'datetime-local',
      value: this.parse(self.value)
    };

    let e, t;
    if (this.message !== undefined) {
      let i = createElement('font-awesome-icon', {attrs: {icon: 'exclamation-triangle'}});
      e = createElement('small', {class: 'inputErrorMessage'}, [i, this.message]);
    }
    return createElement('div', {class: 'inputGroup'}, [
      createElement('label', propLabel, [self.$attrs.label + ': ']),
      createElement('input', {
        class: 'inputDate',
        domProps: propInput,
        ref: 'input',
        on: {
          input: function (event) {
            if (t !== undefined) {
              clearTimeout(t);
            }
            t = setTimeout(() => {
              if (!isNaN(Date.parse(event.target.value)) && event.target.value.length === 16) {
                let dt = new Date(event.target.value);
                self.$emit('input', dt);
              }
              t = undefined;
            }, 300);
          }
        }
      }),
      e

    ]);
  },
  props: ['value'],
  data: function () {
    return {
      message: undefined
    };
  },
  methods: {
    parse (dt) {
      if ((typeof dt) === 'number') {
        let d = new Date(dt);
        return d.toJSON().substr(0, 16);
      } else if ((typeof dt) === 'string') {
        if (dt.indexOf('-') >= 0) {
          return dt.substr(0, 16);
        } else {
          return dt;
        }
      } else if (dt instanceof Date) {
        return this.$crUtils.mask('9999-99-99T99:99:99', dt);
      }
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
