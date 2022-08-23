import styles from './Header.module.css'
import todoLogo from '../assets/Logo-TODO.svg'


export const Header = () => {
  return (
    <header className={styles.header}>
        <img src={todoLogo} />
    </header>
  )
}
