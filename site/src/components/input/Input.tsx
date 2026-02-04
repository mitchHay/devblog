import { useMemo, type HTMLAttributes } from 'react';

import './Input.scss';

type Props = {
  placeholder: string;
  label: string;
  image?: {
    src: ImageMetadata;
    id: string;
    altText: string;
  };
} & HTMLAttributes<HTMLInputElement>;

export const Input = ({ id, placeholder, image, label, className, onChange }: Props): React.ReactNode => {
  const classes = useMemo(() => {
    const cNs = ["input"];
    if (className) {
      cNs.push(className);
    }

    return cNs;
  }, [className]);

  return (
    <div className={classes.join(" ")}>
      {
        !!image && <img 
          id={image.id}
          src={image.src.src}
          height={14}
          width={14}
          alt={image.altText}
          loading='lazy'
          decoding='async' />
      }
      <input 
        id={id} 
        aria-label={label}
        placeholder={placeholder}
        onChange={onChange} />
    </div>
  )
}
