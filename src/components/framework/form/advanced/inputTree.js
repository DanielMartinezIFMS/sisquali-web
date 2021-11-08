import Vue from "vue";

export default Vue.component('crCrudTree', {
    props:['value','label','collection'],
    data: function(){
        return {
           text: (this.value) ? this.value.classificacao + ' ' + this.value.descricao : '',
        }
    },
   render(createElement, context) {
       return createElement('inputGroup',{class:'crudLabel'},[
           createElement('label',{},[this.label]),
           createElement('input',{domProps:{type:'text'},on:{change: function(value){

                   }}})
       ])
   }
});