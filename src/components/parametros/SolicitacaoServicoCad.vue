<template>
  <cr-panel>
    <cr-panel title="Filtro" columns="3" class="m-5" labelTop>
      <input-longtext label="Nome solicitante" v-model="fnome" />
      <cr-bt primary @click="()=>this.filtrar()" class="mt-6">Filtrar</cr-bt>
      <cr-panel>
        <span>
          <div style="width: 100px; height: 100px; background: red; -moz-border-radius: 50px; -webkit-border-radius: 50px; border-radius: 50px;"></div>
          Ensaios não iniciados
        </span>
        <span>
          <div style="width: 100px; height: 100px; background: black; -moz-border-radius: 50px; -webkit-border-radius: 50px; border-radius: 50px;"></div>
          Ensaios cancelados
        </span>

      </cr-panel>
    </cr-panel>
    <cr-table :config="listaConfig" :collection="lista" class="mh-2"/>
  </cr-panel>
</template>

<script>
import ctt from "./Constants";
import CrPanel from "../framework/form/crPanel";
import CrBt from "../framework/common/crButton";
import CrTable from "../framework/common/crTable";
import inputLongtext from "../framework/form/inputLongtext";

export default {
  name: "PlanoOperacionalAprov",
  components: { CrTable, CrBt, CrPanel, inputLongtext},

  data: function () {
    let self = this;
    return {
      fnome: undefined,
      lista: [],
      listaConfig: {
        options: {
          title: 'I',
          width: 60,
          buttons: [
            {
              icon: 'exclamation-circle', click: function (solicitacao) {
                //abrir tela de informacao de acompanhamento da solicitacao
              },
            },
            {
              icon: 'search', click: function (solicitacao) {
                //abrir tela de analisar solicitacao de servico
              },
              show: function (solicitacao){
                return (solicitacao.status.nome!=ctt.AGUARDANDO_ANALISE);
              }
            },
          ]
        },
        emptyMessage: 'Nenhuma solicitação de serviço selecionada!',
        fields: 'Solicitação|60C=>codigoSolicitacao,Nome Solicitante|60=>solicitante.nome,Tipos de amostras|60=>???,No.|20C=>???,Ensaios/Planilhas|100=>???,Previsão entrega|60C|mask(DATA)=>dtPrevisaoEntrega,Status Solicitação|60C=>status.nome',
        converters: {
            'status.nome':function(situacao){
                    return '<div>' + situacao.nome + '</div>';
            }
        }
      },
    };
  },
  methods: {
    filtrar: async function () {
      let args = {}
      if (this.fnome && this.fnome.empty) {
        args.fnome = this.fnome;
      }

      this.lista = await this.$get(ctt.rest + '/servico/listar?args=' + encodeURI(JSON.stringify(args)));
    },
  },

  created: async function () {
    this.lista = await this.$get(ctt.rest + '/servico/listar');
  }
}
</script>

<style scoped>

</style>