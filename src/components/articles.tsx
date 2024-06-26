import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Article } from '../interfaces/article';

export default function Articles(props: Article): React.JSX.Element {
  const {publishedAt, urlToImage, title, urlLink} = props;

  return (
    <TouchableOpacity onPress={() => console.log('clicked')}>
      <Image
        source={{
          uri:
            urlToImage ||
            'https://dims.apnews.com/dims4/default/70aa031/2147483647/strip/true/crop/3460x1946+0+231/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F16%2Fc0%2F5662cee3be981f6c09dbd5677164%2F65e423f9385a437285ee61cef020fecd',
        }}
        alt={title}
      />
      <Text>{title}</Text>
      <Text>{publishedAt}</Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({});
