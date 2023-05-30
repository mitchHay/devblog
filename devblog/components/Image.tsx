'use client';

import dynamic from "next/dynamic";

const NextImage = dynamic(() => import('next/image'));

export type ImageProps = {
  className?: string,
  src: string,
  alt: string,
  width?: number,
  height?: number,
  fill?: boolean
  priority?: boolean,
  placeholder?: 'blur' | 'empty',
  loading?: 'eager' | 'lazy',
  sizes?: string
};

export default function Image(props: ImageProps): React.ReactElement {
  return (
    <NextImage className={props.className}
               src={props.src}
               alt={props.alt}
               width={props.width}
               height={props.height}
               priority={props.priority}
               placeholder={props.placeholder}
               loading={props.loading}
               fill={props.fill}
               sizes={props.sizes ?? '100vw'} />
  )
}