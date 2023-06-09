import React from 'react'
import Image, { StaticImageData } from 'next/image'

type AvatarProps = {
  imageUrl: string | StaticImageData
  size?: number
}

function Avatar({ imageUrl, size = 40 }: AvatarProps) {
  return (
    <div className={`inline-block w-${size / 10} h-${size / 10} rounded-full overflow-hidden`}>
      <Image src={imageUrl} alt="유저 아바타" width={size} height={size} />
    </div>
  )
}

export default Avatar
