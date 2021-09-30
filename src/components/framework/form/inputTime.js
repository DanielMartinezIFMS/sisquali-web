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
            type: 'time',
            value: self.value
        };
        let e;
        if (this.message !== undefined) {
            let i = createElement('font-awesome-icon', {attrs: {icon: 'exclamation-triangle'}});
            e = createElement('small', {class: 'inputErrorMessage'}, [i, this.message]);
        }
        return createElement('div', {class: 'inputGroup'}, [
            (self.$attrs.label) ? createElement('label', propLabel, [this.label + ': ']) : ' ',
            createElement('input', {
                class: 'inputDate',
                domProps: propInput,
                ref: 'input',
                on: {
                    input: function (event) {
                        self.$emit('input', event.target.value);
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
