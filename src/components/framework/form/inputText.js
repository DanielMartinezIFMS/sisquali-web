import Vue from 'vue';

/**
 * label, colspan , disabled
 * ------------------------
 * focus(), error(message), ok()
 */
export default Vue.component('inputText', {
    inheritAttrs: false,
    render: function (createElement) {
        let self = this;
        let propLabel = {class: 'crudLabel'};
        let propInput = {value: self.value, id: this.id};
        if (this.disabled) {
            propInput.disabled = this.disabled;
        }
        if (self.$attrs.inputStyle) {
            self.$attrs.style = self.$attrs.inputStyle;
            self.$attrs.inputStyle = undefined;
        }
        if (self.$parent.$attrs.labelLeft) {
            propLabel.style = 'text-align: right; width:auto; min-width:' + self.$parent.$attrs.labelLeft;
        }
        let e;
        if (this.message !== undefined) {
            let i = createElement('font-awesome-icon', {attrs: {icon: 'exclamation-triangle'}});
            e = createElement('small', {class: 'inputErrorMessage'}, [i, this.message]);
        }
        let lb = (this.label)?createElement('label', propLabel, [this.label + ': ']):null;
        return createElement('div', {class: 'inputGroup'}, [
            lb,
            createElement('input', {
                domProps: propInput,
                ref: 'input',
                attrs: self.$attrs,
                on: {
                    input: function (event) {
                        self.$emit('input', event.target.value);
                    }
                }
            }),
            e

        ]);
    },
    props: ['value', 'disabled', 'id'],
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
