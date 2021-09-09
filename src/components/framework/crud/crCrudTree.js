import Vue from 'vue';
import CrTable from '../common/crTable';
import CrDisplay from '../form/crDisplay';
import CrPanel from '../form/crPanel';
import lineGrow from '../form/lineGrow';
import CrWindow from '../common/crWindow';
export default Vue.component('crCrudTree', {
    props: ['collection'],
    components: {CrTable, CrDisplay, CrPanel,lineGrow,CrWindow},
    render: function (createElement) {
        let self = this;
        if (!self.collection || self.collection.length === 0)
            return createElement('div', {class: 'crudTreeNone'}, 'Nenhum item disponivel');
        else {
            self.index = 0;

            let items = self.gerarNohs(createElement);
            items.unshift('Tipos');

            let controles = [createElement('div', {class:'flexRow mt-2 mb-2'}, [
                createElement('cr-bt',{on:{click:()=>{this.abrirTodos()}},attrs:{wAuto:'',secondary:'',icon:'folder-open',title:'Abrir todos'}}),
                createElement('cr-bt',{on:{click:()=>{this.fecharTodos()}},attrs:{wAuto:'',secondary:'',icon:'folder',title:'Fechar todos'}}),
                createElement('div',{class:'flexGrow flexRow bordered'},[
                    createElement('input',{on:{input:(event)=>this.buscar(event)},class:'flexGrow noBorder mr-1',attrs:{type:'text',placeHolder:'Digite o texto a localizar aqui'}}),
                    createElement('font-awesome-icon',{style:{'font-size':'0.9em','margin-top':'0.2em','margin-right':'0.2em','color':'silver'},attrs:{icon:'search',primary:undefined}},['Anterior']),
                ]),
                createElement('cr-bt',{on:{click:()=>{this.buscarProximo()}},class:'ml-1',attrs:{wAuto:'',secondary:'',icon:'arrow-down'}},['Próximo']),
                createElement('cr-bt',{on:{click:()=>{this.buscarAnterior()}},attrs:{wAuto:'',secondary:'',icon:'arrow-up'}},['Anterior']),
            ])];
            let tree = createElement('div', {class: 'flexGrow crudTreeRoot mt-1 flexCol'}, [controles,createElement('div',{class:'flexGrow rightScroll mb-1'},items)]);
            return createElement('div', {class: 'flexRow pl-1 hFull'}, [
                tree,
                createElement('cr-panel', {style: {width: '500px'}, attrs: {'boxShadow': undefined,'noPadding':undefined}}, [
                    createElement('cr-panel', {attrs: {'columns': '5'}}, [
                        createElement('cr-display', {attrs: {label: 'Id', value: this.cadastro.id}}),
                        createElement('cr-display', {attrs: {colspan:'4',label: 'Classificação',value: this.cadastro.classificacao}}),
                    ]),
                    createElement('cr-display', {attrs: {label: 'Descrição', value: this.cadastro.descricao}}),
                    createElement('h4',{class:'mb-0 ml-2'},'Hierarquia'),
                    createElement('cr-table', {
                        class: 'mh-2',
                        props: {config: this.tableConf, collection: this.cadastro.ascendentes}
                    }),
                    createElement('line-grow'),
                    createElement('div', {class:'m-2 flexRow'},[
                        createElement('cr-bt',{attrs:{'success':''},on:{click:"()=>return"}},["Novo"]),
                        createElement('cr-bt',{attrs:{'success':'','wAuto':''},on:{click:"()=>return"}},["Novo item como este"]),
                        createElement('cr-bt',{attrs:{'success':'','wAuto':''},on:{click:"()=>return"}},["Novo subitem deste"]),
                        createElement('div',{class:'flexGrow'}),
                        createElement('cr-bt',{attrs:{'warning':'','wAuto':''},on:{click:()=>this.$refs.wmover.open()}},["Mover para"]),
                        createElement('cr-bt',{attrs:{'primary':'','wAuto':''},on:{click:"()=>return"}},["Alterar / Excluir"]),
                    ]),
                    createElement('cr-window',{ref:'wmover',attrs:{title:'Mover'}},[
                       createElement('cr-panel',{attrs:{'boxShadow':'','labelTop':''}},[
                       createElement('input-longtext',{class:'ph-0',attrs:{label:"Selecione o alvo"}}),
                           createElement('div',{},[
                       createElement('cr-bt',{attrs:{'success':'','wAuto':''},on:{click:"()=>return"}},["Antes deste"]),
                       createElement('cr-bt',{attrs:{'success':'','wAuto':''},on:{click:"()=>return"}},["Depois deste"]),
                       createElement('cr-bt',{attrs:{'success':'','wAuto':''},on:{click:"()=>return"}},["Último item como este"]),
                       createElement('cr-bt',{attrs:{'success':'','wAuto':''},on:{click:"()=>return"}},["Último subitem deste"]),
                               ])
                       ]),

                    ]),

                ])]
            )
        }
    },
    created: function () {
        this.index = undefined;
        this.selected = undefined;

    },
    data: function () {
        return {
            cadastro: {},
            tableConf: {
                emptyMessage: '...',
                fields: 'Classificação|50=>classificacao,Item|100=>descricao'
            }
        }
    },
    updated: function() {
        console.log('atualizando nohs!');
        this.relacionarNohs();
    },
    methods: {
        buscar:function(event){
            this.indexBusca=0;
            this.texto = event.currentTarget.value.toUpperCase();
            for(;this.indexBusca<this.nodeItems.length;this.indexBusca++) {
                let e = this.nodeItems[this.indexBusca];
                if(e.innerText.toUpperCase().indexOf(this.texto)>=0){
                    e.click();
                    break;
                }
            }
        },
        buscarProximo:function(){
            let oldIndex = this.indexBusca;
            this.indexBusca++;
            let achou = false;
            for(;this.indexBusca<this.nodeItems.length;this.indexBusca++) {
                let e = this.nodeItems[this.indexBusca];
                if(e.innerText && e.innerText.toUpperCase().indexOf(this.texto)>=0){
                    e.click();
                    achou=true;
                    break;
                }
            }
            if(!achou){
                this.indexBusca = oldIndex;
            }
        },
        buscarAnterior:function(){
            let oldIndex = this.indexBusca;
            let achou = false;
            this.indexBusca--;
            for(;this.indexBusca>=0;this.indexBusca--) {
                let e = this.nodeItems[this.indexBusca];
                if(e.innerText && e.innerText.toUpperCase().indexOf(this.texto)>=0){
                    e.click();
                    achou=true;
                    break;
                }
            }
            if(!achou){
                this.indexBusca = oldIndex;
            }
        },
        abrirTodos: function(){
            let nodes = document.getElementsByClassName('crudTreeItem');
            for(let i=0;i<nodes.length;i++){
                let e=nodes[i];
                if(e.children.length === 3){
                    e.children[0].classList.remove('d-none');
                    e.children[1].classList.add('d-none');
                    e.nextSibling.classList.remove('d-none');
                }
            }
        },
        fecharTodos: function(){
            let nodes = document.getElementsByClassName('crudTreeItem');
            for(let i=0;i<nodes.length;i++){
                let e=nodes[i];
                if(e.children.length === 3){
                    e.children[0].classList.add('d-none');
                    e.children[1].classList.remove('d-none');
                    e.nextSibling.classList.add('d-none');
                }
            }
        },
        gerarNohs: function (createElement) {
            let result = [];
            let l = this.level(this.collection[this.index].classificacao);
            let css = 'ml-4 treeNode';
            while (l === this.level(this.collection[this.index].classificacao)) {
                let current = this.collection[this.index];
                let next = this.collection[this.index + 1];
                if (next === undefined) {
                    result.push(createElement('div', {
                        on: {click: (event) => this.elementClick(event, current)},
                        class: css + ' crudTreeItem noSelect pt-1'
                    }, [createElement('font-awesome-icon', {
                        style: {'font-size': '0.6em'},
                        attrs: {icon: 'square'}
                    }), ' ', createElement('small', {}, current.classificacao), " ", current.descricao]));
                    return result;
                } else {
                    let nextLevel = this.level(next.classificacao);
                    let children = undefined;
                    this.index++;
                    if (nextLevel > l) {
                        children = [
                            createElement('div', {
                                on: {click: (event) => this.elementClick(event, current)},
                                class: 'crudTreeItem noSelect pt-1'
                            }, [createElement('font-awesome-icon', {
                                on: {click: (event) => this.toggleFolder(event, this.collection[this.index])},
                                style: {'font-size': '0.7em'},
                                attrs: {icon: 'folder-open'}
                            }), createElement('font-awesome-icon', {
                                on: {click: (event) => this.toggleFolder(event, this.collection[this.index])},
                                class: "d-none",
                                style: {'font-size': '0.7em'},
                                attrs: {icon: 'folder'}
                            }), ' ', createElement('small', {}, current.classificacao), ' ', current.descricao]),
                            createElement('div', {}, this.gerarNohs(createElement))
                        ];
                    } else {
                        children = [createElement('div', {
                            on: {click: (event) => this.elementClick(event, current)},
                            class: 'crudTreeItem noSelect pt-1'
                        }, [createElement('font-awesome-icon', {
                            style: {'font-size': '0.6em'},
                            attrs: {icon: 'square'}
                        }), ' ', createElement('small', {}, current.classificacao), ' ', current.descricao])];
                    }
                    result.push(createElement('div', {class: css}, children));
                }
            }
            return result;

        },
        relacionarNohs: function(){
            let raiz = document.getElementsByClassName('crudTreeRoot')[0].children[1].children[0];
            this.nodeItems = [];
            this.buscaRecusiva = (e)=>{
              this.nodeItems.push(e);
              let parent = e.parentElement;
              if(parent.children.length === 2){
                  let filhos = parent.children[1].children;
                  for(let i=0;i<filhos.length;i++){
                      this.buscaRecusiva(filhos[i].children[0]);
                  }
              }
            };
            this.buscaRecusiva(raiz);
        },
        toggleFolder: function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.currentTarget.parentElement.children[0].classList.toggle('d-none');
            event.currentTarget.parentElement.children[1].classList.toggle('d-none');
            event.currentTarget.parentElement.nextSibling.classList.toggle('d-none');
        },
        elementClick: function (event, element) {
            event.stopPropagation();
            event.preventDefault();
            if (this.selected) {
                this.selected.classList.remove(['bold']);
            }
            event.currentTarget.classList.add(['bold']);
            this.selected = event.currentTarget;
            this.cadastro = element;
            this.$forceUpdate();
        },
        contextMenu: function(event,element){
            console.log(event,element);
        },
        level: function (classificacao) {
            let q = 0;
            if (classificacao.indexOf('.') >= 0) {
                for (let i = 0; i < classificacao.length; i++) {
                    q += (classificacao[i] === '.');
                }
            }
            return q;
        },
        getCrud () {
            let c = this.$parent;
            while (c && c.$options._componentTag !== 'cr-crud') {
                c = c.$parent;
            }
            return c;
        }
    }

});
