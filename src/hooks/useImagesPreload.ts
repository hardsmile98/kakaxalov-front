import { useEffect, useRef } from 'react'

const useImagesPreload = (paths: string[]) => {
  const imagesRef = useRef<string[]>(paths)

  useEffect(() => {
    if (imagesRef.current.length === 0) {
      return
    }

    imagesRef.current.forEach(path => {
      const img = new Image()
      img.src = path
    })
  }, [])
}

export default useImagesPreload
