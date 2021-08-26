<template>
    <cr-panel columns="1">
                <cr-panel columns="2" boxShadow labelTop>
                    <input-longtext label="Nome*" v-model="cadastro.nome"/>
                    <input-combo label="Unidade*" :collection="unidades"/>
                    <cr-panel columns="1">
                        <input-integer label="Prazo de confirmação para contratação de cliente externo (dias)" v-model="cadastro.PrzContrCle"/>
                        <input-integer label="Tempo de retenção de amostras para clientes internos (dias)" v-model="cadastro.PrzRetCli"/>
                        <input-integer label="Tempo de retenção de amostras para clientes externos (dias)" v-model="cadastro.PrzRetCle"/>
                    </cr-panel>
                </cr-panel>
    </cr-panel>
</template>

<script>
//import ctt from './Constants';
import inputLongtext from "../framework/form/inputLongtext";
import inputCombo from "../framework/form/inputCombo";
import inputInteger from '../framework/form/inputInteger';
import CrPanel from '../framework/form/crPanel';


export default {
    name: "LaboratorioCad",
    components: {inputLongtext, inputCombo, CrPanel, inputInteger},

    data: function () {
        return {
            unidades: [],
            cadastro: {},
        };
    },
    //async beforeCreate() {
    //this.unidades=await this.$get(ctt.rest+'/unidade/listar');
    //}
}
</script>

<style scoped>

</style>