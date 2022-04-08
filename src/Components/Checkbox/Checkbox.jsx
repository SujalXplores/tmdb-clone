import styles from './Checkbox.module.scss';

export const Checkbox = ({ value, checked, onChange, label, style }) => {
  return (
    <label className={styles['form-field']} style={style}>
      <input
        id='checkbox'
        className={`${styles['checkbox']} ${checked ? styles['checked'] : ''}`}
        type='checkbox'
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor='checkbox' className={styles['label']}>
        {label}
      </label>
    </label>
  );
};
