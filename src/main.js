import Vue from 'vue';
import App from './App.vue';
import router from './router';
import u from './components/framework/crUtils';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSquare,faInfo,faArrowUp,faArrowDown,faTimesCircle,faCheckCircle,faFolderOpen,faFolder,faFile,faFileUpload, faUpload, faListOl ,faDownload, faComment, faEye, faImages, faQuestion, faGlobeAmericas, faMapSigns, faClock, faInfoCircle, faRedoAlt, faBackward, faForward, faStepBackward, faStepForward, faCaretLeft, faCaretRight, faSearch, faHandshake, faHandshakeSlash, faInbox, faBoxOpen, faPeopleCarry, faToggleOn, faToggleOff, faExclamation, faExclamationTriangle, faClone, faPen, faChevronRight, faChevronLeft, faAngleRight, faEdit, faCheck, faEraser, faTrashAlt, faBars, faBlog, faIdBadge, faLock, faSignOutAlt, faSyncAlt, faUserCircle, faTimes, faRecycle, faPlusSquare, faPlus, faMinus, faMinusSquare, faTools, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';


Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
// noinspection JSCheckFunctionSignatures
library.add([faSquare,faInfo,faArrowUp,faArrowDown,faTimesCircle,faCheckCircle, faFolderOpen, faFolder,faFile,faFileUpload, faUpload, faListOl, faDownload, faComment, faEye, faImages, faQuestion, faGlobeAmericas, faMapSigns, faClock, faInfoCircle, faRedoAlt, faBackward, faForward, faStepBackward, faStepForward, faCaretLeft, faCaretRight, faSearch, faHandshake, faHandshakeSlash, faInbox, faBoxOpen, faPeopleCarry, faToggleOn, faToggleOff, faExclamation, faExclamationTriangle, faClone, faPen, faChevronRight, faChevronLeft, faCheck, faEraser, faTrashAlt, faUserCircle, faBars, faSignOutAlt, faLock, faBlog, faIdBadge, faSyncAlt, faTimes, faRecycle, faPlusSquare, faPlus, faMinus, faMinusSquare, faTools, faEdit, faAngleRight, faExclamationCircle]);
Vue.config.productionTip = false;
u.inject(Vue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');