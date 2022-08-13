import { useEffect, useState } from 'react'

import { ImageItem, ImageItemProps } from '../ImageItem/ImageItem'
import { Modal } from '../Modal/Modal'
import styles from './ImagesList.module.scss'

const ImagesList = () => {
	const [images, setImages] = useState<ImageItemProps[] | null>(null)
	const [imgModalId, setImgModalId] = useState<number | null>(null)

	useEffect(() => {
		const fetchImagesInfo = async (): Promise<ImageItemProps[]> => {
			const res = await fetch('https://boiling-refuge-66454.herokuapp.com/images')
			return await res.json()
		}

		fetchImagesInfo().then((info) => setImages(info))
	}, [])

	const modalIsOpen = typeof imgModalId === 'number'

	return (
		<>
			<div className={styles.imagesList}>
				{images &&
					images.map((item) => (
						<ImageItem key={item.id} {...item} onClick={() => setImgModalId(item.id)} />
					))}
			</div>
			{modalIsOpen && <Modal onClose={() => setImgModalId(null)} imgId={imgModalId} />}
		</>
	)
}

export default ImagesList
