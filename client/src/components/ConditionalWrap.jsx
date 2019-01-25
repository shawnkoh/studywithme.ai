export default ({ condition, wrap, children }) => (condition ? wrap(children) : children);
// Consider wrapping children in <Fragment>