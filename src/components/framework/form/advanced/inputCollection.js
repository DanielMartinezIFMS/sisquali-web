import Vue from 'vue'


export default Vue.component("inputCollection",{
    render:function(createElement){
        var self = this;
        return createElement('div',{class:"inputCollection"},[
            createElement('div',{class:"inputCollectionTitle"},[self.$attrs.label]),
            createElement('div',{class:"inputCollectionContainer"},[
                createElement('div',{class:"inputCollectionLeft"},[
                    createElement('input',{class:"inputCollectionSelector",on:{"click":function(event){

                          }}}),
                    this.$slots.default[0]
                ]),
                createElement('div',{class:"inputCollectionMidle"},[
                    createElement('div',{class:"lineGrow"}),
                    createElement('button',{props:{type:"button"},class:"inputCollectionButton"},["adicionar"]),
                    createElement('button',{props:{type:"button"},class:"inputCollectionButton"},["remover"]),
                    createElement('div',{class:"lineGrow"})

                ]),
                createElement('div',{class:"inputCollectionRight"},[
                    createElement('input',{class:"inputCollectionSelector"}),
                    this.$slots.default[1]
                ]),

            ]),
            createElement('div', {

                domProps: {
                    value: self.value
                },
                on: {
                    input: function (event) {
                        self.$emit('input', event.target.value)
                    }
                }
            })

        ])

    },
    props:['value']

});
