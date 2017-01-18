import GLOBAL_PATH from 'static/path.js'
import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource);

export default {
    state: {
        msg: '详细数据报表',
        jsonData: [],
        searchArea: localStorage.city ? localStorage.city : '',
        lastSearchArea: null,
        abledToSearch: true,
    },
    mutations: {
        details_toggleSearch(state) {
            state.abledToSearch = !state.abledToSearch;
        },
        details_successSearch(state, args) {
            state.jsonData = args.jsonData;
            state.lastSearchArea = args.lastSearchArea;
        },
        details_update_searchArea(state, val) {
            state.searchArea = val
        },
    },
    actions: {
        details_search({ commit, state }) {
            let searchArea = state.searchArea.trim();
            if (state.lastSearchArea === searchArea || state.abledToSearch === false) {
                return false;
            }
            commit('global_toggleLoading');
            commit('details_toggleSearch');
            // let today = new Date();
            // let collectionName = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '_' + today.getHours() + ':00';
            let collectionName = 'latest';
            Vue.http.jsonp(GLOBAL_PATH.JSONP_URI + 'getData', {
                params: {
                    'reqCollection': collectionName,
                    'reqArea': searchArea
                }
            }).then((res) => {
                commit('global_toggleLoading');
                commit({
                    type: 'details_successSearch',
                    jsonData: res.data.data,
                    lastSearchArea: searchArea
                })
                commit('details_toggleSearch');
            }, (err) => {
                commit('details_toggleSearch');
                commit('global_toggleLoading');
                console.log(err);
            });
        }
    }
}
