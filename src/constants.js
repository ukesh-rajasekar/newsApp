//TODO: put these in a .env file

const API_KEY = '183daca270264bad86fc5b72972fb82a';

const baseURL = 'https://newsapi.org/v2/';

const topHeadLinesURL = `${baseURL}top-headlines?country=us&apiKey=${API_KEY}`;

export {baseURL, API_KEY, topHeadLinesURL};
