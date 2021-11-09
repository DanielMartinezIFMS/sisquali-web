<template>
    <cr-crud collection="lista" entity="cadastro" config="crudConf" >
        <cr-crud-grid :config="gridConf" class="mt-2"/>
        <cr-crud-form>
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
            <cr-crud-buttons/>
        </cr-crud-form>
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

export default {
    name: "ServicoInternoCad",
    components: {
        CrDisplay, inputCombo,
        CrPanel, CrCrud, CrCrudGrid, CrCrudForm
    },
    data: function () {
        return {
            lista: [],
            cadastro: {},
            laboratorios: [],
            status: [],
            projetos: [],
            gridConf: {
                fields: 'Solicitação|30=>codigoSolicitacao,Tipos de amostras|40=>codigoSolicitacao,Nº|10=>codigoSolicitacao,Ensaios/Planilhas|100=>codigoSolicitacao,Status|40=>status.nome'
            },
            crudConf: {
                url: ctt.rest + '/servico',
            },
        }
    },
    created: async function () {
        this.laboratorios = await this.$get(ctt.rest + '/laboratorio/listar');
        this.status = await this.$get(ctt.rest + '/dominio/5');
        this.projetos = await this.$get(ctt.rest + '/projeto/listar');
    }
}
</script>

<style scoped>

</style>