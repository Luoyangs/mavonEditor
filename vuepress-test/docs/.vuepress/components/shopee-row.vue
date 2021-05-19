<script>
export default {
  name: 'ShopeeRow',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    gutter: {
      type: Number,
      default: 16
    },
    type: String,
    justify: {
      type: String,
      default: 'start',
      validator(justify = 'start') {
        return ['start','end','center','space-around','space-between'].indexOf(justify) >= 0;
      }
    },
    align: {
      type: String,
      default: 'top',
      validator(align = 'top') {
        return ['top','middle','bottom'].indexOf(align) >= 0;
      }
    }
  },

  computed: {
    style() {
      const ret = {};

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    }
  },

  render(h) {
    return h(this.tag, {
      class: [
        'shopee-row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        this.align !== 'top' ? `is-align-${this.align}` : '',
        this.type === 'flex' ? 'shopee-row__flex' : ''
      ],
      style: this.style
    }, this.$slots.default);
  }
};
</script>

<style lang="stylus">
.shopee-row
  position: relative
  box-sizing: border-box
  &::before,
  &::after
    display: table
    content: ''
  &::after
    clear: both
  &__flex
    display: flex
    &::before,
    &::after
      display: none
    &.is-justify-center
      justify-content: center
    &.is-justify-end
      justify-content: flex-end
    &.is-justify-space-between
      justify-content: space-between
    &.is-justify-space-around
      justify-content: space-around
    &.is-align-middle
      align-items: center
    &.is-align-bottom
      align-items: flex-end
</style>