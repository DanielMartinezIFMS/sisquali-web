<template>
    <div class="crudGroup">
        <label>
            <input :name="name" ref="input" type="radio" :id="trueValue" :value="trueValue"
                   @change="$emit('input', $event.target.value)" :checked="value == trueValue"/>
            {{label}}
        </label>
        <small v-if="message" class="inputErrorMessage">
            <font-awesome-icon icon="exclamation-triangle"/>
            {{message}}
        </small>
    </div>
</template>

<script>
    /**
     * label, colspan
     * trueValue - valor usado quando ativado
     * ------------------------
     * focus(), error(message), ok()
     */
    export default {
        name: 'InputRadio',
        props: ['value', 'label', 'trueValue','name'],
        data: function () {
            return {
                message: undefined
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
    };
</script>

<style scoped>

</style>
