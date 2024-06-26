import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Article} from '../interfaces/article';

interface ArticleDetailProps {
  route: RouteProp<{params: {article: Article}}, 'params'>;
}

const ArticleDetailPage: React.FC<ArticleDetailProps> = ({route}) => {
  console.log(route, 'route here');
  const {article} = route.params;

  const handlePress = () => {
    Linking.openURL(article.url);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: article.urlToImage}}
        alt={article.title}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.source}>{article.source.name}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>By {article.author}</Text>
        <Text style={styles.description}>{article.description}</Text>
        <Text style={styles.date}>
          {new Date(article.publishedAt).toLocaleDateString()}
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.link}>Read full article</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  content: {
    padding: 16,
  },
  source: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 32,
  },
  author: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
});

export default ArticleDetailPage;
