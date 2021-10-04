<template>
    <div id="app" class="flexCol">
        <div class="bc-silver flexRow">
            <div>
                <h2 class="ml-2">SISQUALI</h2>
            </div>
            <div class="flexGrow d-flex flexSpaceAround pt-5">
                <router-link :to="{name:'AmostraTipoCad'}">Tipos de Amostra</router-link>
                <router-link :to="{name:'LaboratorioCad'}">Laboratorios</router-link>
                <router-link :to="{name:'PlanoOperacionalCad'}">Plano Operacional</router-link>
                <router-link :to="{name:'PlanoOperacionalAprov'}">Aprovar Plano Op.</router-link>
                <router-link :to="{name:'EnsaioTipoCad'}">Tipos de Ensaio</router-link>
                <router-link :to="{name:'UsuarioCad'}">Usuarios</router-link>
            </div>
        </div>
        <div class="flexGrow">
            <router-view/>
        </div>
        <div class="messages">
            <div v-for="(m,index) in messages" :key="index" :class="m.clazz" @click="remover(index)">{{m.message}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        created: function() {
            let self = this;
            this.$root.mens = function () {
                return {
                    clear () {
                        self.messages = [];
                    },
                    count () {
                        return self.messages.length;
                    },
                    success (title, message) {
                        self.messages.push({title: title, clazz: 'mens-success', message: message});
                        self.show = true;
                        setTimeout(() => {
                            if (self.messages.length > 0) {
                                self.messages.splice(0, 1);
                            }
                        }, 1000 * 15);
                    },
                    error (title, message) {
                        self.messages.push({title: title, clazz: 'mens-error', message: message});
                        self.show = true;
                        setTimeout(() => {
                            if (self.messages.length > 0) {
                                self.messages.splice(0, 1);
                            }
                        }, 1000 * 15);
                    },
                    info (title, message) {
                        self.messages.push({title: title, clazz: 'mens-info', message: message});
                        self.show = true;
                        setTimeout(() => {
                            if (self.messages.length > 0) {
                                self.messages.splice(0, 1);
                            }
                        }, 1000 * 15);
                    }
                };
            }.bind(this)();

        },
        data: function () {
            return {
                messages: [],
            };
        },
        methods: {
        }
    }
</script>
<style scoped>
    .menuBt {
        background-color: white;
        width: 50px;
        border: 1px solid silver;
        margin: 2px;
        margin-left:5px;
    }

    .menuBt:hover {
        box-shadow: 1px 1px 1px darkseagreen;
    }
