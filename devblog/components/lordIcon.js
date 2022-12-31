import lottie from 'lottie-web';
import { useEffect } from 'react';

export default function LordIcon({
  colors,
  src,
  width,
  height,
  trigger,
  delay,
}) {
  useEffect(() => { 
    import('lord-icon-element').then(mod => {
      mod.defineElement(lottie.loadAnimation);
    });
  }, []);

  return (
    <lord-icon
      colors={`primary:${colors?.primary},secondary:${colors?.secondary}`}
      src={src}
      trigger={trigger}
      delay={delay}
      style={{
        width: width,
        height: height,
      }}
    />
  )
}