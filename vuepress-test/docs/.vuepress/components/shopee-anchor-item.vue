<template>
  <div :class="anchorItemClass">
    <a
      class="shopee-anchor__item__title"
      :href="href"
      :title="title"
      :data-href="href"
      @click.prevent="goAnchor">
      {{ title }}
    </a>
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'ShopeeAnchorItem',
  props: {
    href: String,
    title: String,
    errorIcon: String
  },
  computed: {
    anchorItemClass() {
      return {
        'shopee-anchor__item': true,
        'shopee-anchor__item--active': this.anchor.currentLink === this.href
      };
    },
    anchor() {
      let parent = this.$parent;
      while (parent && parent.$options.name !== 'ShopeeAnchor') {
        parent = parent.$parent;
      }

      return parent;
    },
    name() {
      return 'ShopeeAnchorItem';
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.anchor.init();
    });
  },
  methods: {
    goAnchor() {
      this.currentLink = this.href;
      this.anchor.handleHashChange();
      this.anchor.handleScrollTo();
      this.anchor.$emit('select', this.href);
      const isRoute = this.$router;
      if (isRoute) {
        this.$router.push(this.href, () => {});
      } else {
        window.location.href = this.href;
      }
    }
  }
};
</script>
