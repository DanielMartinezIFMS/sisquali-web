import Vue from 'vue';
import CrTable from '../common/crTable';
import CrDisplay from '../form/crDisplay';
import CrPanel from '../form/crPanel';

export default Vue.component('crCrudTree', {
    render: function (createElement) {
        let self = this;
        if (!self.collection || self.collection.length === 0)
            return createElement('div', {class: 'crudTreeNone'}, 'Nenhum item disponivel');
        else {
            self.index = 0;
            let children = self.gerarNohs(createElement);
            children.unshift('Tipos');
            children.unshift(createElement('div', {class:'flexRow mt-2 mb-2'}, [
                createElement('cr-bt',{on:{click:()=>{this.abrirTodos()}},attrs:{wAuto:'',primary:'',icon:'folder-open',title:'Abrir todos'}}),
                createElement('cr-bt',{on:{click:()=>{this.fecharTodos()}},attrs:{wAuto:'',primary:'',icon:'folder',title:'Fechar todos'}}),
                createElement('div',{class:'flexGrow flexRow bordered'},[
                    createElement('input',{on:{input:(event)=>this.buscar(event)},class:'flexGrow noBorder mr-1',attrs:{type:'text',placeHolder:'Digite o texto a localizar aqui'}}),
                    createElement('font-awesome-icon',{style:{'font-size':'0.9em','margin-top':'0.2em','margin-right':'0.1em','color':'silver'},attrs:{icon:'search',primary:undefined}},['Anterior']),
                ]),
                createElement('cr-bt',{class:'ml-1',attrs:{wAuto:'',primary:'',icon:'arrow-down'}},['Próximo']),
                createElement('cr-bt',{attrs:{wAuto:'',primary:'',icon:'arrow-up'}},['Anterior']),

            ]));
            let tree = createElement('div', {class: 'flexGrow crudTreeRoot'}, children);
            return createElement('div', {class: 'flexRow pl-1'}, [
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
                    })
                ])]
            )
        }
    },
    props: ['collection'],
    components: {CrTable, CrDisplay, CrPanel},
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
    methods: {
        buscar:function(event){
            this.indexBusca=0;
            let nodes = document.getElementsByClassName('crudTreeItem');
            let texto = event.currentTarget.value.toUpperCase();
            for(;this.indexBusca<nodes.length;this.indexBusca++) {
                let e = nodes[this.indexBusca];
                if(e.innerText.toUpperCase().indexOf(texto)>=0){
                    e.click();
                }
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
            let result = [];
            this.buscaRecusiva = (e)=>{

              if(e.nextSibling){
                console.log('ops')
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
