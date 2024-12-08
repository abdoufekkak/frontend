import axios from 'axios';

export const getTotalSales = (dateDebut:Date,dateFin:Date) =>
  axios.get(`http://localhost:5000/analytics/total_sales?startDate=${dateDebut}&endDate=${dateFin}`);

export const getTrendingProducts = () =>
  axios.get('/analytics/trending_products');

export const getCategorySales = () =>
  axios.get('http://localhost:5000/analytics/category_sales');
