import { loadAnimation } from 'lottie-web';
import { useEffect } from 'react';

export default function LordIcon({
  colors,
  src,
  width,
  height,
  trigger,
  delay
}) {
  const srcUrl = `https://cdn.lordicon.com/${src}`;

  useEffect(() => { 
    import('lord-icon-element').then(mod => {
      mod.defineElement(loadAnimation);
    });
  }, []);

  return (
    <lord-icon
      colors={`primary:${colors?.primary},secondary:${colors?.secondary}`}
      src={srcUrl}
      trigger={trigger}
      delay={delay}
      style={{
        width: width,
        height: height,
      }}
    />
  )
}