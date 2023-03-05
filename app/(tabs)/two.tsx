import { Button, FlatList, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useState } from 'react';
import { ImagePickerAsset } from 'expo-image-picker';

export default function TabTwoScreen() {

  const [images, setImages] = useState<Array<ImagePickerAsset>>([]);

  const getImages = async () => {
    await ImagePicker.requestCameraPermissionsAsync();

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: true,
      quality: 1,
      exif: true
    });

    if (result.assets) {
      setImages((current) => {
        if (result.assets) {
          return [...current, ...result.assets];
        }

        return [...current];
      });
    }
  }


  return (
    <View style={styles.container}>
      <Button title='Select/Capture Images' onPress={getImages}/>
      <FlatList
        data={images}
        renderItem={(item) => <Item item={item.item} />}
        keyExtractor={item => item.uri}
      />
    </View>
  );
}

const Item = ({item}: {item: ImagePickerAsset}) => (
  <View>
    <Image source={{uri: item.uri}} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
