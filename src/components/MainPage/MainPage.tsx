import { Header } from '../Header/Header'
import ImagesList from '../ImagesList/ImagesList'

import styles from './MainPage.module.scss'

export const MainPage = () => {
	return (
		<div className={styles.mainPage}>
			<Header />
			<ImagesList />
		</div>
	)
}
