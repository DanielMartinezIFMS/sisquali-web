<template>
    <cr-crud collection="lista" entity="cadastro" config="crudConf">
        <cr-crud-grid :config="gridConf" class="mt-2"/>

        <cr-crud-form>
          <cr-panel boxShadow labelTop>
            <input-auto label="Projeto" v-model="cadastro.projeto" :config="projetoConf"/>
            <input-combo label="Laboratório" v-model="cadastro.laboratorio" :collection="laboratorios"/>

          </cr-panel>
        </cr-crud-form>
    </cr-crud>
</template>

<script>
import CrCrud from '../framework/crud/crCrud';
import ctt from '../parametros/Constants';
import CrCrudGrid from '../framework/crud/crCrudGrid';
import CrCrudForm from '../framework/crud/crCrudForm';
import CrPanel from '../framework/form/crPanel';
import InputAuto from '@/components/framework/form/advanced/inputAuto';
import InputCombo from '@/components/framework/form/inputCombo';
    export default {
      name: 'PlanoOperacionalCad',
      components: {InputAuto, CrCrud, CrCrudGrid, CrCrudForm, CrPanel,InputCombo},
      data: function () {
        return {
          lista: [],
          ensaios: [],
          amostras: [],
          cadastro: {},

          crudConf: {
            url: ctt.rest + '/planoOperacinal'
          },
          projetoConf: {
            url: ctt.rest + '/projeto',
            displayField: 'codigo'
          },
          gridConf: {
            fields: 'Projeto|100=>projeto.codigo,Laboratório|100=>laboratorio.nome,Ensaio|100=>ensaio.nome,Tipo de Amostra|100=>amostraTipo.descricao,Quantidade|100=>quantidade,Data da Entrega|100=>dtEntrega,Status|100=>situacao.nome'
          },
          laboratorios: [],

        }
      },
      created: async function () {
        this.laboratorios = await this.$get(ctt.rest+'/laboratorio/listar');

      }
    }
</script>


<style scoped>

</style>