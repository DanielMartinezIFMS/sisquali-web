<template>
    <cr-crud collection="lista" entity="cadastro" config="crudConf">
        <cr-crud-grid :config="gridConf" class="mt-2"/>

        <cr-crud-form>
          <cr-panel boxShadow labelTop>
            <input-auto label="Projeto" v-model="cadastro.projeto" :config="projetoConf"/>
            <input-combo label="Laboratório" v-model="cadastro.laboratorio" @change="(lab)=>{this.ensaios = lab.ensaios;}" :collection="laboratorios"/>
            <input-combo label="Ensaio" v-model="cadastro.ensaio" @change="(ens)=>{this.amostras = ens.tipoAmostras;}" :collection="ensaios"/>
            <input-combo label="Tipo de Amostra" v-model="cadastro.amostraTipo" :collection="amostras" display="descricao"/>
            <input-integer label="Quantidade" v-model="cadastro.quantidade" />
            <input-date label="Data de Entrega" v-model="cadastro.dtEntrega"/>

          </cr-panel>
          <cr-crud-buttons/>
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
import InputInteger from '@/components/framework/form/inputInteger';
import InputDate from '@/components/framework/form/inputDate';
import CrCrudButtons from '../framework/crud/crCrudButtons';
    export default {
      name: 'PlanoOperacionalCad',
      components: {InputAuto, CrCrud, CrCrudGrid, CrCrudForm, CrPanel,InputCombo, InputInteger, InputDate, CrCrudButtons},
      data: function () {
        return {
          lista: [],
          ensaios: [],
          amostras: [],
          cadastro: {},

          crudConf: {
            url: ctt.rest + '/planoOperacinal',
            onBeforeSave: function (ent, op){
              if(op==='INSERT'){
                ent.status= this.status;
              }
            }
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
        this.status = await this.$get(ctt.rest+'/dominio/5');

      }
    }
</script>


<style scoped>

</style>