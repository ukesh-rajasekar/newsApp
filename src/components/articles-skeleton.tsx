import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './articles';

export default function ArticlesSkeleton(): React.JSX.Element {
  const date = new Date();

  const readableDate = date.toLocaleDateString();
  const readableTime = date.toLocaleTimeString();

  return (
    <View style={styles.articleContainer}>
      <Image
        source={{
          uri: 'https://via.placeholder.com/350x150.png?text=Placeholder+Image',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Loading...</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{readableDate}</Text>
        <Text style={styles.time}>{readableTime}</Text>
      </View>
    </View>
  );
}
