import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Articles from '../components/articles';
import {API_KEY, baseURL, topHeadLinesURL} from '../constants';
import {Article} from '../interfaces/article';
import {debouncer} from '../utils/debouncer';
import ArticlesSkeleton from '../components/articles-skeleton';

type Status = 'loading' | 'success' | 'empty' | 'error';

export default function NewsPage(): React.JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);
  const [input, setInput] = useState<string>('');
  const [status, setStatus] = useState<Status>('empty');

  const fetchNews = async (url: string) => {
    try {
      setStatus('loading');
      const resp = await axios.get(`${url}`);
      const data = resp.data;
      setArticles(data.articles);
      setStatus(data.articles.length > 0 ? 'success' : 'empty');
    } catch (e) {
      console.log(e);
      setStatus('error');
    }
  };

  const callDebouncer = debouncer(fetchNews, 500);

  useEffect(() => {
    fetchNews(topHeadLinesURL);
  }, []);

  useEffect(() => {
    if (input === '') {
      return;
    }
    const searchQuery = `${baseURL}everything?q=${input}&sortBy=popularity&apiKey=${API_KEY}`;
    callDebouncer(searchQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const handleInputChange = (text: string) => {
    setInput(text);
  };

  const handleTopHeadlines = () => {
    setInput(''); //clearing input
    fetchNews(topHeadLinesURL);
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <ArticlesSkeleton />
            <ArticlesSkeleton />
            <ArticlesSkeleton />
          </>
        );
      case 'success':
        return (
          <FlatList
            data={articles}
            keyExtractor={(item, index) => `${item.publishedAt}-${index}`}
            renderItem={({item}) => <Articles {...item} />}
          />
        );
      case 'empty':
        return (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No data available.</Text>
            <Button
              title="Show me top headlines"
              onPress={handleTopHeadlines}
              color="#1e90ff"
            />
          </View>
        );
      case 'error':
        return (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>
              Something went wrong, try againt later!
            </Text>
            <Button
              title="Refresh"
              onPress={handleTopHeadlines}
              color="#1e90ff"
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={input}
        onChangeText={handleInputChange}
        placeholder="Search articles"
        style={styles.input}
      />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderRadius: 6,
    borderColor: '#3498db',
    borderWidth: 2,
    padding: 12,
    marginVertical: 20,
    height: 50,
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  },
});
