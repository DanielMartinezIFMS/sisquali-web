<template>
    <div class="pgLine">
      <div class="pgButton" @click="paginar(1)" title="Início"><font-awesome-icon icon="step-backward"/></div>
      <div class="pgButton" @click="retroceder(10)" title="Volta 10 páginas"><font-awesome-icon icon="backward"/></div>
      <div class="pgButton" @click="retroceder(1)" title="Anterior" style="font-size: 1.4em; padding: 0.1em 0.1em 0.1em 0.4em;" ><font-awesome-icon icon="caret-left"/></div>
      <div v-for="(b,idx) in btns" @click="paginar(b)" :class="['pgButton',{btsel:b==pagina}]" :key="idx" >{{b}}</div>
      <div class="pgButton" @click="avancar(1)" title="Posterior" style="font-size: 1.4em; padding: 0.1em 0.1em 0.1em 0.4em;" ><font-awesome-icon icon="caret-right"/></div>
      <div class="pgButton" @click="avancar(10)" title="Avança 10 páginas"><font-awesome-icon icon="forward"/></div>
      <div class="pgButton" @click="paginar(pgTotal)" title="Final"><font-awesome-icon icon="step-forward"/></div>
      <strong style="border-right: 1px solid silver;"></strong>
      <strong class="ph-2" style="padding-top: 0.4em; border-right: 1px solid silver;"> {{pgTotal}} P&aacute;gina(s)</strong>
      <strong class="ph-2" style="padding-top: 0.4em; border-right: 1px solid silver;">{{colecao.length}} Linha(s)</strong>
      <input-integer min="10" step="5" style="padding-bottom: 0;" width="4em" v-model="lpp" label="Linhas por página"></input-integer>
      <div class="pgButton" @click="paginar(pagina)"><font-awesome-icon icon="redo-alt"/></div>
    </div>
</template>

<script>
  /**
   * collection - Nome da colecao completa
   * pgd-collection - Nome da colecao que recebe os iten da pagina corrente
   * linesByPg - Número de linhas por página
   */
  import InputInteger from '../form/inputInteger';
    export default {
        name: 'crTablePaginator',
        components: [InputInteger],
        data: function () {
          return {
            pagina: 1,
            colecao: [],
            lpp: undefined
          };
        },
        props: ['collection', 'pgdCollection', 'linesByPg'],
        created: function () {
          this.colecao = this.$crUtils.getParentData(this.$parent.$parent, this.collection);
          this.lpp = (!this.linesByPg) ? 10 : this.linesByPg;
          this.paginar(1);
        },
        computed: {
          pgTotal: function () {
            let f = (this.colecao.length || 1) / this.lpp,
              q = Math.trunc(f);
            if ((f - q) > 0.0) {
              q++;
            }
            return q;
          },
          btns: function () {
            let i = 1, bts = [];
            if (this.pagina >= 3) {
              i = this.pagina - 2;
            }
            for (let x = 1; x <= 5; x++) {
              bts.push(i);
              i++;
              if (i > this.pgTotal) break;
            }
            return bts;
          }
        },
      methods: {
          paginar: function (p) {
            let i = (p * this.lpp) - this.lpp, l = [];
            for (let x = 0; x < this.lpp; x++) {
              if (this.colecao[i + x]) {
                l.push(this.colecao[i + x]);
              }
            }
            let s = this.$crUtils.getScopeOf(this.$parent, this.pgdCollection);
            s[this.pgdCollection] = l;
            this.pagina = p;
            s.$forceUpdate();
          },
          retroceder: function (q) {
            let p = this.pagina - q;
            if (p < 1) {
              p = 1;
            }
            this.paginar(p);
          },
          avancar: function (q) {
            let p = this.pagina + q;
            if (p > this.pgTotal) {
              p = this.pgTotal;
            }
            this.paginar(p);
          }
      }

    };
</script>

<style scoped>
  .pgButton {
    padding: 5px;
    margin: 2px;
    margin-right: 0.2em;
    width: 30px;
    background-color: gainsboro;
    border: 1px solid rgba(255, 255, 255, 0);
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-radius: 0.2em;
    box-shadow: none;
  }

  .pgButton:hover {
    border-color: rgba(255, 255, 255, 0);
    box-shadow: 2px 2px 3px silver;
    cursor: pointer;
  }
  .pgLine {
    display:flex;
    flex-direction: row;
    border: 1px solid silver;
    background-color: #f6f6f6;
  }
  .btsel {
    background-color: #235080;
    color: white;
  }
</style>
