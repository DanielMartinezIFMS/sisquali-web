import Vue from 'vue';

export default Vue.component('crCrudTree', {
    render: function (createElement) {
        let self = this;
        if (!self.collection || self.collection.length===0)
            return createElement('div', {class: 'crudTreeNone'}, 'Nenhum item disponivel');
        else {
            self.index = 0;
            let children = self.gerarNohs(createElement);
            children.unshift('Tipos');
            return createElement('div', {class: 'ts-bold'}, children);
        }
    },
    props: ['collection'],
    created: function () {
        this.index = undefined;
    },
    methods: {
        gerarNohs: function (createElement) {
            let result = [];
            let l = this.level(this.collection[this.index].classificacao);
            let css = 'ml-5';
            while (l === this.level(this.collection[this.index].classificacao)) {
                let current = this.collection[this.index];
                let next = this.collection[this.index + 1];
                if (next === undefined) {
                    result.push(createElement('div', {class: css}, [createElement('font-awesome-icon', {style:{'font-size':'0.7em'},attrs: {icon: 'file'}}),' ',createElement('small',{},current.classificacao)," ",current.descricao]));
                    return result;
                } else {
                    let nextLevel = this.level(next.classificacao);
                    let children = undefined;
                    this.index++;
                    if (nextLevel > l) {
                        children = this.gerarNohs(createElement);
                        children.unshift(current.descricao);
                        children.unshift(" ");
                        children.unshift(createElement('small',{},current.classificacao));
                        children.unshift(" ");
                        children.unshift(createElement('font-awesome-icon', {style:{'font-size':'0.7em'},attrs: {icon: 'folder-open'}}));
                    } else {
                        children = [createElement('font-awesome-icon', {style:{'font-size':'0.7em'},attrs: {icon: 'file'}}),' ',createElement('small',{},current.classificacao),' ',current.descricao];
                    }
                    result.push(createElement('div', {class: css}, children));
                }
            }
            return result;

        },
        level: function (classificacao) {
            let q = 0;
            if (classificacao.indexOf('.')>=0) {
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
