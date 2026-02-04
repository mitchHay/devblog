import './Card.scss';

type Props = {
  imgSrc: string,
  href?: string,
  title: string,
  layout?: 'horizontal' | 'vertical'
  imgSize?: { maxWidth: string, maxHeight: string }
  children?: React.ReactNode;
}

export const Card = ({ imgSrc, href, title, layout, imgSize, children }: Props): React.ReactNode => {
  return (
    <a className={`card card-${layout ?? 'vertical'}`} href={href}>
      <img src={imgSrc} 
          alt={`${title} card`}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 600px) 480px, 800px"
          style={{
            maxWidth: imgSize?.maxWidth ?? 'auto',
            maxHeight: imgSize?.maxHeight ?? 'auto'
          }} />
      <div className="card-content">
        <h4>{title}</h4>
        {children}
      </div>
    </a>
  );
}
