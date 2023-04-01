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
  label?: string,
  onSelect?: Function
};

export default function Select(props: SelectProps): any {
  const activeClass = styles.active;
  let [value, setValue] = useState(props.value);

  function selectOption(e: any): void {
    const option = e.target as HTMLOptionElement;
    setValue(option.value);
  }

  function toggleOptions(optionsContainer: HTMLElement, selectIcon: HTMLElement, mode: 'open' | 'close'): void {
    const closeOptions = (e: any) => {
      const target = e.target as HTMLElement;
      if (target.parentElement!.className.includes('select')) {
        return;
      }
      
      optionsContainer.classList.remove(activeClass);
      selectIcon.classList.remove(activeClass);
      window.removeEventListener('click', closeOptions);
    };

    switch (mode) {
      case 'open':
        optionsContainer.classList.add(activeClass);
        selectIcon.classList.add(activeClass);
        window.addEventListener('click', closeOptions);
        break;
      case 'close':
        optionsContainer.classList.remove(activeClass);
        selectIcon.classList.remove(activeClass);
        window.removeEventListener('click', closeOptions);
        break;
    }
  }

  function openOptions(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const selectIcon = document.getElementById('select-icon');
    const optionsContainer = document.getElementById(props.id);
    if (!optionsContainer || !selectIcon) {
      return;
    }

    if (optionsContainer.classList.contains(activeClass)) {
      toggleOptions(optionsContainer, selectIcon, 'close');
    } else {
      toggleOptions(optionsContainer, selectIcon, 'open');
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

          <div 
            className={styles.selectValue} 
            onClick={openOptions}
            onTouchStart={openOptions}>

            <input
              type='search'
              className={styles.selectInput}
              placeholder={props.placeholder}
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
              value={value}/>

            <FontAwesomeIcon 
              className={styles.selectIcon}
              id='select-icon'
              icon={faAngleDown}/>
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
              <option 
                tabIndex={0} 
                onClick={(e) => {
                  if (!!props.onSelect) {
                    props.onSelect();
                  }

                  selectOption(e);
                }}>
                  { option }
              </option>
            )
          })
        }
      </div>
    </div>
  )
}