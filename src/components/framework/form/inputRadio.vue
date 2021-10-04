<template>
    <div class="crudGroup">
        <label>
            <input :name="name" ref="input" type="radio" :id="trueValue" :value="trueValue"
                   @change="fnChange($event)" :checked="value == trueValue"/>
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
     * falseValue - valor usado quando desativado
     * ------------------------
     * focus(), error(message), ok()
     */
    export default {
        name: 'InputRadio',
        props: ['value', 'label', 'trueValue', 'falseValue','name'],
        data: function () {
            return {
                message: undefined
            };
        },
        methods: {
            fnChange: function(event){
              if(event.target.value==='true') {
                if (this.trueValue === undefined) {
                  this.$emit('input', true);
                  this.$emit('change', true);
                } else {
                  this.$emit('input', this.trueValue);
                  this.$emit('change', this.trueValue);
                }
              }else{
                if (this.falseValue === undefined) {
                  this.$emit('input', false);
                  this.$emit('change', false);
                } else {
                  this.$emit('input', this.falseValue);
                  this.$emit('change', this.falseValue);
                }
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
    };
</script>

<style scoped>

</style>
