import Vue from 'vue';

/**
 * label, rows, colspan
 * focus(), error(message), ok()
 */
export default Vue.component('inputArea', {
    render: function (createElement) {
        var self = this, propLabel = {class: 'crudLabel'};
        if (self.$parent.$attrs.labelLeft) {
            propLabel.style = 'width:' + self.$parent.$attrs.labelLeft;
        }
        let e;
        if (this.message !== undefined) {
            let i = createElement('font-awesome-icon', {attrs: {icon: 'exclamation-triangle'}});
            e = createElement('small', {class: 'inputErrorMessage'}, [i, this.message]);
        }
        return createElement('div', {class: 'inputGroup'}, [
            createElement('label', propLabel, [this.label + ': ']),
            createElement('textarea', {
                class: 'remaining',
                domProps: {
                    value: self.value,
                    rows: self.rows
                },
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
    props: ['value', 'rows'],
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