</style>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }

    body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    .unset {
        all: unset;
    }

    .initial {
        all: initial;
    }

    .inherit {
        all: inherit;
    }

    table {
        border: 1px solid silver;
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
    }

    table > caption {
        font-weight: bold;
        text-align: left;
        background-color: gainsboro;
        border: 1px solid silver;
        padding: 0.2em;
        padding-left: 0.5em;
    }

    th:first-child {
        border-bottom: 1px solid silver;
    }

    th {
        border-left: 1px solid silver;
        border-bottom: 1px solid silver;
        background-color: #e5e5e5;
        padding: 0.6em;
    }

    td:first-child {
        border-bottom: 1px solid silver;
    }

    td {
        border-left: 1px solid silver;
        border-bottom: 1px solid silver;
        padding: 0.4em;
    }

    tbody > tr {
        background-color: white;
    }

    tbody > tr.selected {
        background-color: #dcdcdc;
        font-weight: bold;
    }

    tbody > tr:hover {
        background-color: #eeeeee;
    }

    .flexCol {
        display: flex;
        flex-direction: column;
    }

    .flexRow {
        display: flex;
        flex-direction: row;
    }

    .flexGrow {
        flex-grow: 1;
    }

    .hBorder {
        border-left: 1px solid silver;
        border-right: 1px solid silver;
    }

    .flexWrap {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .flexNoWrap {
        flex-wrap: nowrap !important;
    }

    .flexEnd {
        justify-content: flex-end;
    }

    .flexCenter {
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .flexAutoEnd{
        align-self: flex-end;
    }
    .flexAutoCenter{
      align-self: center;
    }
    .d-inline {
        display: inline-block;
    }

    .d-none {
        display: none !important;
    }

    .d-block {
        display: block;
    }

    .d-contents {
        display: contents;
    }


    .d-flex {
        display: flex;
    }

    .flexStartAlign {
        align-items: flex-start;
    }

    .flexSpaceAround {
        justify-content: space-around;
    }
    .w-auto {
        width: auto !important;
    }

    .h-auto {
        height: auto !important;
    }

    .full {
        width: 100%;
        height: 100%;
    }

    .wFull {
        width: 100%
    }

    .hFull {
        height: 100%;
    }

    .m-0 {
        margin: 0 !important;
    }

    .m-auto {
        margin: auto;
    }

    .m-1 {
        margin: 0.3em;
    }

    .m-2 {
        margin: 0.6em;
    }

    .m-3 {
        margin: 0.9em;
    }

    .m-4 {
        margin: 1.2em;
    }

    .m-5 {
        margin: 1.5em;
    }

    .mr-0 {
        margin-right: 0 !important;
    }

    .mr-1 {
        margin-right: 0.3em;
    }

    .mr-2 {
        margin-right: 0.6em;
    }

    .mr-3 {
        margin-right: 0.9em;
    }

    .mr-4 {
        margin-right: 1.2em;
    }

    .mr-5 {
        margin-right: 1.5em;
    }

    .ml-0 {
        margin-left: 0 !important;
    }

    .ml-1 {
        margin-left: 0.3em;
    }

    .ml-2 {
        margin-left: 0.6em;
    }

    .ml-3 {
        margin-left: 0.9em;
    }

    .ml-4 {
        margin-left: 1.2em;
    }

    .ml-5 {
        margin-left: 1.5em;
    }

    .mh-0 {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .mh-1 {
        margin-left: 0.3em;
        margin-right: 0.3em;
    }

    .mh-2 {
        margin-left: 0.6em;
        margin-right: 0.6em;
    }

    .mh-3 {
        margin-left: 0.9em;
        margin-right: 0.9em;
    }

    .mh-4 {
        margin-left: 1.2em;
        margin-right: 1.2em;
    }

    .mh-5 {
        margin-left: 1.5em;
        margin-right: 1.5em;
    }

    .mt-0 {
        margin-top: 0 !important;
    }

    .mt-1 {
        margin-top: 0.3em;
    }

    .mt-2 {
        margin-top: 0.6em;
    }

    .mt-3 {
        margin-top: 0.9em;
    }

    .mt-4 {
        margin-top: 1.2em;
    }

    .mt-5 {
        margin-top: 1.5em;
    }

    .mt-6 {
        margin-top: 1.8em;
    }

    .mt-7 {
        margin-top: 2.1em;
    }

    .mb-0 {
        margin-bottom: 0 !important;
    }

    .mb-1 {
        margin-bottom: 0.3em;
    }

    .mb-2 {
        margin-bottom: 0.6em;
    }

    .mb-3 {
        margin-bottom: 0.9em;
    }

    .mb-4 {
        margin-bottom: 1.2em;
    }

    .mb-5 {
        margin-bottom: 1.5em;
    }

    .mv-0 {
        margin-bottom: 0 !important;
        margin-top: 0 !important;
    }

    .mv-1 {
        margin-bottom: 0.3em;
        margin-top: 0.3em;
    }

    .mv-2 {
        margin-bottom: 0.6em;
        margin-top: 0.6em;
    }

    .mv-3 {
        margin-bottom: 0.9em;
        margin-top: 0.9em;
    }

    .mv-4 {
        margin-bottom: 1.2em;
        margin-top: 1.2em;
    }

    .mv-5 {
        margin-bottom: 1.5em;
        margin-top: 1.5em;
    }

    .p-0 {
        padding: 0 !important;
    }

    .p-1 {
        padding: 0.3em;
    }

    .p-2 {
        padding: 0.6em;
    }

    .p-3 {
        padding: 0.9em;
    }

    .p-4 {
        padding: 1.2em;
    }

    .p-5 {
        padding: 1.5em;
    }

    .pr-0 {
        padding-right: 0 !important;
    }

    .pr-1 {
        padding-right: 0.3em;
    }

    .pr-2 {
        padding-right: 0.6em;
    }

    .pr-3 {
        padding-right: 0.9em;
    }

    .pr-4 {
        padding-right: 1.2em;
    }

    .pr-5 {
        padding-right: 1.5em;
    }

    .pl-0 {
        padding-left: 0 !important;
    }

    .pl-1 {
        padding-left: 0.3em;
    }

    .pl-2 {
        padding-left: 0.6em;
    }

    .pl-3 {
        padding-left: 0.9em;
    }

    .pl-4 {
        padding-left: 1.2em;
    }

    .pl-5 {
        padding-left: 1.5em;
    }

    .ph-0 {
        padding-left: 0!important;
        padding-right: 0!important;
    }

    .ph-1 {
        padding-left: 0.3em;
        padding-right: 0.3em;
    }

    .ph-2 {
        padding-left: 0.6em;
        padding-right: 0.6em;
    }

    .ph-3 {
        padding-left: 0.9em;
        padding-right: 0.9em;
    }

    .ph-4 {
        padding-left: 1.2em;
        padding-right: 1.2em;
    }

    .ph-5 {
        padding-left: 1.5em;
        padding-right: 1.5em;
    }

    .pt-0 {
        padding-top: 0 !important;
    }

    .pt-1 {
        padding-top: 0.3em;
    }

    .pt-2 {
        padding-top: 0.6em;
    }

    .pt-3 {
        padding-top: 0.9em;
    }

    .pt-4 {
        padding-top: 1.2em;
    }

    .pt-5 {
        padding-top: 1.5em;
    }

    .pb-0 {
        padding-bottom: 0 !important;
    }

    .pb-1 {
        padding-bottom: 0.3em;
    }

    .pb-2 {
        padding-bottom: 0.6em;
    }

    .pb-3 {
        padding-bottom: 0.9em;
    }

    .pb-4 {
        padding-bottom: 1.2em;
    }

    .pb-5 {
        padding-bottom: 1.5em;
    }

    .pv-0 {
        padding-bottom: 0!important;
        padding-top: 0!important;
    }

    .pv-1 {
        padding-bottom: 0.3em;
        padding-top: 0.3em;
    }

    .pv-2 {
        padding-bottom: 0.6em;
        padding-top: 0.6em;
    }

    .pv-3 {
        padding-bottom: 0.9em;
        padding-top: 0.9em;
    }

    .pv-4 {
        padding-bottom: 1.2em;
        padding-top: 1.2em;
    }

    .pv-5 {
        padding-bottom: 1.5em;
        padding-top: 1.5em;
    }

    .cl-white {
        color: white
    }

    .cl-red {
        color: red
    }

    .cl-silver {
        color: silver
    }

    .bc-red {
        background-color: red
    }

    .bc-white {
        background-color: white
    }

    .bc-silver {
        background-color: silver
    }

    .bc-lightgray {
        background-color: lightgray
    }

    .bc-aliceblue {
        background-color: aliceblue
    }

    .round-none {
        border-radius: 0 !important;
    }

    .circle {
        border-radius: 100% !important;
    }

    .bold {
        font-weight: bold;
    }

    .ta-right {
        text-align: right;
    }

    .ta-center {
        text-align: center;
    }

    .va-midle {
        vertical-align: middle;
    }

    .midle {
        text-align: center;
        vertical-align: middle;
    }


    .rightScroll{
      overflow-y: scroll;
    }


    /*-----------------------------------*/
    .messages {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 10px;
        right: 10px;
    }

    .messages > div {
        padding: 0.5em;
        border-radius: 0.3em;
        margin-bottom: 0.2em;
        cursor: pointer;
    }

    .mens-info {

        background-color: rgba(181, 186, 242, 0.5);
        border: 1px solid #2d3758;
    }

    .mens-success {

        background-color: rgba(184, 238, 185, 0.5);
        border: 1px solid #0b580c;
    }

    .mens-error {

        background-color: rgba(238, 138, 138, 0.8);
        border: 1px solid #580003;
    }

    .filterOption {
        border: 1px solid silver;
        margin: 0.1em 0.1em 0;
        padding: 0.2em;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .filterOption > label {
        background-color: #a6a6a6;
        padding: 0.2em;
        color: white;
        margin: -0.25em 0.2em -0.2em -0.2em;
        padding: 0.5em 0.5em 0em 0.5em;
        border-top-left-radius: 5px;
    }

    .filterOption > div > label > input {
        margin-top: 0.3em;
    }

    .retractedImage {
        height: 1em;
        overflow: hidden;
    }

    .retractedImage:hover {
        height: auto;
    }

    .crudContainer {
        display: flex !important;
        flex-direction: column;
        height: 100%;
    }

    .crudPanel {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .crudPanel.boxShadow {
        margin: 0.5em;
        padding: 0.5em;
        border: 1px solid silver;
        box-shadow: 1px 1px 2px grey;
    }

    .crudPanel.boxSingle {
        margin: 0.5em;
        padding: 1em;
        border: 1px solid silver;
    }

    .crudTreeItem:hover{
        background-color: silver;
    }
    .panelTitle {
        border-bottom: 1px solid silver;
        font-size: 0.8em;
        font-weight: bold;
        padding: 0.2em;
        padding-left: 0.5em;
        margin-bottom: 0.5em;
        margin-left: -0.6em !important;
        margin-right: -0.6em;
        background-color: lightgrey;
        margin-top: -0.65em;
    }

    .noGrow {
        flex-grow: unset;
    }

    input {
        outline: none !important;
        border: 1px solid silver;
        margin: 1px;
        border-radius: 3px;
    }
    .bordered {
        outline: none !important;
        border: 1px solid silver;
        margin: 1px;
        border-radius: 3px;
    }
    .noBorder, .noBorder:focus{
        border: none;
    }
    .noSelect {
        user-select: none;
    }
    .error > input {
        border: 1px solid red;
    }

    .error > label {
        color: red;
    }

    .error > input:focus {
        border: 2px solid red;
    }

    input:focus, select:focus, button:focus {
        outline: none !important;
        border: 2px solid steelblue;
        margin: 0;
    }

    input[type=checkbox]:focus {
        box-shadow: 0px 0px 0px 1px steelblue;
        margin: 0;
    }

    .inputGroup {
        display: flex;
        flex-wrap: wrap;
        padding: 0 0.5em 0.5em 0.5em;
    }

    .inputGroupGeneral {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.3em;
    }
    .labelTop .inputGroupGeneral{
      flex-grow: 1;
    }
    .inputSelect {
        min-width: 15ch;
        border: 1px solid silver;
        border-radius: 0.25em;
        padding: 0.25em 0.5em;
        cursor: pointer;
        line-height: 1.1;
        background-color: #fff;
        background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
    }

    .inputDate {
        font-family: arial;
        font-size: 1em !important;
        padding: 0.151em !important;
        max-width: 207px;
    }

    .inputErrorMessage {
        color: red;
        display: block;
        width: 100%;
    }

    .inputErrorMessage > svg {
        font-size: 0.7em;
        padding-botton: 0.2em;
        margin-right: 0.3em;
    }

    .crudButtonsGroup {
        margin: 0.5em 0.5em 0 0.5em;
    }

    .inputGroup input, select {
        font-size: 1em;
        padding: 5px;
    }

    .crudLabel {
        font-weight: bold;
        padding-right: 0.5em;
        padding-top: 0.25em;
        white-space: nowrap;
    }

    .labelLeft .crudLabel {
        width: auto;
        padding-top: 0.4em;
        text-align: right;
    }

    .labelTop .crudLabel {
        width: 100%;
        padding-top: 0.4em;
        text-align: left;
    }

    .singleLabel .crudLabel {
        width: auto;
        padding-top: 0.4em;
    }

    .singleLabel input {
        flex-grow: 1;
    }

    .singleLabel .inputGroup {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .crudLabelCheck {
        font-weight: bold;
        padding-left: 0.5em;
    }

    .crudFormLine {
        display: flex;
        width: 100%;
    }

    .lineGrow {
        width: 100%;
        flex-grow: 1;
    }

    .remaining {
        flex-grow: 1;
    }

    .crudButtonExclude {
        background-color: orangered;
        color: white;
    }

    .crudButtonCancel {
        background-color: #ffd51b;
        color: white;
    }

    .crudButtonSave {
        background-color: green;
        color: white;
    }
    .crudButton {
        padding: 5px;
        width: 80px;
        border-color: rgba(255, 255, 255, 0);
        border-style: solid;
        border-top-style: solid;
        border-top-width: 1px;
        border-left-style: solid;
        border-left-width: 1px;
        border-bottom-style: solid;
        border-bottom-width: 0px;
        border-right-style: solid;
        border-right-width: 0px;
        border-radius: 0.2em;
        box-shadow: none;
    }
    .crudButton:focus {
        padding: 4px 3px 3px 4px;
    }

    .crudButton:hover {
        border-color: rgba(255, 255, 255, 0);
        box-shadow: 2px 2px 3px silver;
        cursor: pointer;
    }

    .crudButton.primary {
        background-color: #7978ff;
        color: white;
    }

    .crudButton.secondary {
        background-color: #b6b7bc;
        color: white;
    }

    .crudButton.success {
        background-color: #1a8414;
        color: white;
    }

    .crudButton.success:disabled {
        background-color: #73846e;
        color: silver;
        cursor: not-allowed;
        box-shadow: none;

    }

    .crudButton.warning {
        background-color: #ffc285;
        color: white;
    }

    .crudButton.error {
        background-color: #ff626b;
        color: white;
    }

    .crudNumber {
        text-align: right;
    }

    .crudIcon.small > svg {
        width: 1em;
        height: 1em;
    }

    .crudIcon {
        padding: 5px;
        margin-right: 0.3em;
        border-color: rgba(255, 255, 255, 0);
        border-style: solid;
        border-top-style: solid;
        border-top-width: 1px;
        border-left-style: solid;
        border-left-width: 1px;
        border-bottom-style: solid;
        border-bottom-width: 0px;
        border-right-style: solid;
        border-right-width: 0px;
        border-radius: 0.2em;
        box-shadow: none;
    }

    .crudIcon:hover {
        border-color: rgba(255, 255, 255, 0);
        box-shadow: 2px 2px 3px silver;
        cursor: pointer;
    }

    .crudIcon.primary {
        background-color: #7978ff;
        color: white;
    }

    .inputCollection {
        border: 1px solid silver;
        margin-top: 0.5em;
    }

    .inputCollectionTitle {
        background-color: forestgreen;
        color: white;
        font-weight: bold;
        padding: 0.3em
    }

    .inputCollectionContainer {
        display: flex
    }

    .inputCollectionLeft {
        flex-grow: 1;
        padding: 3px;
    }

    .inputCollectionMidle {
        width: 6em;
        display: flex;
        flex-direction: column;
        vertical-align: middle;
        padding: 0.3em;

    }

    .inputCollectionRight {
        flex-grow: 1;
        padding: 3px;
    }

    .inputCollectionSelector {
        width: calc(100% - 5px);
        margin-bottom: 3px;
    }

    .inputCollectionButton {
        min-width: 6em;
    }

    .inputAutocompleteOptions {
        position: absolute;
        width: 39em;
    }

    .inputAutocompleContainer {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .hide {
        display: none;
    }

</style>
