<template>
  <div style="flex-grow: 1;" :class="{show:show,hide:!show}">
    <div :class="{hide:hideConf, greedBox:true}">
      <div class="greedConf">
        <h5>Opções da tabela</h5>
        <div class="greedConfContainer">
          <div v-for="(data,index) in metadata" v-bind:key="index" class="greedConfLine">
            <button @click="toggleHide(data)" class="crudIcon small primary" type="button">
              <svg v-if="!data.hide" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye"
                   class="svg-inline--fa fa-eye fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 576 512">
                <path fill="currentColor"
                      d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
              </svg>
              <svg v-if="data.hide" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye-slash"
                   class="svg-inline--fa fa-eye-slash fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 640 512">
                <path fill="currentColor"
                      d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path>
              </svg>
            </button>
            <button @click="toggleAlign(data)" class="crudIcon small primary" type="button">
              <svg v-if="data.align=='C'" aria-hidden="true" focusable="false" data-prefix="fas"
                   data-icon="align-center" class="svg-inline--fa fa-align-center fa-w-14" role="img"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor"
                      d="M432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM108.1 96h231.81A12.09 12.09 0 0 0 352 83.9V44.09A12.09 12.09 0 0 0 339.91 32H108.1A12.09 12.09 0 0 0 96 44.09V83.9A12.1 12.1 0 0 0 108.1 96zm231.81 256A12.09 12.09 0 0 0 352 339.9v-39.81A12.09 12.09 0 0 0 339.91 288H108.1A12.09 12.09 0 0 0 96 300.09v39.81a12.1 12.1 0 0 0 12.1 12.1z"></path>
              </svg>
              <svg v-if="data.align=='L'" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="align-left"
                   class="svg-inline--fa fa-align-left fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 448 512">
                <path fill="currentColor"
                      d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
              </svg>
              <svg v-if="data.align=='R'" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="align-right"
                   class="svg-inline--fa fa-align-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 448 512">
                <path fill="currentColor"
                      d="M16 224h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm416 192H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm3.17-384H172.83A12.82 12.82 0 0 0 160 44.83v38.34A12.82 12.82 0 0 0 172.83 96h262.34A12.82 12.82 0 0 0 448 83.17V44.83A12.82 12.82 0 0 0 435.17 32zm0 256H172.83A12.82 12.82 0 0 0 160 300.83v38.34A12.82 12.82 0 0 0 172.83 352h262.34A12.82 12.82 0 0 0 448 339.17v-38.34A12.82 12.82 0 0 0 435.17 288z"></path>
              </svg>
            </button>

            <input type="number" min="1" max="200" v-model="data.width"/>

            <div
              style="flex-grow: 1; border:1px solid silver; border-radius: 0.3em; padding-top: 0.3em; padding-left: 0.5em; margin-left: 0.3em; margin-right: 0.3em;">
              {{data.title}}
            </div>

            <button @click="moveUp(index)" class="crudIcon small primary" type="button">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-up"
                   class="svg-inline--fa fa-angle-up fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 320 512">
                <path fill="currentColor"
                      d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path>
              </svg>
            </button>
            <button @click="moveDown(index)" class="crudIcon small primary" type="button">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down"
                   class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 320 512">
                <path fill="currentColor"
                      d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div>
          <button type="button" class="crudButton crudButtonSave" @click="aplicarMetadados();">Aplicar</button>
          <button type="button" class="crudButton primary" @click="hideConf=true;">Fechar</button>
        </div>
      </div>
    </div>

    <div class="gridContainer">
      <div class="gridHorizontal">
        <div class="gridHeader">
          <template v-for="(h,index) in titles" >
            <div :key="index" v-if="showColumn[index]===true" class="gridHeaderColumn"
                 :style="cssHeader[index]">
              {{h}}
            </div>
          </template>
        </div>
        <div class="gridBody">
          <div v-for="(l,index) in lines" :key="index" :class="{gridRow:true,gridSelected:isActive(l)}"
               @click="selecionar(l,index)">
            <template v-for="(r,index) in fields" >
              <div :key="index"  v-if="showColumn[index]==true"  class="gridCell"
                   :style="cssBody[index]" v-html="printCell(l,r)">
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="gridFooter">
        <button class="crudIcon small primary" type="button" @click="hideConf=false">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tools"
               class="svg-inline--fa fa-tools fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512">
            <path fill="currentColor"
                  d="M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0 0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7zM331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5 37.1-37.1 49.7-89.3 37.9-136.7-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2-47.4-11.7-99.6.9-136.6 37.9-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9zm-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7zM64 472c-13.2 0-24-10.8-24-24 0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24z"></path>
          </svg>
        </button>
        <button type="button" class="crudButton primary" @click="novo()">Novo</button>
        <span style="margin-left: 1em;">{{lines.length}} registros</span>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-trailing-spaces */

  /**
   * <cr-grid :config="config"/>
   *
   * config:object = {
   *    stretch:boolean - realiza stretch(estica) na tabela
   *    fields:string - lista de campos separados por virgula
   *      "TituloDaColuna|Tamanho<D>|<Formato> => nomeDoCampo, ..."
   *    converters:object {
   *       'nomeDoCampo': function(vlCampo,registro,nomeDoCampo) {
   *         return 'vlCampoFormatado';
   *       }
   *    }
   *  }
   *  <D> - Disposição na coluna ( H - Invisivel ou C - Centro ou R - Direita ou L - Esquerda )
   *  <Formato> - image | mask(Mascara)
   */
  export default {
    beforeMount: function () {
      this.captarMetadados();
      this.aplicarMetadados();
      this.carregarDados();
    },
    name: 'crCrudGrid',
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
        metadata: [],
        filters: undefined
      };
    },
    props: ['config'],
    methods: {
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
            let mask = f.substring(f.indexOf('(') + 1, f.indexOf(')'));
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
      getCrud () {
        let c = this.$parent;
        while (c && c.$options._componentTag !== 'cr-crud') {
          c = c.$parent;
        }
        return c;
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

          let h = (fP[1].indexOf('H') >= 0);
          obj.hide = h;

          if (fP.length === 3) {
            obj.format = fP[2];
          }

          self.metadata.push(obj);
        });
      },
      aplicarMetadados: function () {
        let self = this;

        self.fields = [];
        self.titles = [];
        self.showColumn = [];

        self.cssBody = [];
        self.cssHeader = [];
        self.formaters = {};
        self.converters = {};

        if (self.config.converters) {
          self.converters = self.config.converters;
        }
        let tt = 0;
        this.metadata.map(cp => {
          if (cp.hide === false) {
            tt += parseInt(cp.width);
          }
        });
        self.proporcao = 100 / tt;
        this.metadata.map((cp) => {
          let w = 'width:' + (cp.width * self.proporcao) + '%;';
          let s = (cp.align === 'C') ? 'text-align:center;' : (cp.align === 'R') ? 'text-align:right;' : '';
          self.cssHeader.push(w + s);
          self.cssBody.push(w + s);
          self.formaters[cp.field] = cp.format;
          self.titles.push(cp.title);
          self.fields.push(cp.field);
          self.showColumn.push(!cp.hide);
        });
        self.$forceUpdate();
      },
      setFiltros: function (filtros) {
        this.filters = filtros;
      },
      carregarDados: function () {
        let crud = this.getCrud();
        let self = this;
        let args = (this.filters) ? '?args=' + encodeURI(JSON.stringify(this.filters)) : '';
        this
          .$get(crud.$parent[crud.config].url + '/listar' + args)
          .then(data => {
            crud.$parent[crud.$props.collection] = data;
            this.lines = data;
          }).catch((error) => {
          self.console.error('Error:', error);
        });
      },
      novo () {
        let crud = this.getCrud();
        let form = crud.getForm();
        crud.$parent[crud.$props.entity] = {};
        if (crud.getConf().onNew) {
          crud.getConf().onNew(crud.$parent[crud.$props.entity]);
        }
        form.show(true);
        this.show = false;
        crud.backup = null;
      },
      selecionar (item, index) {
        let crud = this.getCrud();
        let form = crud.getForm();
        let filter = crud.getFilter();
        let c = crud.$parent[crud.config];
        if (c.onBeforeEdit) {
          c.onBeforeEdit(item);
        }
        crud.$parent[crud.$props.entity] = item;
        crud.backup = JSON.parse(JSON.stringify(item));
        crud.index = index;
        form.show(true);
        if (filter) {
          filter.show(false);
        }
        this.show = false;
        crud.$parent.$forceUpdate();
      },
      isActive (line) {
        let crud = this.getCrud();
        return (crud.$parent[crud.entity] && line[crud.idField] === crud.$parent[crud.entity][crud.idField]);
      },
      toggleHide (data) {
        data.hide = !data.hide;
      },
      toggleAlign (data) {
        if (data.align === 'L') {
          data.align = 'R';
        } else if (data.align === 'R') {
          data.align = 'C';
        } else {
          data.align = 'L';
        }
      },
      moveUp: function (index) {
        if (index > 0) {
          let backup = this.metadata[index - 1];
          this.metadata[index - 1] = this.metadata[index];
          this.metadata[index] = backup;
          this.$forceUpdate();
        }
      },
      moveDown: function (index) {
        if (index < this.metadata.length - 1) {
          let backup = this.metadata[index + 1];
          this.metadata[index + 1] = this.metadata[index];
          this.metadata[index] = backup;
          this.$forceUpdate();
        }
      }

    }
  };
