<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="(title,index) in titles" :key="index">{{title}}</th>
                    <th v-if="config.options" >{{config.options.title}}</th>
                </tr>
            </thead>
            <tbody>
            <template v-if="collection">
                <tr v-for="(item,index) in collection" :key="index" @click="rowClick(item)">
                    <td v-for="(fname,idx) in fields" :style="cssHeader[idx]" :key="idx">
                        <div v-html="printCell(item,fname)"></div>
                    </td>
                    <td v-if="config.options" :style="larguraOpt()" >
                        <template v-for="(bt,index) in config.options.buttons" >
                            <button type="button" class="p-2 m-1" :atualizatitle="title" :key="index" v-if="!bt.show || bt.show(item)" @click="()=>bt.click(item)">
                                <font-awesome-icon v-if="bt.icon" :icon="bt.icon" class="mr-1"/>
                                <template v-if="bt.label">{{bt.label}}</template>
                            </button>
                        </template>
                    </td>
                </tr>
            </template>
            <tr v-if="config.emptyMessage && (!collection || collection.length === 0)">
               <td :colspan="titles.length+(config.options?1:0)">{{config.emptyMessage}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    /**
     * <cr-table :collection="array" :config="object"/>
     *
     * collection:array = Vetor com os dados a serem visualizados na tabela
     * config:object = {
     *      emptyMessage - mensagem quando não houver elementos
     *      fields:string - lista de campos separados por virgula
     *        "TituloDaColuna|Tamanho<D>|<Formato> => nomeDoCampo, ..."
     *      converters:object {
     *         'nomeDoCampo': <function(vlCampo,registro,nomeDoCampo)> {
     *           return 'vlCampoFormatado' | 'html';
     *         }
     *      options:{
     *        title:string - Titulo da coluna de ações (ultima)
     *        width:numeric - largura da coluna de ações
     *        buttons: [
     *          {icon:<String>,label:<String>,click:<function(row)>,show:<function(row)>},
     *          ...
     *        ]
     *      onClick: (item)=> {}  - função a ser executada ao clicar em uma linha da tabela
     *    }
     *
     *  }
     *  <D> - Disposição na coluna ( C - Centro ou R - Direita ou L - Esquerda )
     *  <Formato> - image | mask('Mascara')
     *
     *  ******************************
     *  O Tamanho é intuitivo, defina uma tamanho para o maior campo e com base nele defina o dos demais
     *  ex. se nome tem tamanho 150, telefone teria tamanho 50
     *  O sistema calcula nome com 75% e telefone com 25% aproximadamente
     *
     */
    export default {
        name: "crTable",
        props: ['collection', 'config'],
        beforeMount: function(){
          this.captarMetadados();
          this.processarMetadados();
        },
        data: function () {
            return {
                titles: [],
                fields: [],
                cssBody: [],
                cssHeader: [],
                showColumn: [],
                formaters: {},
                converters: {},
                proporcao: 1,
                lines: [],
                show: true,
                hideConf: true,
                metadata: []
            };
        },
        methods: {
            larguraOpt: function() {
                return 'width:'+(this.proporcao * this.config.options.width)+'%';
            },
            rowClick: function(row){
              if(this.config.onClick){
                  this.config.onClick(row);
              }
            },
            printCell (line, field) {
                let r = line[field];
                if (field.indexOf('.') >= 0) {
                    r = line;
                    field.split('.').map(f => {
                        if (r[f]) {
                            r = r[f];
                        } else {
                            r = '';
                        }
                    });
                }
                if (this.formaters[field]) {
                    let f = this.formaters[field];
                    if (f.toUpperCase().indexOf('MASK') >= 0) {
                        let mask = f.substring(f.indexOf('(') + 1, f.lastIndexOf(')'));
                        r = this.$crUtils.mask(mask, r);
                    } else if (f === 'Image') {
                        let d = '<div class="retractedImage"><img src="/rest/imagem/' + r.tipo + '/' + r.nome + '" style="width: 95%;"></div>';
                        return d;
                    }
                }
                if (this.converters[field]) {
                    r = this.converters[field](r, line, field);
                }
                return r;
            },
            captarMetadados () {
                let self = this;

                self.metadata = [];

                this.config.fields.split(',').map(function (f) {
                    let p = f.split('=>');
                    let fP = p[0].split('|');
                    let obj = {};
                    obj.field = p[1].trim();
                    obj.title = fP[0];
                    obj.width = (Number.parseInt(fP[1]) | 0);
                    let a = (fP[1].indexOf('C') >= 0) ? 'C' : (fP[1].indexOf('R') >= 0) ? 'R' : 'L';
                    obj.align = (a);

                    if (fP.length === 3) {
                        obj.format = fP[2];
                    }

                    self.metadata.push(obj);
                });
            },
            processarMetadados: function () {
                let self = this;

                self.fields = [];
                self.titles = [];
                self.showColumn = [];

                self.cssHeader = [];
                self.formaters = {};
                self.converters = {};

                if (self.config.converters) {
                    self.converters = self.config.converters;
                }
                let tt = 0;
                this.metadata.map(cp => {
                    tt += parseInt(cp.width);
                });
                if(this.config.options){
                    tt += this.config.options.width;
                }
                self.proporcao = 100 / tt;
                this.metadata.map((cp) => {
                    let w = 'width:' + (cp.width * self.proporcao) + '%;';
                    let s = (cp.align === 'C') ? 'text-align:center;' : (cp.align === 'R') ? 'text-align:right;' : '';
                    self.cssHeader.push(w + s);
                    self.formaters[cp.field] = cp.format;
                    self.titles.push(cp.title);
                    self.fields.push(cp.field);
                });
                self.$forceUpdate();
            }
        }
    }
</script>

<style scoped>

</style>