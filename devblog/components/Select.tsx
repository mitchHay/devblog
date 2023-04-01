import styles from '../styles/components/Select.module.scss';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const FontAwesomeIcon = dynamic(() => import('@fortawesome/react-fontawesome').then(mod => mod.FontAwesomeIcon));

type SelectProps = {
  id: string,
  className?: string,
  value?: string,
  placeholder?: string,
  options: string[],
  label?: string
};

export default function Select(props: SelectProps): any {
  let [value, setValue] = useState(props.value);

  function selectOption(e: any): void {
    const option = e.target as HTMLOptionElement;
    setValue(option.value);
  }

  function openOptions(): void {
    if (typeof window === 'undefined') {
        return;
    }

    const optionsContainer = document.getElementById(props.id);
    if (!optionsContainer) {
      return;
    }

    const activeClass = styles.optionsActive;
    const closeOptions = (e: any) => {
      const target = e.target as HTMLElement;
      if (target.parentElement!.className.includes('select')) {
        return;
      }
      
      optionsContainer.classList.remove(activeClass);
      window.removeEventListener('click', closeOptions);
    };

    if (optionsContainer.classList.contains(activeClass)) {
      optionsContainer.classList.remove(activeClass);
      window.removeEventListener('click', closeOptions);
    } else {
      optionsContainer.classList.add(activeClass);
      window.addEventListener('click', closeOptions);
    }
  }

  return (
    <div className={`${styles.select} ${props.className}`}>
      {
        <>
          {
            !!props.label &&
            <label>{ props.label }</label>
          }
          <div className={styles.selectValue} onClick={openOptions}>
            <input
              className={styles.selectInput}
              placeholder={props.placeholder}
              onMouseDown={(e) => e.preventDefault()}
              value={value}/>

            <FontAwesomeIcon className={styles.selectIcon} icon={faAngleDown}/>
          </div>
        </>
      }
      <div 
        id={props.id}
        className={styles.optionsContainer}>
        {
          !!props.options &&
          props.options.map(option => {
            return (
              <option tabIndex={0} onClick={selectOption}>{ option }</option>
            )
          })
        }
      </div>
    </div>
  )
}