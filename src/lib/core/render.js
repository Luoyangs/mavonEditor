export default {
  name: 'ShopeeRender',
  functional: true,
  props: {
    render: Function,
    as: {},
  },
  render: (h, ctx) => {
    if (ctx.props.as) {
      return ctx.props.as;
    }
    if (ctx.props.render) {
      return ctx.props.render(h);
    }
  }
};
