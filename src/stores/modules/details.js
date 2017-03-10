import GLOBAL_PATH from 'static/path.js'
import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource);

export default {
    state: {
        msg: '详细数据报表',
        jsonData: [],
        searchVal: localStorage.city ? localStorage.city : '',
        dateVal: Date(),
        hourVal: '6:00',
        lastsearchVal: null,
        lasttimeVal: null,
        abledToSearch: true,
    },
    mutations: {
        details_toggleSearch(state) {
            state.abledToSearch = !state.abledToSearch;
        },
        details_successSearch(state, args) {
            state.jsonData = args.jsonData;
            state.lastsearchVal = args.lastsearchVal;
        },
        details_update_searchVal(state, val) {
            state.searchVal = val;
        },
        details_update_dateVal(state, val) {
            state.dateVal = val;
        },
        details_update_hourVal(state, val) {
            state.hourVal = val;
        },
    },
    actions: {
        details_search({ commit, state, rootState }) {
            let dateStr = new Date(state.dateVal);
            dateStr = `${dateStr.getFullYear()}-${dateStr.getMonth()+1}-${dateStr.getDate()}_${state.hourVal}`
            // console.log(dateStr);
            let searchVal = state.searchVal.trim().replace(/[市|县]/, function(){return '';});
            if (state.lasttimeVal === dateStr && state.lasttimeVal === lastsearchVal || state.abledToSearch === false) {
                return false;
            }
            /* 如果查找全部且存在数据,不进行请求,直接读localStorage */
            if(localStorage[dateStr]){
                // console.log(JSON.parse(localStorage[dateStr]))
                let data = JSON.parse(localStorage[dateStr]);
                if(data.length !== 0) {
                    commit({
                        type: 'details_successSearch',
                        jsonData: JSON.parse(localStorage[dateStr]),
                        lastsearchVal: searchVal,
                        lasttimeVal: dateStr
                    })
                    return ;
                }
            }
            commit('global_showLoading');
            commit('details_toggleSearch');
            // Vue.http.jsonp(GLOBAL_PATH.JSONP_URI + 'getData', {
            // Vue.http.post(GLOBAL_PATH.JSONP_URI + 'getData', {
            Vue.http.get(GLOBAL_PATH.JSONP_URI + 'getData', {
                params: {
                    'reqCollection': dateStr,
                    'reqArea': searchVal
                }
            }).then((res) => {
                var data = res.data;
                commit({
                    type: 'details_successSearch',
                    jsonData: data.data,
                    lastsearchVal: searchVal,
                    lasttimeVal: dateStr
                });
                if(searchVal == ''){
                    localStorage[dateStr] = JSON.stringify(data.data);
                }
                commit('global_hideLoading');
                commit('details_toggleSearch');
            }, (err) => {
                commit('details_toggleSearch');
                commit('global_hideLoading');
                console.log(err);
            });
        }
    }
}
