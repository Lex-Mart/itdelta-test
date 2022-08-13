import { CSSProperties, FC, FormEvent, useEffect, useState } from 'react'
import { Button } from '../ui'

import styles from './Modal.module.scss'

interface Commnet {
	id: number
	text: string
	date: number
}
interface ImgDetails {
	id: number
	url: string
	comments: Commnet[]
}

export interface ModalProps {
	imgId: number
	onClose?: () => void
}

export const Modal: FC<ModalProps> = ({ onClose, imgId }) => {
	const [comment, setComment] = useState('')
	const [imgInfo, setImgInfo] = useState<Omit<ImgDetails, 'comments'> | null>(null)
	const [comments, setComments] = useState<Commnet[]>([])

	const sendComment = (comment: string, id: number, name: string) => {
		return fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ name, comment }),
		})
	}

	const submitHandle = async (e: FormEvent) => {
		e.preventDefault()
		if (comment !== '') {
			await sendComment(comment, imgId, 'Ricardo')
			setComments([
				{ date: Date.now(), id: (comments.at(-1)?.id || 0) + 1, text: comment },
				...comments,
			])
			setComment('')
		}
	}

	useEffect(() => {
		const fetchImgDetails = async (id: number): Promise<ImgDetails> => {
			const res = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
			return await res.json()
		}

		fetchImgDetails(imgId).then((res) => {
			setImgInfo({ id: res.id, url: res.url })
			setComments(res.comments)
		})
	}, [imgId])

	const imgStyle: CSSProperties = {
		backgroundImage: `url('${imgInfo?.url}')`,
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
	}

	return (
		<div className={styles.modalWrapper} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.modalContent}>
					<div style={imgStyle} className={styles.image} onClick={onClose} />
					<div className={styles.commentBlock}>
						<form onSubmit={submitHandle} className={styles.form}>
							<div className={styles.field}>
								<label className={styles.label} htmlFor='comment'>
									Comment
								</label>
								<textarea
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									className={styles.comment}
									name='comment'
								></textarea>
								<span className={styles.description}>
									Write a few sentences about the photo.
								</span>
							</div>
							<Button className={styles.submit}>Save</Button>
						</form>
						{!!comments.length && (
							<div className={styles.comments}>
								{comments.map(({ id, date, text }) => (
									<div className={styles.commentItem}>
										<p className={styles.commentMeta}>
											<span className={styles.commentId}>#{id}</span>{' '}
											{new Date(date).toDateString()}
										</p>
										{text}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
