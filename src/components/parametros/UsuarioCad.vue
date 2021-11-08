<template>
  <cr-crud collection="lista" entity="cadastro" config="crudConf" >
    <cr-crud-grid :config="gridConf" class="mt-2"/>
    <cr-crud-form>
      <cr-panel boxShadow labelTop>
        <input-longtext label="Nome" v-model="cadastro.nome"/>
        <input-text     label="Nome de usuário" v-model="cadastro.username"/>
        <cr-panel columns="2">
        <cr-table class="mh-2" :collection="cadastro.perfis" :config="perfisConf" title="Perfis do Usuario" />
        <cr-table class="mh-2" :collection="perfil.perfilPermissoes" :config="permissaoConf" title="Permissões do Usuario" />
        </cr-panel>
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
import CrTable from "@/components/framework/common/crTable";

export default {
  name: "UsuarioCad",
  components: {CrTable, CrCrudForm, CrCrudGrid, CrCrud, CrPanel, InputLongtext, InputText, CrCrudButtons},
  data: function (){
    return {
      cadastro: {},
      lista: [],
      perfil:{},
      crudConf: {
        url: '/rest/usuario'
      },
      gridConf: {
        fields: "Nome de Usuário|30=>username,Nome|100=>nome"
      },
      perfisConf: {
        fields: "Perfil|100=>nome",
        onClick: (item)=>{this.perfil = item}
      },
      permissaoConf: {
        fields: "Permissao|100=>permissao.nome,Descrição|100=>permissao.descricao,Ler|3=>ler,Novo|3=>criar,Alt|3=>alterar,Exc|3=>apagar,Exe|3=>executar"
      }
    }
  }
}
</script>

<style scoped>

</style>