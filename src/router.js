import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home';
import AmostraTipoCad from './components/parametros/AmostraTipoCad';
import LaboratorioCad from './components/parametros/LaboratorioCad';
import PlanoOperacionalCad from './components/parametros/PlanoOperacionalCad';
import PlanoOperacionalAprov from './components/parametros/PlanoOperacionalAprov';
import EnsaioTipoCad from "@/components/parametros/EnsaioTipoCad";

Vue.use(Router);


export default new Router({
    routes: [
        {path: '/', name: 'Home', component: Home} ,
        {path: '/cad/amostratipo', name: 'AmostraTipoCad', component: AmostraTipoCad} ,
        {path: '/cad/laboratorio', name: 'LaboratorioCad', component: LaboratorioCad} ,
        {path: '/cad/planooperacional', name: 'PlanoOperacionalCad', component: PlanoOperacionalCad} ,
        {path: '/aprov/planooperacional', name: 'PlanoOperacionalAprov', component: PlanoOperacionalAprov} ,
        {path: '/cad/ensaioTipo', name: 'EnsaioTipoCad', component: EnsaioTipoCad} ,

    ]
});
