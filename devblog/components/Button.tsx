'use client';

export type ButtonProps = {
  text: string,
  style: 'primary' | 'secondary' | 'ghost',
  onClick?: Function
}

export default function Button(props: ButtonProps) : React.ReactElement {
  const onClick: Function = props.onClick ?? new Function();

  return (
    <button className={`btn ${props.style}`} onClick={() => onClick()}>{ props.text }</button>
  )
}