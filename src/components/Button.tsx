import { block } from "million/react";
import { ButtonType } from "../models/button-type";

import styles from "../styles/components/Button.module.scss";

export type Icon = {
  name: string,
  position?: 'left' | 'right'
}

export type ButtonProps = {
  text?: string,
  className?: string,
  onClick?: Function,
  style?: ButtonType,
  type?: 'button' | 'submit'
}

export function buildButtonClasses(styles: any, style?: ButtonType, className?: string): string[] {
  const classNames = [ styles.btn ];
  if (!!className) {
    classNames.push(className);
  }

  switch (style) {
    case 'secondary':
      classNames.push(styles.secondary);
      break;
  }

  return classNames;
}

function ButtonFn({className, text, onClick, type, style}: ButtonProps): React.ReactElement {
  const classNames = buildButtonClasses(styles, style, className);

  const clickFn = () => {
    if (!onClick) {
      return;
    }

    onClick();
  };

  return (
    <button className={classNames.join(' ')}
            onClick={clickFn}
            type={type}>
      {text}
    </button>
  );
}

const Button = block(ButtonFn);

export {
  Button
};