</script>

<style scoped>
  .show {
    display: flex;
  }

  .hide {
    display: none;
  }

  .gridContainer {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    border: 1px solid silver;
    border-right: none;
    border-bottom: none;
    margin: 0 0.5em 0.5em;
  }

  .gridHorizontal {
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
    flex-grow: 1;
  }

  .gridHeader {
    display: flex;
    flex-direction: row;
    background-color: #e9e9e9;
    overflow-y: scroll;
  }

  .gridHeaderColumn {
    font-weight: bold;
    padding: 0.6em;
    border-bottom: 1px solid silver;
    border-right: 1px solid silver;
  }

  .gridBody {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: scroll;
  }

  .gridRow {
    display: flex;
    flex-direction: row;
  }

  .gridRow:hover {
    background-color: #f7f7f7;
    cursor: pointer;
  }

  .gridRow.gridSelected {
    background-color: #fcfcfc;
  }

  .gridRow.gridSelected > div {
    font-weight: bold;
    border-bottom: 1px solid midnightblue;
  }

  .gridCell {
    padding: 0.4em;
    border-bottom: 1px solid silver;
    border-right: 1px solid silver;
    overflow: hidden;
  }

  .gridFooter {
    display: flex;
    flex-direction: row;
    border: 1px solid silver;
    border-left: none;
    margin-top: 1px;
    padding: 0.5em;

  }

  .greedBox {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(10, 10, 10, 0.3);
  }

  .greedConf {
    position: relative;
    width: 40%;
    height: 70%;
    padding: 0.5em;
    top: 60%;
    left: 50%;
    transform: translate(-60%, -50%);
    box-shadow: 3px 3px 5px 2px rgb(77, 77, 77);
    background-color: white;
  }

  .greedConf > h5 {
    display: inline-block;
    margin: 0;
    padding: 0;
    margin-bottom: 1em;
  }

  .greedConfContainer {
    display: flex;
    flex-direction: column;
  }

  .greedConfLine {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.3em;
  }

</style>
