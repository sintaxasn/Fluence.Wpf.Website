import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

function addIdentifierBreaks(children) {
  if (typeof children !== 'string') {
    return children;
  }

  const parts = children.split(
    /(?<=[a-z0-9])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|(?<=\.)(?=[A-Za-z])/g,
  );
  return parts.flatMap((part, index) =>
    index === 0 ? [part] : [<wbr key={`identifier-break-${index}`} />, part],
  );
}

export default {
  ...MDXComponents,
  h1: (props) => <MDXComponents.h1 {...props}>{addIdentifierBreaks(props.children)}</MDXComponents.h1>,
  WpfCodeTabs: Tabs,
  WpfCodeTab: TabItem,
};
