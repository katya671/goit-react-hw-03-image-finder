import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38669153-aad68b418baba45903fc5ebec';

export const getImages = async (query, page) => {
  const params = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const { data } = await axios.get(BASE_URL + params);
  return data;
};
