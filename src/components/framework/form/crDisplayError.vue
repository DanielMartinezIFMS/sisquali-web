<template>
  <small v-if="message" class="inputErrorMessage"><font-awesome-icon icon="exclamation-triangle"/>{{message}}</small>
</template>

<script>
/**
 * Mostra uma mensagem de erro programatica.
 * Pode ser usado na função dentro de um CrFnValidator().
 * Exemplo:
 *
 * <cr-table />
 * <cr-display-error ref="ex" />
 *
 * ...
 *
 * let e = this.$refs.ex;
 * // mostra o erro
 * e.error("Inclua ao menos um item na tabela!");
 *
 * // apaga o erro
 * e.ok();
 *
 */
export default {
  name: "crDisplayError",
  data: () => {
    return {
      message: undefined,
    };
  },
  methods: {
    error: function (message) {
      this.message = message;
    },
    ok: function () {
      this.message = undefined;
    }
  }
}
</script>

<style scoped>

</style>