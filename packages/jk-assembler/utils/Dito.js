/**
 * 提供一个render组件
 */
export default {
  functional: true,
  props: {
    render: Function,

    scope: {
      value: String,
      record: Object,
      index: Number,
      rows: Array
    }
  },
  render(h, ctx) {
    return ctx.props.render(h, {
      value: ctx.props.scope.value,
      record: ctx.props.scope.record,
      index: ctx.props.scope.index,
      rows: ctx.props.scope.rows
    });
  }
};
