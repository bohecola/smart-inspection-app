import ImageView from 'react-native-image-viewing'
import ImageViewHeader from './header'

export function ImagePreview(props: React.ComponentProps<typeof ImageView>) {
  return (
    props.visible
      ? (
          <ImageView
            {...props}
            HeaderComponent={({ imageIndex }) => (
              <ImageViewHeader
                totalCount={props.images?.length}
                imageIndex={imageIndex}
                onClosePress={props.onRequestClose}
              />
            )}
          />
        )
      : null
  )
}
