'use client';

import { useEffect } from "react";

export type SlashInputProps = {
  placeholder?: string,
  className?: string,
  id: string
}

export default function SlashInput(props: SlashInputProps): React.ReactElement {
  useEffect(() => {
    if (typeof(window) !== 'undefined') {
      const searchInput = document.getElementById(props.id);
  
      document.addEventListener('keydown', (keypress) => {
        switch (keypress.key) {
          case '/':
            keypress.preventDefault();
            searchInput?.focus({
              preventScroll: false
            });
  
            break;
          case 'Escape':
            keypress.preventDefault();
            searchInput?.blur();
  
            break;
        }
      });
    }
  });

  return (
    <input 
      className={props.className} 
      id={props.id} 
      placeholder={props.placeholder} />
  )
}