import Vue from 'vue';

/**
 * label, colspan
 * :collection - coleção que será usada
 * display - se definido mostra o campo indicado, se não mostra o elemento de collection (campo nome)
 * key - se definido usa o campo indicado como chave
 * ------------------------
 * focus(), error(message), ok()
 */
export default Vue.component('inputCombo', {
  render: function (createElement) {
    let self = this;
    let propLabel = {class: 'crudLabel'};

    if (self.$parent.$attrs.labelLeft) {
      propLabel.style = 'min-width:' + self.$parent.$attrs.labelLeft;
    }

    let propInput = {
      selectedIndex: (self.collection) ? self.collection.indexOf(self.value) : -1
    };

    let list = (this.collection) ? this.collection : [];

    let e;
    if (this.message !== undefined) {
      let i = createElement('font-awesome-icon', {attrs: {icon: 'exclamation-triangle'}});
      e = createElement('small', {class: 'inputErrorMessage'}, [i, this.message]);
    }
    return createElement('div', {class: 'inputGroup'}, [
      createElement('label', propLabel, [self.$attrs.label + ': ']),
      createElement('select', {
        domProps: propInput,
        class: ['inputSelect', 'remaining'],
        ref: 'combo',
        on: {
          change: function (event) {
            self.$emit('input', self.collection[event.target.selectedIndex]);
            self.$emit('change', self.collection[event.target.selectedIndex]);
          }
        }
      }, list.map((op, index) => {
        if (self.display) {
          return createElement('option', {attrs: {value: index}}, op[self.display]);
        } else {
          return createElement('option', {attrs: {value: index}}, op);
        }
      })),
      e
    ]);
  },
  created: function () {
    this.atualizar();
  },
  updated: function () {
    this.atualizar();
  },

  data: function () {
    return {
      message: undefined
    };
  },
  methods: {
    atualizar: function () {
      this.$nextTick(function () {
        if (this.collection) {
          if (typeof this.value === 'object') {
            for (let i = 0; i < this.collection.length; i++) {
              if (this.keyField) {
                if (this.collection[i][this.keyField] === this.value[this.keyField]) {
                  this.$refs.combo.selectedIndex = i;
                }
              } else {
                if (this.collection[i].id === this.value.id) {
                  this.$refs.combo.selectedIndex = i;
                }
              }
            }
          } else {
            this.$refs.combo.selectedIndex = this.collection.indexOf(this.value);
          }
        }
      });
    },
    focus: function () {
      let self = this;
      this.$nextTick(() => {
        self.$refs.combo.focus();
      });
    },
    error: function (message) {
      this.message = message;
    },
    ok: function () {
      this.message = undefined;
    }

  },
  props: ['value', 'collection', 'display', 'keyField', 'empty']

});
