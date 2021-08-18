<template>
  <div class="flexCol mt-1 ml-1" style="flex-grow: 1;">
    <div class="flexRow">
      <div v-for="(op,index) in tabs" v-bind:key="index" :class="{tab:true,tabSelected:op==selected}"
           @click="abrir(op)">{{op.title}}
      </div>
      <div class="tabLast flexGrow"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
    /**
     * Container de abas
     * -------------
     * abrir(tab)
     */
  export default {
    name: 'crTab',
    data: function () {
      return {
        tabs: [],
        selected: undefined
      };
    },
    methods: {
      abrir: function (tab) {
        this.selected = tab;
        this.tabs.map(c => {
          c.show(c === tab);
        });
      },
      addTab: function (tab) {
        if (this.tabs.push(tab) === 1) {
          this.selected = tab;
          tab.show(true);
        } else {
          tab.show(false);
        }
      }
    }
  };
</script>

<style scoped>
  .tab {
    padding: 0.5em;
    border: 1px solid silver;
    margin-top: 0.3em;
    background-color: #fbfbfb;
    color: dimgrey;
  }

  .tabSelected {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: none;
    margin-top: 0;
    background-color: #f8f8f8;
    color: midnightblue;
  }

  .tabLast {
    border-bottom: 1px solid silver;
  }
</style>
