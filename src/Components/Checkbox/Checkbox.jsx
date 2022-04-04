import styles from './Checkbox.module.scss';

export const Checkbox = ({ value, children, isChecked }) => {
  return (
    <label className={styles['form-field']}>
      <input
        id='checkbox'
        className={`${styles['checkbox']} ${isChecked ? styles['checked'] : ''}`}
        type='checkbox'
        value={value}
        checked={isChecked}
      />
      <label for='checkbox' className={styles['label']}>
        {children}
      </label>
    </label>
  );
};
