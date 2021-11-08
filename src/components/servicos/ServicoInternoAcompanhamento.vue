<template>
<cr-tab>
  <cr-tab-sheet title="Dados Básicos">
    <cr-panel boxShadow columns="2">
      <cr-display label="Formulário de solicitação de serviço (FSS)" v-model="servico.servicoNumero" colspan="2"/>
      <cr-display label="Projeto" v-model="servico.projeto"/>
      <cr-display label="Data de solitação" v-model="servico.dSolicitacao" mask="DATA"/>
      <span> </span>
      <cr-display label="Previsão de entrega das amostras" v-model="servico.dPrevisaoEntrega" mask="DATA"/>
      <cr-table :collection="servico.historicoServicos" :config="historicoServicoConfig" colspan="2" title="Histórico da solicitação de serviço"/>
    </cr-panel>
  </cr-tab-sheet>
  <cr-tab-sheet title="Ensaios">
    <cr-panel boxShadow>
      <cr-table :collection="servico.historicoEnsaios" :config="hitoricoEnsaioConfig" title="Histórico da solicitação de serviço - Ensaio"/>
    </cr-panel>
  </cr-tab-sheet>
</cr-tab>
</template>

<script>
import CrTab from "@/components/framework/common/crTab";
import CrTabSheet from "@/components/framework/common/crTabSheet";
import CrPanel from "@/components/framework/form/crPanel";
import CrDisplay from "@/components/framework/form/crDisplay";
import CrTable from "@/components/framework/common/crTable";
export default {
  name: "ServicoInternoAcompanhamento",
  components: {CrTable, CrDisplay, CrTabSheet, CrTab, CrPanel},
  data: function(){
    return {
      servico: {
        servicoNumero: "0002/2021",
        projeto: "13.16.05.004",
        dSolicitacao: new Date(),
        dPrevisaoEntrega: new Date(),
        historicoServicos: [
          {dhCriacao: new Date(), usuarioResponsavel: {nome: "daniel"}, dominioAtividade: {nome: "Revisão da solicitação"}, dominioStatus: {nome: "Aguardando revisão"}},
          {dhCriacao: new Date(), usuarioResponsavel: {nome: "ivan"}, dominioAtividade: {nome: "Análise da solicitação"}, dominioStatus: {nome: "Aguardando análise"}},
          {dhCriacao: new Date(), usuarioResponsavel: {nome: "roger"}, dominioAtividade: {nome: "Solicitação de serviço"}, dominioStatus: {nome: "Registrado"}},

        ],
        historicoEnsaios: [
          {tipoAmostra: "Soja, farelo", codigoAmostra: "farelo 1", tipoEnsaio: "MS , CZ"},
          {tipoAmostra: "Soja, farelo", codigoAmostra: "farelo 2", tipoEnsaio: "MS , CZ"},
          {tipoAmostra: "Soja, farelo", codigoAmostra: "farelo 3", tipoEnsaio: "MS , CZ"},
          {tipoAmostra: "Soja, farelo", codigoAmostra: "farelo 4", tipoEnsaio: "MS , CZ"}
        ]
      },
      historicoServicoConfig: {
        fields: "DATA|50|mask(DATAHORA)=>dhCriacao, RESPONSÁVEL|100=>usuarioResponsavel.nome, ATIVIDADADE|50=>dominioAtividade.nome, STATUS|50=>dominioStatus.nome",
      },
      hitoricoEnsaioConfig: {
        fields: "Tipo de amostra|50=>tipoAmostra, Código da amostra|50=>codigoAmostra, Tipo de ensaio|50=>tipoEnsaio"
      }
    }
  }
}
</script>

<style scoped>

</style>