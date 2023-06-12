import { useEffect } from 'react';
import { InViewportTrigger } from '../triggers/in-viewport.trigger';
import { block } from 'million/react';

export type LordIconTrigger =
  | 'hover'
  | 'click'
  | 'loop'
  | 'loop-on-hover'
  | 'morph'
  | 'morph-two-way'
  | 'in-viewport';

export type LordIconProps = {
  src?: string;
  trigger?: LordIconTrigger;
  primaryColor?: string;
  secondaryColor?: string;
  delay?: string | number;
  size?: number;
  width?: number,
  height?: number,
  loading?: 'lazy' | 'eager'
};

function LordIconFn(props: LordIconProps) {
  const srcUrl = `https://cdn.lordicon.com/${props.src}`;

  useEffect(() => {
    import('lottie-web').then(lottie => {
      import('lord-icon-element/element').then(mod => {
        mod.Element.defineTrigger('in-viewport', (InViewportTrigger as any));
  
        import('lord-icon-element').then(mod => {
          mod.defineElement(lottie.loadAnimation);
        });
      });
    });
  });

  return (
    <lord-icon
      colors={`primary:${props.primaryColor},secondary:${props.secondaryColor}`}
      src={srcUrl}
      trigger={props.trigger ?? 'loop'}
      delay={props.delay}
      style={{
        width: props.width,
        height: props.height,
      }}
      loading={props.loading ?? 'lazy'}
    />
  )
}

const LordIcon = block(LordIconFn);
export default LordIcon;
