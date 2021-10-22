<template>
  <cr-crud collection="lista" entity="cadastro" config="crudConf" :validatorConf="validConf">
    <cr-crud-grid :config="gridConf" class="mt-2"/>
    <cr-crud-form>
      <cr-tab>
        <cr-tab-sheet title="Geral">
          <cr-panel columns="6" boxShadow labelTop>
            <input-longtext colspan="3"     ref="nomeativ"  label="Nome da atividade ou método"  v-model="cadastro.nome"/>
            <input-text     ref="abrev"     label="Abreviação" v-model="cadastro.sigla"/>
            <input-text     colspan="2"     ref="idAtv"     label="ID da Atividade ou Método" v-model="cadastro.codigo"/>
            <input-domain   ref="tipsvc"    label="Tipo de Serviço" cod-group="3" v-model="cadastro.servicoTipo"/>
            <input-domain   ref="areasvc"   label="Área do Serviço" cod-group="4" v-model="cadastro.servicoArea"/>
            <span colspan="4"> </span>
            <input-file-up  colspan="3"     label="Procedimento Operacional Padrão - POP (pdf,doc,docx,odt)" v-model="cadastro.popversao.nome" group="documento" accept=".pdf"/>
            <input-file-up  colspan="3"     label="Condições para recebimento de Amostras - CRA (pdf,doc,docx,odt)" v-model="cadastro.craversao.nome" group="documento" accept=".pdf"/>
            <input-integer  colspan="2" ref="numRept"   label="Número padrão de repetições" min="0" v-model="cadastro.qtdeRepeticao"/>
            <input-integer  label="Número de ensaios/dia" min="0" v-model="cadastro.qtdeEnsaioDiario"/>
            <input-integer  label="Carência(dias)" min="0" v-model="cadastro.carencia"/>
            <input-currency label="Preço(R$)" v-model="cadastro.preco"/>
            <input-currency label="Custo(R$)" v-model="cadastro.custo"/>

            <input-check    colspan="2"     label="A cobrança deverá ser feita por lote de amostras analizadas"
                            v-model="cadastro.cobrarPorLote" @change="$forceUpdate()"/>
            <span colspan="5"> </span>
            <cr-panel colspan="6" columns="6" v-if="cadastro.cobrarPorLote" >
              <input-currency label="Preço por Lote(R$)" v-model="cadastro.precoPorLote"/>
              <input-currency label="Custo por Lote(R$)" v-model="cadastro.custoPorLote"/>
              <input-integer  label="Numero de amostras/Lote" min="0" v-model="cadastro.qtdeAmostraPorLote"/>
              <span colspan="3"> </span>
            </cr-panel>
            <cr-panel colspan="6">
              <input-check    label="Gerar laudo de todas as amostras individualmente"
                              v-model="cadastro.gerarLaudoIndividual"/>
              <input-check    label="Ativo no escopo" v-model="cadastro.ativoNoEscopo"/>
              <input-check    label="Acreditado na norma ISO 17.025" v-model="cadastro.iso17025"/>
            </cr-panel>
          </cr-panel>
        </cr-tab-sheet>
        <cr-tab-sheet title="CICA">
          <cr-panel labelTop>
            <h3 class="ml-2">Controle de Instalações e Condições Ambientais - CICA </h3>
            <input-group label="Ensaio exige controles diferentes dos normais informados na 'Politica e procedimento para
                                     instalações físicas, condições ambientais e segurança'? ">
              <input-radio v-model="cadastro.controleDiferente" label="Sim" :true-value="true"
                           name="controleDiferente" @change="atualizarControle()"/>
              <input-radio v-model="cadastro.controleDiferente" label="Não" :true-value="false"
                           name="controleDiferente" class="ml-3" @change="atualizarControle()"/>
            </input-group>
            <cr-panel columns="2" box class="ph-0" v-if="cadastro.controleDiferente">
              <input-group label="Parâmetro a ser registrado na condição ambiental monitorada">
                <input-domain v-model="monitoramento.parametroMonitorado" cod-group="5" class="pl-0"/>
                <input-text v-model="monitoramento.parametroOutro"
                            v-if="monitoramento.parametroMonitorado && monitoramento.parametroMonitorado.id===33"/>
              </input-group>
              <input-group label="Unidade de medida (UM)">
                <input-domain v-model="monitoramento.unidadeMedida" cod-group="6" class="pl-0"/>
                <input-text v-model="monitoramento.unidadeMedidaOutra"
                            v-if="monitoramento.unidadeMedida && monitoramento.unidadeMedida.id===69"/>
              </input-group>
              <cr-panel columns="3">
                <input-fractional v-model="monitoramento.limiteInferior" label="Limite inferior (LI)"/>
                <input-fractional v-model="monitoramento.limiteSuperior" label="Limite superior (LS)"/>
              </cr-panel>
              <div>
                <cr-bt class="mt-5" primary @click="adicionarPm()">Cadastrar</cr-bt>
                <cr-bt class="mt-5" warning @click="monitoramento={}">Limpar</cr-bt>
              </div>
              <cr-table :config="parConf" :collection="cadastro.parametroMonitoramentos" colspan="2"
                        class="mh-2"/>
            </cr-panel>
          </cr-panel>
        </cr-tab-sheet>
        <cr-tab-sheet title="Responsáveis">
          <cr-panel columns="2" boxShadow>
            <cr-panel box labelTop>
              <input-group label="Responsável Técnico" class="pl-0 pb-0">
                <input-auto class="pl-0" ref="responsavel" remaining v-model="novosup"
                            :config="usuarioConf"/>
                <cr-bt class="mt-1" primary icon="plus" @click="()=>adicionarSup()" :desabled="!this.novosup">Inserir</cr-bt>
              </input-group>
              <cr-table colspan="7" :config="superConf" :collection="cadastro.responsaveisTecnicos"/>
            </cr-panel>
            <cr-panel box labelTop>
              <input-group label="Laboratorista" class="pl-0 pb-0">
                <input-auto class="pl-0" ref="laboratorista" remaining v-model="novolab"
                            :config="usuarioConf"/>
                <cr-bt class="mt-1" primary icon="plus" @click="()=>adicionarLab()" :desabled="!this.novolab">Inserir</cr-bt>
              </input-group>
              <cr-table colspan="7" :config="labConf" :collection="cadastro.laboratoristas"/>
            </cr-panel>
          </cr-panel>
        </cr-tab-sheet>
        <cr-tab-sheet title="Config.Resgistro"></cr-tab-sheet>
        <cr-tab-sheet title="Parâmetros">
          <cr-panel columns="5" boxShadow labelTop>
                <input-date v-model="novopar.dataInicio" label="Data" ref="datIn"/>
                <input-fractional v-model="novopar.limiteDeteccao" label="Limite de detecção"/>
                <input-fractional v-model="novopar.limiteQuantificacao" label="Limite de quantificação"/>
                <input-fractional v-model="novopar.repetibilidade" label="Repetibilidade"/>
                <input-fractional v-model="novopar.reprodutibilidade" label="Reprodutibilidade"/>
                <input-fractional v-model="novopar.taxaRecuperacao" label="Taxa de recuperação"/>
                <input-fractional v-model="novopar.incertezaMedicao" label="Incerteza de Medição"/>
                <input-fractional v-model="novopar.desvioPadrao" label="Desvio padrão"/>
                <input-fractional v-model="novopar.coeficienteVariacao" label="Coeficiente de variação"/>
            <cr-bt class="mt-5 ml-2" primary wAuto icon="plus" @click="()=>adicionarPar()" :desabled="!this.novopar">Adicionar parâmetros</cr-bt>
            <cr-table colspan="7"  :config="parEnsConf" :collection="cadastro.parametros"/>
          </cr-panel>
        </cr-tab-sheet>
        <cr-tab-sheet title="Amostras">
            <cr-panel labelTop>
                <h4 class="ml-3">Selecione os tipos de amostra para os quais este ensaio pode ser solicitado
                    (subtipos incluídos automaticamente).</h4>
                <cr-panel columns="3">
                    <input-auto label="Tipo de amostra*" ref="autoTipoAmostra" v-model="tipoAmostra" :config="tipoAmostraConf" class="ml-1"/>
                    <cr-bt primary @click="()=>this.adicionarAmostraTipo()" class="mt-5">Adicionar</cr-bt>
                </cr-panel>
                <cr-panel>
                    <cr-table :config="listaAmostraConf" :collection="cadastro.tipoAmostras" class="mh-3"/>
                </cr-panel>
            </cr-panel>
        </cr-tab-sheet>
      </cr-tab>
      {{ monitoramento.unidadeMedida }}
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
import InputRadio from "../framework/form/inputRadio";
import inputGroup from "../framework/form/inputGroup";
import inputFractional from "../framework/form/inputFractional";
import CrBt from "../framework/common/crButton";
import CrTable from "../framework/common/crTable";
import inputAuto from "../framework/form/advanced/inputAuto";
import inputFileUp from "../framework/form/advanced/inputFileUp";
import {CrREQUIRED} from "../framework/CrValidator";

