import Vue from 'vue';
import CrTable from '../common/crTable';
import CrDisplay from '../form/crDisplay';
import CrPanel from '../form/crPanel';
import lineGrow from '../form/lineGrow';
import CrWindow from '../common/crWindow';
export default Vue.component('crCrudTree', {
    components: {CrTable, CrDisplay, CrPanel,lineGrow,CrWindow},
    render: function (createElement) {
        let self = this;
        if (!self.lista || self.lista.length === 0)
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
            let tree = createElement('div', {class: 'flexGrow  mt-1 flexCol'}, [controles,createElement('div',{class:'flexGrow crudTreeRoot rightScroll mb-1'},items)]);
            return createElement('div', {class: 'flexRow pl-1 hFull '+((!this.show)?'hide':'')}, [
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
                        createElement('cr-bt',{attrs:{'success':''},on:{click:()=>this.novo()}},["Novo"]),
                        createElement('cr-bt',{attrs:{'success':'','wAuto':''},on:{click:()=>this.novoItem()}},["Novo item como este"]),
                        createElement('cr-bt',{attrs:{'success':'','wAuto':''},on:{click:()=>this.novoSubItem()}},["Novo subitem deste"]),
                        createElement('div',{class:'flexGrow'}),
                        createElement('cr-bt',{attrs:{'warning':'','wAuto':''},on:{click:()=>this.$refs.wmover.open()}},["Mover para"]),
                        createElement('cr-bt',{attrs:{'primary':'','wAuto':''},on:{click:()=>this.editar()}},["Alterar / Excluir"]),
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
    props:['conf','title'],
    beforeMount: function () {
        this.index = undefined;
        this.selected = undefined;
        let c = this.getCrud();
        if(!c.$parent[c.config].sortFn){
            c.$parent[c.config].sortFn = function(a,b){
                if(a.classificacao<b.classificacao) return -1;
                else if(a.classificacao<b.classificacao) return 1;
                else return 0;
            };
        }
        this.carregarDados();
    },
    data: function () {
        return {
            lista:[],
            cadastro: {},
            tableConf: {
                emptyMessage: '...',
                fields: 'Classificação|50=>classificacao,Item|100=>descricao'
            },
            show:true,
        }
    },
    updated: function() {
        this.relacionarNohs();
    },
    methods: {
        sincronizar: function (){
            let crud = this.getCrud();
            this.lista = crud.$parent[crud.collection];
            this.$forceUpdate();
            this.$nextTick(()=> {
                if (this.nodeItems && this.cadastro) {
                    for (let i = 0; i < this.nodeItems.length; i++) {
                        let item = this.nodeItems[i];
                        if (item.getElementsByTagName('small') && item.getElementsByTagName('small')[0].innerText ===this.cadastro.classificacao) {
                            item.click();
                            break;
                        }
                    }
                }
            });
        },
        carregarDados: function () {
            let crud = this.getCrud();
            let self = this;
            let args = (this.filters) ? '?args=' + encodeURI(JSON.stringify(this.filters)) : '';
            this
                .$get(crud.$parent[crud.config].url + '/listar' + args)
                .then(data => {
                    crud.$parent[crud.collection] = data;
                    this.lista = data;
                }).catch((error) => {
                self.console.error('Error:', error);
            });
        },
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
            let l = this.level(this.lista[this.index].classificacao);
            let css = 'ml-4 treeNode';
            while (l === this.level(this.lista[this.index].classificacao)) {
                let current = this.lista[this.index];
                let next = this.lista[this.index + 1];
                if (next === undefined) {
                    result.push(createElement('div',{class:css},[
                        createElement('div', {
                            on: {click: (event) => this.elementClick(event, current)},
                            class: ' crudTreeItem noSelect pt-1'
                        }, [createElement('font-awesome-icon', {
                            style: {'font-size': '0.6em'},
                            attrs: {icon: 'square'}
                        }), ' ', createElement('small', {}, current.classificacao), " ", current.descricao])
                    ]))
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
                                on: {click: (event) => this.toggleFolder(event, this.lista[this.index])},
                                style: {'font-size': '0.7em'},
                                attrs: {icon: 'folder-open'}
                            }), createElement('font-awesome-icon', {
                                on: {click: (event) => this.toggleFolder(event, this.lista[this.index])},
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
            this.nodeItems = [];
            if(document.getElementsByClassName('crudTreeRoot').length>0) {
                let raiz = document.getElementsByClassName('crudTreeRoot')[0].children[0].children[0];
                this.buscaRecusiva = (e) => {
                    this.nodeItems.push(e);
                    let parent = e.parentElement;
                    if (parent.children.length === 2) {
                        let filhos = parent.children[1].children;
                        for (let i = 0; i < filhos.length; i++) {
                            this.buscaRecusiva(filhos[i].children[0]);
                        }
                    }
                };
                this.buscaRecusiva(raiz);
            }
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
        },
        editar () {
            var item = this.cadastro, index = this.lista.indexOf(this.cadastro);
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
            if(crud.validator) {
                crud.validator.clear(crud.$parent.$refs);
            }
            form.show(true);
            if (filter) {
                filter.show(false);
            }
            this.show = false;
            crud.$parent.$forceUpdate();
        },
        novo () {
            if(this.nodeItems.length===0) {

                let crud = this.getCrud();
                let form = crud.getForm();
                let a = this.conf.mask.replaceAll('>','').replaceAll('<','').split('.');
                let v = (1).toString().padStart(a[0].length,'0');
                crud.$parent[crud.$props.entity] = {classificacao:v};
                if (crud.getConf().onNew) {
                    crud.getConf().onNew(crud.$parent[crud.$props.entity]);
                }
                if (crud.validator) {
                    crud.validator.clear(crud.$parent.$refs);
                }
                form.show(true);
                this.show = false;
                crud.backup = null;
            }else{
                this.nodeItems[this.nodeItems.length-1].click();
                this.novoItem();
            }
        },
        novoItem () {
            let crud = this.getCrud();
            let form = crud.getForm();
            let parent = this.selected.parentNode.parentNode.parentNode; //pai
            parent.click();
            let parentItem = this.cadastro;
            parent =  parent.children[1].lastChild.firstChild; //ultimo filho
            parent.click();
            let a = this.cadastro.classificacao.split('.')
            let t = a[a.length-1].length;
            let v = Number.parseInt(a[a.length-1])+1;
            a[a.length-1] = v.toString().padStart(t,'0');
            let classificacao = a.join('.');

            crud.$parent[crud.$props.entity] = {classificacao: classificacao,amostraTipoPai:parentItem};
            if (crud.getConf().onNew) {
                crud.getConf().onNew(crud.$parent[crud.$props.entity]);
            }
            if(crud.validator) {
                crud.validator.clear(crud.$parent.$refs);
            }
            form.show(true);
            this.show = false;
            crud.backup = null;
        },
        novoSubItem () {
            let crud = this.getCrud();
            let form = crud.getForm();
            let hasSub = this.selected.nextSibling;
            let origin = this.selected; //pai

            if(hasSub){
                let parent = this.selected.parentNode; //div pai
                parent =  parent.children[1].lastChild.firstChild; //ultimo filho
                origin.click();
                let originItem = this.cadastro;
                parent.click();
                let a = this.cadastro.classificacao.split('.')
                let t = a[a.length-1].length;
                let v = Number.parseInt(a[a.length-1])+1;
                a[a.length-1] = v.toString().padStart(t,'0');
                let classificacao = a.join('.');
                crud.$parent[crud.$props.entity] = {classificacao: classificacao,amostraTipoPai:originItem};
            }else{
                origin.click();
                let originItem = this.cadastro;
                let a = this.cadastro.classificacao.split('.')
                let a2 = this.conf.mask.split('.');
                let v = 1;
                a.push(v.toString().padStart(a2[a.length].length,'0'));
                let classificacao = a.join('.');
                crud.$parent[crud.$props.entity] = {classificacao: classificacao,amostraTipoPai:originItem};
            }

            if (crud.getConf().onNew) {
                crud.getConf().onNew(crud.$parent[crud.$props.entity]);
            }
            if(crud.validator) {
                crud.validator.clear(crud.$parent.$refs);
            }
            form.show(true);
            this.show = false;
            crud.backup = null;
        },
    }

});
