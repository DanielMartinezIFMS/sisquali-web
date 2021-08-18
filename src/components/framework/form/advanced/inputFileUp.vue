<template>
    <div class="inputGroup">
        <label class="crudLabel" :style="labelStyle" >{{label}}:</label>
        <div class="flexRow crudDisplay">

            <div class="flexGrow" style="padding-top: 0.3em;padding-left: 0.2em;max-height: 1.2em;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" :title="nome">{{nome}}</div>

            <button v-if="nome" type="button" class="crudButton info noRound" @click="download">
                <font-awesome-icon icon="download"/>
            </button>
            <div v-if="nome" class="separator"></div>

            <button v-if="nome && !noShow" type="button" class="crudButton info noRound" @click="preview">
                <font-awesome-icon icon="search"/>
            </button>
            <div class="separator"></div>

            <button type="button" class="crudButton info noRound" @click="select">
                <font-awesome-icon icon="upload"/>
            </button>
            <div class="separator"></div>

            <button type="button" class="crudButton info noLeftRound" @click="remove">
                <font-awesome-icon icon="times" />
            </button>

            <input ref="ifile" @change="upload" type="file" :accept="accept" style="position:absolute;top:-2000px;left:-2000px;width: 1px;height: 1px;" tabindex="-1">

        </div>
    </div>
</template>

<script>

    import ctt from '../../../parametros/Constants';

    /**
     * label - rotulo
     * value - campo com o nome do arquivo
     * type - tipos de arquivo aceitos
     * group - pasta do arquivo no servidor
     * noShow - remove botao visualização
     * colspan
     * -----------------------------------------
     * @change
     */
    export default {
        props:['value','group','accept','noShow','label'],
        name: 'inputFileUp',
        data: function () {
            return {
                nome: this.value,
                labelStyle: undefined,
                inputStyle: ''
            };
        },
        methods: {
            select(){
              this.$refs.ifile.click();
            },
            remove(){
                this.nome=undefined;
                this.$emit('input', this.nome);
                this.$emit('change', this.nome);
            },
            download(){
                window.open(ctt.file+'/download/'+this.group+'/'+this.nome, '_blank');
            },
            preview(){
                window.open(ctt.file+'/'+this.group+'/'+this.nome, '_blank');
            },
            upload(event){
                let file = event.target.files[0];
                let fd = new FormData();
                let self=this;
                fd.append('file', file);
                this.$post(ctt.file+'/'+this.group, fd).then(result => {
                    self.nome=result;
                    self.$emit('input', self.nome);
                    self.$emit('change', self.nome);
                });


            }
        },
        created: function () {
            let self = this;
            if (self.$parent.$attrs.labelLeft) {
                this.labelStyle = 'min-width:' + self.$parent.$attrs.labelLeft + ';';
            } else {
                this.labelStyle = 'width: 100%;text-align: left;';
            }

            if (this.right !== undefined) {
                this.inputStyle += 'text-align: right;';
            }
            if (this.width) {
                this.inputStyle += 'width: ' + this.width + ';';
            }
            if(this.rows){
                this.inputStyle += 'height: ' + this.rows + 'em;';
                this.inputStyle += 'overflow: auto;';
            }
        },


    }
</script>

<style scoped>
    .crudDisplay{
        border: 1px solid silver;
        border-radius: 3px;
        font-size: 1em;
        width: 100%;
        min-height: 1.875em;
    }
    .noRound{
        border-radius: 0;
        width: auto;
    }
    .noLeftRound{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        width: auto;
    }
    .separator{
        width: 1px;
        background-color: silver;
    }

</style>