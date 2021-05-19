<script>
const ShopeeColCount = 15;
export default {
  name: 'ShopeeCol',

  props: {
    span: {
      type: Number,
      default: ShopeeColCount,
      validator(span = ShopeeColCount) {
        return /^[0-9]{1,2}$/.test(span + '') && parseInt(span,10) >= 1 && parseInt(span,10) <= ShopeeColCount;
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: {
      type: Number,
      validator(offset) {
        return /^[0-9]{1,2}$/.test(offset + '') && parseInt(offset,10) >= 0 && parseInt(offset,10) <= ShopeeColCount;
      }
    },
    pull: {
      type: Number,
      validator(pull) {
        return /^[0-9]{1,2}$/.test(pull + '') && parseInt(pull,10) >= 0 && parseInt(pull,10) <= ShopeeColCount;
      }
    },
    push: {
      type: Number,
      validator(push) {
        return /^[0-9]{1,2}$/.test(push + '') && parseInt(push,10) >= 0 && parseInt(push,10) <= ShopeeColCount;
      }
    }
  },

  computed: {
    gutter() {
      let parent = this.$parent;
      while (parent && parent.$options.name !== 'ShopeeRow') {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  render(h) {
    let classList = [];
    let style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span' ? `shopee-col-${prop}-${this[prop]}` : `shopee-col-${this[prop]}`
        );
      }
    });

    return h(this.tag, {
      class: ['shopee-col', classList],
      style
    }, this.$slots.default);
  }
};
</script>

<style lang="stylus">
$shopee-col-count = 15
[class*='shopee-col-']
  float: left
  box-sizing: border-box
  position relative
.shopee-col-0
  display: none
for $i in (0)..($shopee-col-count)
  .shopee-col-{$i}
    width: (1 / $shopee-col-count * $i * 100 * 1%)
  .shopee-col-offset-{$i}
    margin-left: (1 / $shopee-col-count * $i * 100 * 1%)
  .shopee-col-pull-{$i}
    position: relative
    right: (1 / $shopee-col-count * $i * 100 * 1%)
  .shopee-col-push-{$i}
    position: relative
    left: (1 / $shopee-col-count * $i * 100 * 1%)
</style>