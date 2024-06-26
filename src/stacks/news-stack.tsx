import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsPage from '../screens/news-page';
import ArticleDetailPage from '../components/article-detail-page';
import { Article } from '../interfaces/article';


type RootStackParamList = {
  ArticleList: undefined;
  ArticleDetail: {article: Article};
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function NewsStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={NewsPage} />
        <Stack.Screen
          name="ArticleDetailPage"
          component={ArticleDetailPage}
          options={({route}) => ({title: route.params.article.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
