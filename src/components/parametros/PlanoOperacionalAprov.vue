<template>
  <cr-panel>
    <cr-panel columns="4" class="m-5" labelTop>
      <input-auto label="Projeto" v-model="projeto" :config="projetoConf"/>
      <input-combo label="Laboratório" @change="(lab)=>{this.ensaios = lab.ensaios;}" v-model="laboratorio"
                   :collection="laboratorios"/>
      <input-combo label="Ensaio" @change="(ens)=>{this.amostras = ens.tipoAmostras;}" v-model="ensaio"
                   :collection="ensaios"/>
      <input-combo label="Tipo de Amostra" v-model="amostraTipo" :collection="amostras" display="descricao"/>
      <cr-panel columns="2" colspan="2" labelTop box>
        <span><b>Data da Entrega</b></span><span></span>
        <input-date v-model="inicio" label="Data Inicial"/>
        <input-date v-model="final" label="Data Final"/>
      </cr-panel>
      <input-domain label="Status" v-model="status" cod-group="2"/>
      <cr-bt primary @click="()=>this.filtrar()" class="mt-6">Filtrar</cr-bt>
    </cr-panel>
    <cr-table :config="listaConfig" :collection="lista" class="mh-2"/>
  </cr-panel>
</template>

<script>
import ctt from "./Constants";
import CrPanel from "../framework/form/crPanel";
import inputCombo from "../framework/form/inputCombo";
import inputDate from "../framework/form/inputDate";
import inputAuto from "../framework/form/advanced/inputAuto";
import InputDomain from "../framework/form/advanced/inputDomain";
import CrBt from "../framework/common/crButton";
import CrTable from "../framework/common/crTable";

export default {
  name: "PlanoOperacionalAprov",
  components: {CrTable, CrBt, InputDomain, CrPanel, inputCombo, inputDate, inputAuto},

  data: function () {
    let self = this;
    return {
      unidades: [],
      lista: [],
      amostras: [],
      ensaios: [],
      laboratorios: [],

      projeto: undefined,
      laboratorio: undefined,
      ensaio: undefined,
      amostraTipo: undefined,
      inicio: undefined,
      final: undefined,
      status: undefined,

      projetoConf: {
        url: ctt.rest + '/projeto',
        displayField: 'codigo'
      },
      listaConfig: {
        options: {
          title: 'Operações',
          width: 60,
          buttons: [
            {
              icon: 'check-circle', title: 'Aprovar plano operacional', click: function (planoOperacional) {
                self.aprovar(planoOperacional);
              }
            },
            {
              icon: 'times-circle', title: 'Rejeitar plano operacional', click: function (planoOperacional) {
                self.rejeitar(planoOperacional);
              }
            },
          ]
        },
        emptyMessage: 'Nenhum plano operacional selecionado!',
        fields: 'Projeto|50=>projeto.codigo,Solicitante|100=>usuarioCriacao.nome,Laboratório|100=>laboratorio.nome,Ensaio|100=>ensaio.nome,Tipo de Amostra|100=>amostraTipo.descricao,Quantidade|45C=>quantidade,Data da Entrega|60C|mask(DATA)=>dtEntrega,Status|100C=>situacao.nome'
      },
    };
  },
  methods: {
    filtrar: async function () {
      let args = {}
      if (this.projeto && this.projeto.codigo) {
        args.codprojeto = this.projeto.codigo;
      }
      if (this.laboratorio && this.laboratorio.id) {
        args.idLaboratorio = this.laboratorio.id;
      }
      if (this.ensaio && this.ensaio.id) {
        args.idEnsaio = this.ensaio.id;
      }
      if (this.amostraTipo && this.amostraTipo.id) {
        args.idAmostraTipo = this.amostraTipo.id;
      }
      if (this.status && this.status.id) {
        args.idSituacao = this.status.id;
      }
      if (this.inicio && this.final) {
        args.inicioEntrega = this.inicio;
        args.finalEntrega = this.final;
      }
      this.lista = await this.$get(ctt.rest + '/planoOperacinal/listar?args=' + encodeURI(JSON.stringify(args)));
    },
    aprovar: function (planoOperacional) {
      console.log(planoOperacional);
    },
    rejeitar: function (planoOperacional) {
      console.log(planoOperacional);
    },
  },
  created: async function () {
    this.laboratorios = await this.$get(ctt.rest + '/laboratorio/listar');
  }
}
</script>

<style scoped>

</style>