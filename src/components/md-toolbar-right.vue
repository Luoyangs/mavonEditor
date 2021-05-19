<template>
      <div class="v-right-item">
        <slot name="right-toolbar-before" />
        
        <button type="button" v-if="toolbars.readmodel" @click="$clicks('read')" class="op-icon fa fa-mavon-window-maximize" aria-hidden="true"
                :title="`${d_words.tl_read} (F11)`"></button>
        <button type="button" v-if="toolbars.subfield" @click="$clicks('subfield')" class="op-icon fa fa-mavon-columns" aria-hidden="true"
                :class = "{'selected': s_subfield}" :title="`${s_subfield ? d_words.tl_single_column : d_words.tl_double_column} (F12)`"></button>
        <span
                v-if=" toolbars.help && toolbars.htmlcode && toolbars.readmodel && toolbars.fullscreen && toolbars.subfield && toolbars.navigation"
                class="op-icon-divider"></span>
        <button type="button"  v-if="toolbars.help" @click="$clicks('help')" class="op-icon fa fa-mavon-question-circle"
                 style="font-size: 17px;padding: 5px 6px 5px 3px"
                 :title="d_words.tl_help" aria-hidden="true"></button>
        <slot name="right-toolbar-after" />
      </div>
</template>
<script type="text/ecmascript-6">
export default {
    name: 's-md-toolbar-right',
    props: {
        // 工具栏
        s_subfield: {
            type: Boolean ,
            required: true
        },
        toolbars: { type: Object, required: true },
        s_preview_switch: { type: Boolean, required: true },
        s_fullScreen: { type: Boolean, required: true },
        s_html_code: { type: Boolean, required: true },
        s_navigation: { type: Boolean, required: true },
        d_words: {
            type: Object,
            required: true
        }
    },
    methods: {
        // 工具栏功能图标click-----------------
        $clicks(_type) {
            // 让父节点来绑定事件并
            this.$emit('toolbar_right_click', _type);
        }
    }
}
</script>