export default {
  name: "EnsaioTipoCad",
  components: {inputFileUp, CrTable,inputAuto,InputRadio,InputCheck,inputInteger,InputDomain,inputCurrency,CrTabSheet,CrTab,CrPanel,CrCrud,CrCrudGrid,CrCrudForm,inputLongtext,inputText,inputGroup,inputFractional,CrBt,},
  data: function () {
    let self = this;
    return {
        lista: [],
        tipoAmostra: {},
        cadastro: {popversao: {}, craversao: {}},
        monitoramento: {},
        crudConf: {
            url: ctt.rest + '/ensaio',
            onNew: function (entity) {
                entity.popversao = {};
                entity.craversao = {};
            },
            onBeforeEdit: function (entity) {
                if (!entity.popversao) {
                    entity.popversao = {};
                    entity.craversao = {};
                }
            }
        },
        validConf: {
            nomeativ: CrREQUIRED(),
            abrev: CrREQUIRED(),
            tipsvc: CrREQUIRED(),
            areasvc: CrREQUIRED(),
            idAtv: CrREQUIRED(),
            numRept: CrREQUIRED()
        },
        novolab: undefined,
        novosup: undefined,
        novopar: {},
        gridConf: {
            fields: 'ID da ATIV. ou MET.|100=>codigo,NOME da ATIVIDADE OU MÉTODO|100=>nome,ABREVIAÇÃO|30=>sigla,TIPO DE SERVIÇO|50=>servicoTipo.nome'
        },
        usuarioConf: {
            url: ctt.rest + '/usuario'
        },
        superConf: {
            fields: 'Nome|100=>nome',
            emptyMessage: 'Nenhum Responsável Técnico',
            options: {
                title: "Excluir",
                width: 10,
                buttons: [{icon: 'minus', label: '', click: (sup) => self.removerSup(sup)}]
            }
        },
        labConf: {
            fields: 'Nome|100=>nome',
            emptyMessage: 'Nenhum Laboratorista',
            options: {
                title: "Excluir",
                width: 10,
                buttons: [{icon: 'minus', label: '', click: (lab) => self.removerLab(lab)}]
            }
        },
        parConf: {
            fields: 'Parâmetro|100=>parametroMonitorado.nome, UM|100=>unidadeMedida.nome, L.I|30=>limiteInferior, L.S|30=>limiteSuperior',
            emptyMessage: 'Nenhum parâmetro informado!',
            options: {
                title: 'Opções',
                width: 30,
                buttons: [
                    {
                        icon: 'edit',
                        click: function (parametro) {
                            self.monitoramento = parametro;
                        }
                    }
                ],
            },
        },
        parEnsConf: {
            fields: "Data|50|mask(DATA)=>dataInicio, Limite de Detecção|50=>limiteDeteccao, Limite de Quantificação|30=>limiteQuantificacao, Repetibilidade|30=>repetibilidade, Reprodutibilidade|30=>reprodutibilidade, Taxa de Reprodução|30=>taxaRecuperacao, Incerteza de Medição|30=>incertezaMedicao, Desvio Padrão|30=>desvioPadrao, Coeficiente de Variação|30=>coeficienteVariacao",
            emptyMessage: 'Nenhum parâmetro informado!',
            options: {
                title: 'Opções',
                width: 30,
                buttons: [{icon: 'minus', label: '', click: (par) => self.removerPar(par)}
                ],
            },
        },
        listaAmostraConf: {
            emptyMessage: 'Nenhum tipo de amostra selecionado!',
            fields: 'Tipo de Amostra|100=>descricao',
            options: {
                title: "Excluir",
                width: 10,
                buttons: [
                    {
                        icon: 'times-circle',
                        click: (at) => self.removerAmostraTipo(at)
                    }
                ]
            }
        },
        tipoAmostraConf: {
          url: ctt.rest + '/amostraTipo',
            displayField: 'descricao',
      },
    };
  },
  methods: {
    atualizarControle: function(){
      this.$forceUpdate();
    },
    adicionarPm: function () {
      if (!this.cadastro.parametroMonitoramentos) {
        this.cadastro.parametroMonitoramentos = [];
      }
      if (this.cadastro.parametroMonitoramentos.indexOf(this.monitoramento) === -1) {
        this.cadastro.parametroMonitoramentos.push(this.monitoramento);
      }
      this.monitoramento = {};
    },
    adicionarSup: function () {
      if (!this.cadastro.responsaveisTecnicos) {
        this.cadastro.responsaveisTecnicos = [];
      }
      this.cadastro.responsaveisTecnicos.push(this.novosup);
      this.$forceUpdate();
    },
    adicionarPar: function () {
      if(!this.novopar.dataInicio){
        this.$refs.datIn.error("Informe a data!");
        return;
      }
      this.$refs.datIn.ok();
      if(!this.cadastro.parametros){
        this.cadastro.parametros = [];
        }
      this.cadastro.parametros.push(this.novopar);
      this.novopar={};
      this.$forceUpdate();

    },
    adicionarLab: function () {
      if (!this.cadastro.laboratoristas) {
        this.cadastro.laboratoristas = [];
      }
      this.cadastro.laboratoristas.push(this.novolab);
      this.$forceUpdate();
    },
      adicionarAmostraTipo: function () {
        if(!this.tipoAmostra.descricao) {
            this.$refs.autoTipoAmostra.error('informe o tipo de amostra!');
        }else{
            this.$refs.autoTipoAmostra.ok();
            if (!this.cadastro.tipoAmostras) {
                this.cadastro.tipoAmostras = [];
            }
            this.cadastro.tipoAmostras.push(this.tipoAmostra);
            this.tipoAmostra = {};
            this.$forceUpdate();
        }
      },
      removerAmostraTipo: function (at) {
          this.cadastro.tipoAmostras.splice(this.cadastro.tipoAmostras.indexOf(at), 1);
      },
    removerSup: function (sup) {
      this.cadastro.responsaveisTecnicos.splice(this.cadastro.responsaveisTecnicos.indexOf(sup), 1);
    },
    removerLab: function (lab) {
      this.cadastro.laboratoristas.splice(this.cadastro.laboratoristas.indexOf(lab), 1);
    },
    removerPar: function (par) {
      this.cadastro.parametros.splice(this.cadastro.parametros.indexOf(par), 1);
    },
  }
}
</script>

<style scoped>

</style>