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
      <cr-window title="Registro de rejeição" width="80%" ref="wRejeicao">
          <cr-panel boxShadow labelTop>
              <input-area ref="justificativa" label="Justificativa" v-model="justificativa" rows="5"/>
              <div class="flexRow">
                  <div class="flexGrow"/>
                  <cr-bt error class="flexEnd pr-1" @click="()=>rejeitar()">Rejeitar</cr-bt>
              </div>
          </cr-panel>
      </cr-window>
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
import CrWindow from "../framework/common/crWindow";
import inputArea from "../framework/form/inputArea";

export default {
  name: "PlanoOperacionalAprov",
  components: {inputArea, CrWindow, CrTable, CrBt, InputDomain, CrPanel, inputCombo, inputDate, inputAuto},

  data: function () {
    let self = this;
    return {
      unidades: [],
      lista: [],
      amostras: [],
      ensaios: [],
      laboratorios: [],

        justificativa: undefined,
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
              }, show: function (plano){
                    return (plano.dhRegeicao===undefined && plano.dhAprovacao===undefined);
                },
            },
            {
              icon: 'times-circle', title: 'Rejeitar plano operacional', click: function (planoOperacional) {
                self.iniciarRejeicao(planoOperacional);
              }, show: function (plano){
                    return (plano.dhRegeicao===undefined && plano.dhAprovacao===undefined);
                },
            },
          ]
        },
        emptyMessage: 'Nenhum plano operacional selecionado!',
        fields: 'Projeto|50=>projeto.codigo,Solicitante|100=>usuarioCriacao.nome,Laboratório|100=>laboratorio.nome,Ensaio|100=>ensaio.nome,Tipo de Amostra|100=>amostraTipo.descricao,Quantidade|45C=>quantidade,Data da Entrega|60C|mask(DATA)=>dtEntrega,Status|100C=>situacao.nome',
          converters: {
            'situacao.nome':function(situacao,registro){
                if(registro.motivoRejeicao) {
                    return '<div title="' + registro.motivoRejeicao + '" >' + situacao + '</div>';
                }else {
                    return '<div>' + situacao + '</div>';
                }
            }
          }
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
      this.lista = await this.$get(ctt.rest + '/planoOperacional/listar?args=' + encodeURI(JSON.stringify(args)));
    },
    aprovar: async function (planoOperacional) {
        //  this.planoOperacional.usuarioRejeicao=this.security.user
        planoOperacional.dhAprovacao=new Date();
        planoOperacional.situacao = {id:6, nome:'APROVADO'};
        let planoAlterado = await this.$put(ctt.rest + '/planoOperacional',planoOperacional);
        this.lista[this.lista.indexOf(planoOperacional)] = planoAlterado;
        this.$root.mens.success('Atenção','Plano operacional aprovado com sucesso!');
    },
    iniciarRejeicao: function (planoOperacional) {
        this.planoOperacional=planoOperacional;
      this.$refs.wRejeicao.open();
    },
     rejeitar: async function (){
        if(!this.justificativa){
            this.$refs.justificativa.error('Uma justificativa deve ser informada!');
            return;
        }
       this.planoOperacional.motivoRejeicao=this.justificativa;
     //  this.planoOperacional.usuarioRejeicao=this.security.user
         this.planoOperacional.dhRegeicao=new Date();
         this.planoOperacional.situacao = {id:7, nome:'REJEITADO'};
         let planoAlterado = await this.$put(ctt.rest + '/planoOperacional',this.planoOperacional);
         this.lista[this.lista.indexOf(this.planoOperacional)] = planoAlterado;
         this.$refs.wRejeicao.close();
         this.$root.mens.success('Atenção','Plano operacional rejeitado com sucesso!');
     },
  },
  created: async function () {
    this.laboratorios = await this.$get(ctt.rest + '/laboratorio/listar');
  }
}
</script>

<style scoped>

</style>