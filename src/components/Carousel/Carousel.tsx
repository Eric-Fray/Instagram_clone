import {View, Image, FlatList, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import colors from '../../theme/colors';

interface ICarousel {
  images: string[];
}

const Carousel = ({images}: ICarousel) => {
  const {width} = useWindowDimensions();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={{width, aspectRatio: 1}} />
        )}
        horizontal
        pagingEnabled
      />
      <View style={{flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 0, width: '100%'}}>
        {images.map((_, index) => (<View key={index} style={{width: 10, aspectRatio: 1, borderRadius: 5, backgroundColor: activeImageIndex === index ? colors.primary : 'white'}}/>))}
      </View>
    </View>
  );
};

export default Carousel;
