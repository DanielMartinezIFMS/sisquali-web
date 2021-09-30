<template>
    <cr-crud collection="lista" entity="cadastro" config="crudConf" :validatorConf="valConf">
        <cr-crud-grid :config="gridConf" class="mt-2"/>
        <cr-crud-form>
            <cr-panel columns="2" boxShadow labelTop>
                <input-longtext ref="nome" label="Nome" v-model="cadastro.nome"/>
                <cr-panel columns="2">
                    <input-domain ref="tipo" label="Tipo" v-model="cadastro.laboratorioTipo" cod-group="7"/>
                    <input-combo ref="unidade" label="Unidade" :collection="unidades" v-model="cadastro.unidade"/>
                </cr-panel>
                <cr-panel>
                    <input-integer label="Prazo de confirmação para contratação de cliente externo (dias)"
                                   v-model="cadastro.clExtPrzConfCont" min="0"/>
                    <input-integer label="Tempo de retenção de amostras para clientes internos (dias)"
                                   v-model="cadastro.clIntPrzRetAmos" min="0"/>
                    <input-integer label="Tempo de retenção de amostras para clientes externos (dias)"
                                   v-model="cadastro.clExtPrzRetAmos" min="0"/>
                </cr-panel>
                <cr-panel columns="7" box noPadding>
                    <input-auto ref="supervisor" colspan="6" label="Usuário Supervisor" v-model="novo"
                                :config="usuarioConf"/>
                    <cr-bt class="mt-6" primary icon="plus" @click="()=>adicionar()" :desabled="!this.novo">Inserir
                    </cr-bt>
                    <cr-table class="m-2" colspan="7" :config="superConf" :collection="cadastro.supervisores"/>
                </cr-panel>
            </cr-panel>
            <cr-crud-buttons/>
        </cr-crud-form>
    </cr-crud>
</template>

<script>
import inputLongtext from "../framework/form/inputLongtext";
import inputCombo from "../framework/form/inputCombo";
import inputInteger from '../framework/form/inputInteger';
import CrPanel from '../framework/form/crPanel';
import CrCrud from '../framework/crud/crCrud';
import CrCrudGrid from '../framework/crud/crCrudGrid';
import CrCrudForm from '../framework/crud/crCrudForm';
import ctt from '../parametros/Constants';
import InputAuto from "../framework/form/advanced/inputAuto";
import CrBt from "../framework/common/crButton";
import CrTable from "../framework/common/crTable";
import {CrFnVALIDATOR, CrREQUIRED} from '../framework/CrValidator'
import InputDomain from "../framework/form/advanced/inputDomain";


export default {
    name: "LaboratorioCad",
    components: {
        InputDomain,
        CrTable,
        CrBt, InputAuto, inputLongtext, inputCombo, CrPanel, inputInteger, CrCrud, CrCrudGrid, CrCrudForm
    },

    data: function () {
        let self = this;
        return {
            unidades: [],
            lista: [],
            cadastro: {},
            novo: undefined,
            usuarioConf: {
                url: ctt.rest + '/usuario'
            },
            crudConf: {
                url: ctt.rest + '/laboratorio',
            },
            gridConf: {
                fields: 'Nome|100=>nome,Unidade|100=>unidade.nome,Tipo|100=>laboratorioTipo.nome'
            },
            superConf: {
                fields: 'Nome|100=>nome',
                options: {
                    title: "Excluir",
                    width: 10,
                    buttons: [{icon: 'minus', label: '', click: (sup) => self.remover(sup)}]
                }
            },
            valConf: {
                nome: CrREQUIRED(),
                unidade: CrREQUIRED(),
                tipo: CrREQUIRED(),
                supervisor: CrFnVALIDATOR((entity, ref) => {
                    if (!entity.supervisores || entity.supervisores.length === 0) {
                        self.$refs[ref].error('Ao menos um supervisor deve ser incluido!');
                        return false;
                    }
                    return true;
                })
            }
        };
    },
    methods: {
        remover: function (sup) {
            this.cadastro.supervisores.splice(this.cadastro.supervisores.indexOf(sup), 1);
        },
        adicionar: function () {
            if (!this.cadastro.supervisores) {
                this.cadastro.supervisores = [];
            }
            this.cadastro.supervisores.push(this.novo);
            this.$forceUpdate();
        }
    },
    async mounted() {
        this.unidades = await this.$get(ctt.rest + '/unidade/listar');
    }
}
</script>

<style scoped>

</style>