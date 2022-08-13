import { FC, PropsWithChildren } from 'react'
import styles from './Button.module.scss'

export interface ButtonProps {
	iconPath?: string
	className?: string
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, iconPath, className }) => {
	return (
		<button className={styles.button + ' ' + className || ''}>
			{iconPath && <img alt='icon' src={iconPath} />}
			{children}
		</button>
	)
}

export default Button
