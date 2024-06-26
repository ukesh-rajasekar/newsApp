import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsPage from '../screens/news-page';
import ArticleDetailPage from '../components/article-detail-page';

const Stack = createNativeStackNavigator();

export default function NewsStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={NewsPage} />
        <Stack.Screen name="ArticleDetailPage" component={ArticleDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
