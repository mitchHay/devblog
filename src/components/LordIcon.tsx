import { useEffect } from 'react';
import { InViewportTrigger } from '../triggers/in-viewport.trigger';

export type LordIconTrigger =
  | 'hover'
  | 'click'
  | 'loop'
  | 'loop-on-hover'
  | 'morph'
  | 'morph-two-way'
  | 'in-viewport';

export type LordIconColors = {
  primary?: string;
  secondary?: string;
};

export type LordIconProps = {
  src?: string;
  trigger?: LordIconTrigger;
  colors?: LordIconColors;
  delay?: string | number;
  size?: number;
  width?: number,
  height?: number,
  loading?: 'lazy' | 'eager'
};

export default function LordIcon(props: LordIconProps) {
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
      colors={`primary:${props.colors?.primary},secondary:${props.colors?.secondary}`}
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