<template>
  <cr-crud collection="lista" entity="cadastro" config="crudConf">
    <cr-crud-tree ref="classTree" :conf="treeConf" title=""/>
    <cr-crud-form>
      <cr-panel boxShadow labelTop>
        <input-maked-text ref="classif"  label="Classificação" v-model="cadastro.classificacao" :mask="treeConf.mask"/>
        <input-longtext   label="Descrição" v-model="cadastro.descricao"/>
      </cr-panel>
      <cr-crud-buttons />
    </cr-crud-form>
  </cr-crud>
</template>

<script>
import ctt from '../parametros/Constants';
import CrCrud from '../framework/crud/crCrud';
import CrCrudTree from '../framework/crud/crCrudTree';
import crCrudForm from "@/components/framework/crud/crCrudForm";
import inputMakedText from "@/components/framework/form/inputMakedText";
import inputLongtext from "@/components/framework/form/inputLongtext";
import crPanel from "@/components/framework/form/crPanel";
import crCrudButtons from "@/components/framework/crud/crCrudButtons";
export default {
  name: 'AmostraTipoCad',
  components: {CrCrud, CrCrudTree, inputLongtext, crPanel, crCrudButtons, crCrudForm, inputMakedText},
  data: function () {
    return {
      treeConf: {mask: '>99.99.99.9999.999'},
      lista: [],
      cadastro: {},
      crudConf: {
        url: ctt.rest + '/amostraTipo',
      }
    }
  },
  created: async function () {
    this.lista = await this.$get(ctt.rest + '/amostraTipo/listar')
  }

}
</script>

<style scoped>

</style>