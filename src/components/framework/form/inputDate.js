import Vue from 'vue';

/**
 * label, colspan
 * ------------------------
 * focus(), error(message), ok()
 */
export default Vue.component('inputDate', {
  render: function (createElement) {
    var self = this, propInput, propLabel = {class: 'crudLabel'};

    if (self.$parent.$attrs.labelLeft) {
      propLabel.style = 'min-width:' + self.$parent.$attrs.labelLeft;
    }

    propInput = {
      type: 'date',
      value: this.parse(self.value)
    };

    let e;
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
            self.$emit('input', new Date(event.target.value));
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
        return d.toISOString().substr(0, 10);
      } else if ((typeof dt) === 'string') {
        if (dt.indexOf('-') >= 0) {
          return new Date(dt);
        } else {
          return dt.substr(0, 10);
        }
      } else if (dt instanceof Date) {
        return dt.toISOString().substr(0, 10);
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
