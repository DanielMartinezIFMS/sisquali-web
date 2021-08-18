import Vue from 'vue';

export default Vue.component('crCrudButtons', {
   render: function (createElement) {
      let self = this;
      let btns = [
          createElement('div',{style:'display:inline-block;margin-right:0.2em;'},[
            createElement('button', {
               class: 'crudButton crudButtonSave',
               domProps: {
                  type: 'button',
                  value: self.value
               },
               on: {
                  click: function () {
                     self.salvar();
                  }
               }
            }, 'Salvar')]),

              createElement('div',{style:'display:inline-block;margin-right:0.2em;'},[
                  createElement('button', {
            class: 'crudButton crudButtonCancel',
            domProps: {
               type: 'button',
               value: self.value
            },
            on: {
               click: function () {
                  self.cancelar();
               }
            }
         }, 'Cancelar')]),
         createElement('div',{style:'display:inline-block;margin-right:0.2em;'},[
            createElement('button', {
            class: 'crudButton crudButtonExclude',
            domProps: {
               type: 'button',
               value: self.value
            },
            on: {
               click: function () {
                  self.excluir();
               }
            }
         }, 'Excluir')])];
      return createElement('div', {class: 'crudButtonsGroup'}, btns);
   },
   props: ['value'],
   methods: {
      salvar: function () {
         let crud = this.getCrud();
         crud.autoSave();
      },
      cancelar: function () {
         let crud = this.getCrud();
         if (crud.$parent[crud.entity][crud.idField]) { crud.goback(); }
         crud.getForm().show(false);
          if (crud.getFilter()) {
            crud.getFilter().show(true);
          }
         crud.getGrid().show = true;
         this.$root.crudFiles = undefined;
      },
      excluir: function () {
         let crud = this.getCrud();
         crud.autoDelete();
      },
      getCrud () {
         let c = this.$parent;
         while (c && c.$options._componentTag !== 'cr-crud') { c = c.$parent; }
         return c;
      }
   }

});
