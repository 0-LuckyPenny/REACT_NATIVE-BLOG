import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { nanoid } from 'nanoid'
import { storage } from '../firebase/config'

export const uploadPhotoToServer = async (photo, folderName) => {
  const uniqueId = nanoid()
  //waiting photo
  const response = await fetch(photo)
  //create file blob-format
  const uploadedFile = await response.blob()
  //create link on file
  const storageRef = ref(storage, `${folderName}/${uniqueId}.jpg`)
  //upload file in storage
  await uploadBytes(storageRef, uploadedFile)
  // get the download URL
  const photoUrl = await getDownloadURL(
    ref(storage, `${folderName}/${uniqueId}.jpg`)
  )
  return photoUrl
}
