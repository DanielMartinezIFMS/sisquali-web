<template>
    <form novalidate class="crudContainer">
        <slot></slot>
    </form>
</template>

<script>
    import ctt from '../../parametros/Constants';
    import {CrValidator} from "@/components/framework/CrValidator";

    /**
     * collection
     * entity
     * validatorConf: <Veja CrValidator>
     * config
     *   url: link para o endpoint
     *   onNew(entity):void
     *   onBeforeEdit(entity):void
     *   onBeforeDelete(entity):void
     *   onValidate(imageUploadList):boolean
     *   onBeforeSave(entity,'INSERT|UPDATE'):void
     * id
     */
    export default {
        name: 'crCrud',
        props: ['collection', 'entity', 'config','validatorConf', 'id'],
        data: function () {
            return {
                backup: null,
                index: null
            };
        },
        computed: {
            idField: function () {
                return (this.id === undefined) ? 'id' : this.id;
            }
        },
      mounted() {
          if(this.validatorConf) {
            this.validator = new CrValidator(this.validatorConf);
            this.$nextTick(() => {
              this.validator.initialize(this.$parent.$refs);
            });
          }
      },
      methods: {
            getConf: function () {
                return this.$parent[this.$props.config];
            },
            goback: function () {
                this.$parent[this.collection][this.index] = this.backup;
            },
            getForm: function () {
                for (let idx in this.$children) {
                    if (this.$children[idx].$options._componentTag === 'cr-crud-form') {
                        return this.$children[idx];
                    }
                }
                return null;
            },
            getFilter: function () {
                for (let idx in this.$children) {
                    if (this.$children[idx].$options._componentTag === 'cr-crud-filter') {
                        return this.$children[idx];
                    }
                }
                return null;
            },
            getGrid: function () {
                for (let idx in this.$children) {
                    if (this.$children[idx].$options._componentTag === 'cr-crud-grid') {
                        return this.$children[idx];
                    }
                }
                return null;
            },
            autoDelete () {
                let self = this;
                let id = self.$parent[self.entity][self.idField];
                this.$delete(self.$parent[self.config].url + '/' + id)
                    .then(() => {
                        self.$root.mens.success('Atenção', 'Registro removido com sucesso!');
                        self.$parent[self.collection].splice(self.$parent[self.collection].indexOf(self.$parent[self.entity]), 1);
                        this.getForm().show(false);
                        if (this.getFilter()) {
                            this.getFilter().show(true);
                        }
                        this.getGrid().show = true;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            },
            autoSave: async function () {
                let data, fd, cfile, i, keys, self = this, c = self.$parent[self.$props.config];
                let valid = true;
                if(this.validatorConf){
                  if(!this.validator.validate(self.$parent.$refs,self)){
                    valid=false;
                  }else{
                    this.validator.clear(self.$parent.$refs);
                  }
                }

                if (c.onValidate) {
                    if (!c.onValidate(this.$root.crudFiles)) {
                        valid=false
                    }
                }

                if(!valid)
                  return;

                if (c.onBeforeSave) {
                    await c.onBeforeSave(self.$parent[self.entity],(self.$parent[self.$props.entity][self.idField]) ? 'UPDATE' : 'INSERT');
                }


                if (this.$root.crudFiles && this.$root.crudFiles !== undefined) {
                    keys = Object.keys(this.$root.crudFiles);
                    for (i = 0; i < keys.length; i++) {
                        cfile = this.$root.crudFiles[keys[i]];
                        fd = new FormData();
                        fd.append('file', cfile.file);
                        data = await this.$post(ctt.image + '/' + cfile.type, fd);
                        cfile.callback(data);
                    }
                    this.$root.crudFiles = undefined;
                }

                let method = (self.$parent[self.$props.entity][self.idField]) ? 'POST' : 'PUT';
                if (method === 'PUT') {
                    data = await this.$put(c.url, self.$parent[self.entity]);
                    self.$root.mens.success('Atenção', 'Registro incluido com sucesso!');
                    self.$parent[self.$props.collection].push(data);
                } else {
                    data = await this.$post(c.url, self.$parent[self.entity]);
                    self.$root.mens.success('Atenção', 'Registro alterado com sucesso!');
                    let idx = self.$parent[self.collection].indexOf(self.$parent[self.entity]);
                    self.$parent[self.collection][idx] = data;
                    self.$parent[self.entity] = data;
                }
                this.getForm().show(false);
                if (this.getFilter()) {
                    this.getFilter().show(true);
                }
                this.getGrid().show = true;
            }
        }
    };
</script>

<style>

</style>
