<template>
    <cr-crud collection="lista" entity="cadastro" config="crudConf">
        <cr-crud-grid :config="gridConf" class="mt-2"/>
        <cr-crud-form>
            <cr-panel>
                <cr-panel columns="2" boxShadow labelTop>
                    <input-longtext label="Nome*" v-model="cadastro.nome"/>
                    <input-combo label="Unidade*" :collection="unidades" v-model="cadastro.unidade"/>
                    <cr-panel>
                        <input-integer label="Prazo de confirmação para contratação de cliente externo (dias)"
                                       v-model="cadastro.clExtPrzConfCont" min="0"/>
                        <input-integer label="Tempo de retenção de amostras para clientes internos (dias)"
                                       v-model="cadastro.clIntPrzRetAmos" min="0"/>
                        <input-integer label="Tempo de retenção de amostras para clientes externos (dias)"
                                       v-model="cadastro.clExtPrzRetAmos" min="0"/>
                    </cr-panel>
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


export default {
    name: "LaboratorioCad",
    components: {inputLongtext, inputCombo, CrPanel, inputInteger, CrCrud, CrCrudGrid, CrCrudForm},

    data: function () {
        return {
            unidades: [],
            lista: [],
            cadastro: {},

            crudConf: {
                url: ctt.rest + '/laboratorio',
            },
            gridConf: {
                fields: 'Nome|100=>nome,Unidade|100=>unidade.nome'
            },
        };
    },
    async created() {
        this.unidades=await this.$get(ctt.rest+'/unidade/listar');
    }
}
</script>

<style scoped>

</style>