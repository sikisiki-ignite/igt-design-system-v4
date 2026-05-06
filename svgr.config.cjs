/** @type {import('@svgr/core').Config} */
module.exports = {
  typescript: true,
  ref: false,
  memo: false,
  titleProp: false,
  svgProps: {
    'aria-hidden': 'true',
    focusable: 'false',
  },
  replaceAttrValues: {
    '#000': 'currentColor',
    '#000000': 'currentColor',
    black: 'currentColor',
  },
  template: (variables, { tpl }) => {
    return tpl`
import type { SVGProps } from 'react';
${'\n'}
export function ${variables.componentName}(props: SVGProps<SVGSVGElement>) {
  return (
    ${variables.jsx}
  );
}
`;
  },
};
