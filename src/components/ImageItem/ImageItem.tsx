import { CSSProperties, FC } from 'react'

import styles from './ImageItem.module.scss'

export interface ImageItemProps {
	id: number
	url: string
	onClick: () => void
}

export const ImageItem: FC<ImageItemProps> = ({ url, id, onClick }) => {
	const style: CSSProperties = {
		background: `center center url('${url}') no-repeat`,
		backgroundSize: 'cover',
	}

	return (
		<div className={styles.imageItem}>
			<div style={style} className={styles.image} onClick={onClick} />
			<span className={styles.details}>id: {id}</span>
		</div>
	)
}
