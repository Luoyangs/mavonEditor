/**
 * Created by zhy on 2017/4/1.
 */
'use strict';

/**
 * mavonEditor
 * @author hinesboy
 */
const mavonEditor = require('./mavon-editor.vue');
const Row = require('./components/shopee-row.vue');
const Col = require('./components/shopee-col.vue');
const VueMavonEditor = {
    markdownIt: mavonEditor.mixins[0].data().markdownIt,
    mavonEditor: mavonEditor,
    LeftToolbar: require('./components/md-toolbar-left'),
    RightToolbar: require('./components/md-toolbar-right'),
    install: function(Vue) {
        Vue.component(Row.name, Row);
        Vue.component(Col.name, Col);
        Vue.component('mavon-editor', mavonEditor);
    }
};

module.exports = VueMavonEditor;
