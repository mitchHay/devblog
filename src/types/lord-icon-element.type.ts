import 'react';

type LordIconTrigger =
  | 'hover'
  | 'click'
  | 'loop'
  | 'loop-on-hover'
  | 'morph'
  | 'morph-two-way'
  | 'in-viewport';

type LordIconProps = {
  src?: string;
  trigger?: LordIconTrigger;
  colors?: string;
  delay?: string | number;
  loading: 'lazy' | 'eager';
};

type LordIconElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & LordIconProps;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lord-icon': LordIconElement;
    }
  }
}