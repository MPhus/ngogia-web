// useContentTruncation.js
import { useState, useEffect, useMemo } from 'react'

/**
 * Custom Hook để xử lý việc cắt ngắn nội dung trên màn hình nhỏ.
 * @param {string} content - Chuỗi nội dung đầy đủ.
 * @param {number} breakPoint - Chiều rộng màn hình để bắt đầu cắt ngắn (mặc định 1200px).
 * @param {number} lineLimit - Số dòng tối đa được hiển thị khi cắt ngắn (mặc định 3).
 * @returns {{ contents: string[], isShowMoreButton: boolean, handleShowAllContent: () => void }}
 */
const useContentTruncation = (content, breakPoint = 1200, lineLimit = 3) => {
	const originContent = useMemo(() => content?.split('\n') || [], [content])
	const originContentLength = originContent.length

	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [contents, setContents] = useState(originContent)
	const [isShowMoreButton, setIsShowMoreButton] = useState(false)

	// Hàm hiển thị toàn bộ nội dung
	const handleShowAllContent = () => {
		setIsShowMoreButton(false)
		setContents(originContent)
	}

	// Logic cắt ngắn nội dung dựa trên chiều rộng màn hình
	useEffect(() => {
		if (windowWidth < breakPoint && originContentLength > lineLimit) {
			// Lấy 3 dòng đầu tiên
			const contentsTemp = originContent.filter((t, i) => i < lineLimit)
			setIsShowMoreButton(true)
			setContents(contentsTemp)
		} else {
			handleShowAllContent()
		}
	}, [windowWidth, originContent, originContentLength, breakPoint, lineLimit])

	// Logic lắng nghe sự kiện thay đổi kích thước màn hình
	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return { contents, isShowMoreButton, handleShowAllContent }
}

export default useContentTruncation