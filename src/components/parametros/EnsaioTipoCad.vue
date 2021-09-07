<template>
  <cr-crud collection="lista" entity="cadastro" config="crudConf">
    <cr-crud-grid :config="gridConf" class="mt-2"/>
    <cr-crud-form>
      <cr-panel columns="2" boxShadow labelTop>

      </cr-panel>
      <cr-crud-buttons/>
    </cr-crud-form>
  </cr-crud>
</template>

<script>

import ctt from "@/components/parametros/Constants";
import CrPanel from '../framework/form/crPanel';
import CrCrud from '../framework/crud/crCrud';
import CrCrudGrid from '../framework/crud/crCrudGrid';
import CrCrudForm from '../framework/crud/crCrudForm';

export default {
  name: "EnsaioTipoCad",
  components: {CrPanel,CrCrud,CrCrudGrid,CrCrudForm},
  data: function () {
    let self = this;
    return {
      lista: [],
      cadastro: {},
      crudConf: {
        url: ctt.rest + '/ensaio',
      },
      gridConf: {
        fields: 'Nome|100=>nome,Unidade|100=>unidade.nome'
      },
    };
  },
  methods: {

  }
}
</script>

<style scoped>

</style>