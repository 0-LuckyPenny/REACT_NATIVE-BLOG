import * as ImagePicker from 'expo-image-picker'

export const handleImagePicker = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  })

  if (!result.canceled) return result.assets[0].uri
}
