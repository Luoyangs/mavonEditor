<template>
  <div class="shopee-anchor__wrapper">
    <div class="shopee-anchor">
      <div class="shopee-anchor__ink">
        <span class="shopee-anchor__ink-ball" :style="{top: `${inkTop}px`}"></span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { scrollTop, getScrollParent } from './util';
export default {
  name: 'ShopeeAnchor',
  props: {
    container: [String, HTMLElement],
    scrollOffset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      inkTop: 0,
      animating: false, // if is scrolling now
      currentLink: '', // current show link =>  #href -> currentLink = #href
      currentId: '', // current show title id =>  #href -> currentId = href
      titlesOffsets: [],
      wrapperTop: 0
    };
  },
  computed: {
    scrollContainer() {
      const container = this.container;
      return container ? (typeof container === 'string' ? document.querySelector(container) : container) : getScrollParent(this.$el);
    },
    scrollElement() {
      return this.container ? this.scrollContainer : (document.documentElement || document.body);
    },
    containerIsWindow() {
      return this.scrollContainer === window;
    },
    allAnchorLinks() {
      return this.getAnchorItems(this.$children);
    }
  },
  watch: {
    '$route'() {
      this.handleHashChange();
      this.$nextTick(() => {
        this.handleScrollTo();
      });
    },
    container() {
      this.init();
    },
    currentLink(newHref, oldHref) {
      this.$emit('change', newHref, oldHref);
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.removeListener();
  },
  methods: {
    getAnchorItems(children) {
      const items = [];
      if (children && children.length) {
        children.forEach(child => {
          if (child.$options.name === 'ShopeeAnchorItem') {
            items.push(child);
          }
          if (child.$children) {
            items.push(...this.getAnchorItems(child.$children));
          }
        });
      }

      return items;
    },
    handleScroll(e) {
      if (this.animating) {
        return;
      }
      this.updateTitleOffset();
      const scrollTop = document.documentElement.scrollTop ||
        document.body.scrollTop ||
        e.target.scrollTop;
      this.getCurrentScrollAtTitleId(scrollTop +  this.scrollOffset);
    },
    handleHashChange() {
      const url = window.location.href;
      const sharpLinkMatch = /#([^#]+)$/.exec(url);

      if (!sharpLinkMatch) {
        return;
      }
      this.currentLink = sharpLinkMatch[0];
      this.currentId = sharpLinkMatch[1];
    },
    handleScrollTo() {
      const anchor = document.getElementById(this.currentId);
      if (!anchor) {
        return;
      }

      const offsetTop = anchor.offsetTop - this.wrapperTop - this.scrollOffset;
      this.animating = true;
      scrollTop(this.scrollContainer, this.scrollElement.scrollTop, offsetTop, 600, () => {
        this.animating = false;
      });
      this.handleSetInkTop();
    },
    handleSetInkTop() {
      const currentLinkElementA = document.querySelector(`a[data-href="${this.currentLink}"]`);
      if (!currentLinkElementA) {
        return;
      }
      const elementATop = currentLinkElementA.offsetTop;
      const top = (elementATop < 0 ? this.offsetTop : elementATop);
      this.inkTop = top;
    },
    updateTitleOffset() {
      const links = this.allAnchorLinks.map(link => link.href);
      const idArr = links.map(link => link.split('#')[1]);
      let offsetArr = [];
      idArr.forEach(id => {
        const titleEle = document.getElementById(id);
        if (titleEle) {
          offsetArr.push({
            link: `#${id}`,
            offset: titleEle.offsetTop - this.scrollElement.offsetTop
          });
        }
      });

      this.titlesOffsets = offsetArr;
    },
    getCurrentScrollAtTitleId(scrollTop) {
      let i = -1;
      let len = this.titlesOffsets.length;
      let titleItem = {
        link: '#',
        offset: 0
      };
      while (++i < len) {
        let currentEle = this.titlesOffsets[i];
        let nextEle = this.titlesOffsets[i + 1];
        if (scrollTop >= currentEle.offset && scrollTop < ((nextEle && nextEle.offset) || Infinity)) {
          titleItem = this.titlesOffsets[i];
          break;
        }
      }
      this.currentLink = titleItem.link;
      this.handleSetInkTop();
    },
    removeListener() {
      this.scrollContainer.removeEventListener('scroll', this.handleScroll, false);
      window.removeEventListener('hashchange', this.handleHashChange, false);
    },
    init() {
      this.handleHashChange();
      this.$nextTick(() => {
        this.removeListener();
        this.wrapperTop = this.containerIsWindow ? 0 : this.scrollElement.offsetTop;
        this.handleScrollTo();
        this.handleSetInkTop();
        this.updateTitleOffset();

        this.scrollContainer.addEventListener('scroll', this.handleScroll, false);
        window.addEventListener('hashchange', this.handleHashChange, false);
      });
    }
  }
};
</script>
