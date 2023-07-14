import './ThemeSwitch.scss';

export const THEME_STORAGE_KEY = 'site-theme';

export default function ThemeSwitch(): React.ReactElement {
  const onChange = () => {
    let theme: string;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDarkScheme.matches) {
      document.body.classList.toggle('theme-light');
      theme = document.body.classList.contains('theme-light')
        ? 'light'
        : 'dark';
    } else {
      document.body.classList.toggle('theme-dark');
      theme = document.body.classList.contains('theme-dark')
        ? 'dark'
        : 'light';
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  };

  return (
    <label className="switch">
      <input 
        type="checkbox"
        onChange={onChange}
      />
      <span className='slider' />
    </label>
  );
}
