import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Articles from '../components/articles';
import {topHeadLinesURL} from '../constants';
import {Article} from '../interfaces/article';

export default function NewsPage(): React.JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchNews = async (url: string) => {
    try {
        const resp = await axios.get(`${url}`);
      const data = resp.data;
      setArticles(data.articles);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchNews(topHeadLinesURL);
  }, []);

  return (
    <View>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => `${item.publishedAt}-${index}`}
        renderItem={({item}) => <Articles {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
