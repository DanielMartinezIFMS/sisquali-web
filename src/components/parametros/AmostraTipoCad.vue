<template>
    <cr-crud collection="lista" entity="cadastro">
        <cr-crud-tree :collection="lista">
            <span>ops</span>
        </cr-crud-tree>
    </cr-crud>
</template>

<script>
    import ctt from '../parametros/Constants';
    import CrCrud from '../framework/crud/crCrud';
    import CrCrudTree from '../framework/crud/crCrudTree';
    export default {
        name: 'AmostraTipoCad',
        components: {CrCrud,CrCrudTree},
        data: function(){
            return {
                lista:[],
                cadastro:{}
            }
        },
        created: async function(){
            this.lista = await this.$get(ctt.rest+'/amostraTipo/listar')
        }

    }
</script>

<style scoped>

</style>