import Vue from 'vue';

/**
 * success,error,warning,info,primary,secondary
 * wAuto,width,height,circle
 * icon,iconRight,iconTop,iconStyle
 * pass - valor a ser retornado quando clicado
 */
export default Vue.component('crBt', {
    render: function (createElement) {
      let self = this, clazz = 'crudButton ', style = '';
      if (this.success !== undefined) {
        clazz += 'success ';
      } else if (this.error !== undefined) {
        clazz += 'error ';
      } else if (this.warning !== undefined) {
        clazz += 'warning ';
      } else if (this.info !== undefined) {
        clazz += 'info ';
      } else if (this.primary !== undefined) {
        clazz += 'primary ';
      } else if (this.secondary !== undefined) {
        clazz += 'secondary ';
      }
      if (this.wAuto !== undefined) {
        clazz += 'w-auto ';
      }

      if (this.circle !== undefined) {
        clazz += 'circle ';
      }
      if (this.width) {
        style += ' width:' + this.width + ';';
      }
      if (this.height) {
        style += ' height:' + this.height + ';';
      }

      let a = [];
      if (this.icon) {
        a.push(createElement('span',{style:'margin-right:0.2em;'},[createElement('font-awesome-icon', {style:this.iconStyle,attrs: {icon: this.icon}})]));
        a.push(this.$slots.default);
      } else if (this.iconRight) {
        a.push(this.$slots.default);
        a.push(createElement('font-awesome-icon', {style:this.iconStyle,attrs: {icon: this.iconRight}}));
      } else if (this.iconTop) {
        a.push(createElement('div', {style: 'width:100%;font-size:2em;'}, [createElement('font-awesome-icon', {style: this.iconStyle,attrs: {icon: this.iconTop}})]));
        a.push(this.$slots.default);
      } else {
        a.push(this.$slots.default);
      }

      return createElement('div',{style:'display:inline-block;margin-right:0.2em;'},[createElement('button', {
        class: clazz,
        style: style,
        domProps: {
          type: 'button',
          disabled: this.disabled
        },
        on: {
          click: function (event) {
            event.stopPropagation();
            if(self.pass){
                self.$emit('click', self.pass);
            }else {
                self.$emit('click', event);
            }
          }
        }
      }, a)]);
    },
    props: ['iconStyle','disabled','pass','width', 'height', 'circle', 'error', 'success', 'warning', 'info', 'primary', 'secondary', 'icon', 'iconRight', 'iconTop', 'wAuto']
});
