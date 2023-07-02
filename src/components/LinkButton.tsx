import dynamic from "next/dynamic";
import { ButtonProps, buildButtonClasses } from "./Button";

import styles from '../styles/components/Button.module.scss';

const Link = dynamic(() => import('next/link'));

export type LinkButtonProps = {
  href: string,
  target?: '_self' | '_blank' | '_parent' | '_top'
} & ButtonProps;

export default function LinkButton({text, href, style, className, target}: LinkButtonProps): React.ReactElement {
  const classNames = buildButtonClasses(styles, style, className);

  return (
    <Link className={classNames.join(' ')}
          href={href}
          target={target ?? '_self'}>
      {text}
    </Link>
  );
}

// const LinkButton = block(LinkButtonFn);

// export {
//   LinkButton
// };