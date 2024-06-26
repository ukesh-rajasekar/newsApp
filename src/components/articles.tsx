import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Article} from '../interfaces/article';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export default function Articles(props: Article): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<any>>();

  const {publishedAt, urlToImage, title} = props;

  const date = new Date(publishedAt);

  const readableDate = date.toLocaleDateString();
  const readableTime = date.toLocaleTimeString();

  return (
    <TouchableOpacity
      style={styles.articleContainer}
      onPress={() =>
        navigation.navigate('ArticleDetailPage', {
          article: {...props},
        })
      }>
      <Image
        source={{
          uri:
            urlToImage ||
            'https://dims.apnews.com/dims4/default/70aa031/2147483647/strip/true/crop/3460x1946+0+231/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F16%2Fc0%2F5662cee3be981f6c09dbd5677164%2F65e423f9385a437285ee61cef020fecd',
        }}
        style={styles.image}
        alt={title}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{readableDate}</Text>
        <Text style={styles.time}>{readableTime}</Text>
      </View>
    </TouchableOpacity>
  );
}

const {width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  articleContainer: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: width * 0.5,
    borderRadius: 6,
    marginBottom: 12,
    marginTop: 2,
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  time: {
    fontSize: 14,
    color: '#888',
  },
});
