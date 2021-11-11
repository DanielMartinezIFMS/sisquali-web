<template>
    <cr-crud collection="lista" entity="cadastro" config="crudConf" >
        <cr-crud-grid :config="gridConf" class="mt-2"/>
        <cr-crud-form>
          <cr-panel>
            <cr-tab>
              <cr-tab-sheet title="Dados Básicos">
                <cr-panel columns="3" boxShadow labelTop>
                  <cr-panel labelLeft="100">
                    <cr-display label="Formulario de solicitação de serviço (FSS)" v-model="cadastro.codigoSolicitacao"/>
                  </cr-panel>
                  <span> </span> <span> </span>
                  <input-combo :collection="laboratorios" v-model="cadastro.laboratorio" label="Laboratório"/>
                  <input-combo :collection="projetos" v-model="cadastro.projeto" label="Projeto" display="codigo" />
                  <input-date label="Previsão de entrega das amostras" v-model="cadastro.dtPrevisaoEntrega" />
                  <input-area rows="5" label="Historico clínico" v-model="cadastro.historicoClinico" colspan="3" />
                  <input-area rows="5" label="Observações" v-model="cadastro.observacao" colspan="3" />
                </cr-panel>
              </cr-tab-sheet>
              <cr-tab-sheet title="Ensaios">
                <cr-bt @click="adicionarEnsaio">adicionar</cr-bt>

              </cr-tab-sheet>
            </cr-tab>
          </cr-panel>
            <cr-crud-buttons/>
        </cr-crud-form>
      <cr-window title="Amostras e ensaios" ref="AmostraEnsaioW">
        <cr-panel boxShadow>
          <input-combo :collection="tiposAmostra" display="descricao" v-model="amostraSel" label="Tipo de Amostra"/>
           <cr-table :collection="planosFiltrado" :config="planosConf"></cr-table>
        </cr-panel>
      </cr-window>
    </cr-crud>
</template>

<script>
import CrPanel from '../framework/form/crPanel';
import CrCrud from '../framework/crud/crCrud';
import CrCrudGrid from '../framework/crud/crCrudGrid';
import CrCrudForm from '../framework/crud/crCrudForm';
import ctt from '../parametros/Constants';
import CrDisplay from "../framework/form/crDisplay";
import inputCombo from "../framework/form/inputCombo";
import CrTab from "../framework/common/crTab";
import CrTabSheet from "../framework/common/crTabSheet";
import CrTable from "../framework/common/crTable";
import crWindow from "../framework/common/crWindow";

export default {
    name: "ServicoInternoCad",
    components: {
      CrTable,
      CrTabSheet,
      CrTab,
      crWindow,
        CrDisplay, inputCombo,
        CrPanel, CrCrud, CrCrudGrid, CrCrudForm
    },
    data: function () {
        return {
            lista: [],
            cadastro: {},
            amostraSel: undefined,
            laboratorios: [],
            status: [],
            projetos: [],
            planos: [],
            tiposAmostra: [],
            gridConf: {
                fields: 'Solicitação|30=>codigoSolicitacao,Tipos de amostras|40=>codigoSolicitacao,Nº|10=>codigoSolicitacao,Ensaios/Planilhas|100=>codigoSolicitacao,Status|40=>status.nome'
            },
            crudConf: {
                url: ctt.rest + '/servico',
            },
            planosConf: {
              fields: 'Ensaio|10=>ensaio.sigla,Saldo|20=>saldo,Previsão de Entrega|20=>dtEntrega,Status|20=>situacao.nome',
            },
        }
    },
    computed: {
      planosFiltrado: function(){
        return this.planos.filter((plano)=>{
          return (plano.amostraTipo.id === this.amostraSel.id);
        });
      }
    },
    created: async function () {
        this.laboratorios = await this.$get(ctt.rest + '/laboratorio/listar');
        this.status = await this.$get(ctt.rest + '/dominio/5');
        this.projetos = await this.$get(ctt.rest + '/projeto/listar');
    },
    methods:{
      adicionarEnsaio: async function (){
        this.planos = await this.$get(this.$crUtils.filteredUrl(ctt.rest + '/planoOperacional',{codprojeto:this.cadastro.projeto.codigo,idLaboratorio:this.cadastro.laboratorio.id}));
        let mapa = {};
        this.planos.map((plano)=>{
          mapa[plano.amostraTipo.id] = plano.amostraTipo;
        });
        this.tiposAmostra = Object.values(mapa);
        this.amostraSel = this.tiposAmostra[0];
        this.$refs.AmostraEnsaioW.open();
      }
    }
}
</script>

<style scoped>

</style>