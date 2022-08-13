import { Button } from '../ui'
import styles from './Header.module.scss'

import MailIcon from '../../assets/images/mail.svg'
import PhoneIcon from '../../assets/images/phone.svg'

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.content}>
				<div className={styles.avatar} />
				<div className={styles.info}>
					<p className={styles.username}>Ricardo Cooper</p>
					<div className={styles.actions}>
						<Button iconPath={MailIcon}>Message</Button>
						<Button iconPath={PhoneIcon}>Call</Button>
					</div>
				</div>
			</div>
		</header>
	)
}
