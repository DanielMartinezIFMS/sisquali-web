<template>
  <cr-crud collection="lista" entity="cadastro" config="crudConf">
    <cr-crud-grid :config="gridConf" class="mt-2"/>
    <cr-crud-form>
      <cr-tab>
        <cr-tab-sheet title="Geral">
          <cr-panel columns="3" boxShadow labelTop>
            <input-longtext label="Nome da atividade ou método" colspan="2" v-model="cadastro.nome" />
            <input-text label="Abreviação" v-model="cadastro.sigla"/>
            <input-domain label="Tipo de Serviço" cod-group="3" v-model="cadastro.servicoTipo"/>
            <input-domain label="Área do Serviço" cod-group="4" v-model="cadastro.servicoArea"/>
            <input-text label="ID da Atividade ou Método" v-model="cadastro.codigo"/>
            <input-integer label="Numero padrão de repetições" min="0" v-model="cadastro.qtdeRepeticao"/>
            <input-integer label="Numero de ensaios/dia" min="0" v-model="cadastro.qtdeEnsaioDiario"/>
            <input-integer label="Carência(dias)" min="0" v-model="cadastro.carencia"/>
            <input-currency label="Preço(R$)" v-model="cadastro.preco"/>
            <input-currency label="Custo(R$)" v-model="cadastro.custo"/>
            <span></span>
            <input-check label="A cobrança deverá ser feita por lote de amostras analizadas" colspan="3" v-model="cadastro.cobrarPorLote"/>
            <span></span><span></span>
            <input-currency label="Preço por Lote(R$)" v-model="cadastro.precoPorLote"/>
            <input-currency label="Custo por Lote(R$)" v-model="cadastro.custoPorLote"/>
            <input-integer label="Numero de amostras/Lote" min="0" v-model="cadastro.qtdeAmostraPorLote"/>
            <input-check label="Gerar laudo de todas as amostras individualmente" colspan="3" v-model="cadastro.gerarLaudoIndividual"/>
            <span></span><span></span>
            <input-check label="Ativo no escopo" colspan="3"  v-model="cadastro.ativoNoEscopo"/>
            <span></span><span></span>
            <input-check label="Acreditado na norma ISO 17.025" colspan="3" v-model="cadastro.iso17025"/>






          </cr-panel>


        </cr-tab-sheet>
        <cr-tab-sheet title="CICA"></cr-tab-sheet>
        <cr-tab-sheet title="Responsáveis"></cr-tab-sheet>
        <cr-tab-sheet title="Config.Resgistro"></cr-tab-sheet>
        <cr-tab-sheet title="Parâmetros"></cr-tab-sheet>
        <cr-tab-sheet title="Amostras">ops</cr-tab-sheet>
      </cr-tab>
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
import CrTab from "../framework/common/crTab";
import CrTabSheet from "../framework/common/crTabSheet";
import inputLongtext from "../framework/form/inputLongtext";
import inputText from "../framework/form/inputText";
import InputDomain from "../framework/form/advanced/inputDomain";
import inputCurrency from "../framework/form/inputCurrency";
import inputInteger from "../framework/form/inputInteger";
import InputCheck from "../framework/form/inputCheck";

export default {
  name: "EnsaioTipoCad",
  components: {
    InputCheck,
    inputInteger,InputDomain,inputCurrency, CrTabSheet, CrTab, CrPanel,CrCrud,CrCrudGrid,CrCrudForm,inputLongtext,inputText},
  data: function () {
    //let self = this;
    return {
      lista: [],
      cadastro: {},
      crudConf: {
        url: ctt.rest + '/ensaio',
      },
      gridConf: {
        fields: 'ID da ATIV. ou MET.|100=>codigo,NOME da ATIVIDADE OU MÉTODO|100=>nome,ABREVIAÇÃO|30=>sigla,TIPO DE SERVIÇO|50=>servicoTipo.nome'
      },
    };
  },
  methods: {

  }
}
</script>

<style scoped>

</style>