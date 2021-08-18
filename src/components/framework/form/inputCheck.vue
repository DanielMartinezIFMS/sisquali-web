<template>
  <div class="inputGroup">
    <label class="crudLabel">
      <input ref="input" type="checkbox" :value="value" @change="($event)=>changed($event)" :checked="value"/>
      {{label}}
    </label>
    <small v-if="message" class="inputErrorMessage"><font-awesome-icon icon="exclamation-triangle"/>{{message}}</small>
  </div>
</template>

<script>
    /**
     * label, colspan,
     * :trueValue - Value || function - valor atribuido se ticado
     * @Change
     * ------------------------
     * focus(), error(message), ok()
     */
  export default {
    name: 'InputCheck',
    props: ['value', 'label','colspan','trueValue'],
    data: function () {
      return {
        message: undefined
      };
    },
    methods: {
      changed: function($event) {
        if(this.trueValue){
            if($event.target.checked===true) {
                if (typeof this.trueValue === 'function') {
                    let v = this.trueValue();
                    this.$emit('input', v);
                    this.$emit('change', v);
                } else {
                    this.$emit('input', this.trueValue);
                    this.$emit('change', this.trueValue);
                }
            }else{
                this.$emit('input', undefined)
                this.$emit('change', undefined);
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
