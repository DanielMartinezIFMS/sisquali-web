<template>
  <cr-crud collection="lista" entity="cadastro" config="crudConf" >
    <cr-crud-grid :config="gridConf" class="mt-2"/>
    <cr-crud-form>
      <cr-panel boxShadow labelTop>
        <input-longtext label="Nome" v-model="cadastro.nome"/>
        <input-text     label="Nome de usuário" v-model="cadastro.username"/>
        <input-domain label="Tipo de Usuário" v-model="cadastro.perfil" cod-group="1"/>
      </cr-panel>
      <cr-crud-buttons/>
    </cr-crud-form>
  </cr-crud>
</template>

<script>
import CrCrud from "@/components/framework/crud/crCrud";
import CrCrudButtons from "@/components/framework/crud/crCrudButtons";
import CrCrudGrid from "@/components/framework/crud/crCrudGrid";
import CrCrudForm from "@/components/framework/crud/crCrudForm";
import CrPanel from "@/components/framework/form/crPanel";
import InputLongtext from "@/components/framework/form/inputLongtext";
import InputText from "@/components/framework/form/inputText";
import InputDomain from "@/components/framework/form/advanced/inputDomain";

export default {
  name: "UsuarioCad",
  components: {InputDomain, CrCrudForm, CrCrudGrid, CrCrud, CrPanel, InputLongtext, InputText, CrCrudButtons},
  data: function (){
    return {
      cadastro: {},
      lista: [],
      crudConf: {
        url: '/rest/usuario'
      },
      gridConf: {
        fields: "Nome de Usuário|30=>username,Nome|100=>nome"
      }
    }
  }
}
</script>

<style scoped>

</style>