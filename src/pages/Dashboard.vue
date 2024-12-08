<template>
  <DashboardLayout>
    <div class="dashboard">

      <!-- Statistiques -->
      <div class="statistics">
        <StatisticsCard title="Produits les plus vendus" />
      </div>
      <div class="statistics">
        <TrendingProducts/>
            </div>
            <div class="charts">
              <Categorysales/>
            </div>

    
    </div>
    
  </DashboardLayout>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { getTrendingProducts, getCategorySales } from '../api/analytics';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import StatisticsCard from '../components/StatisticsCard.vue';
import TrendingProducts from '../components/TrendingProducts.vue';
import  Categorysales from "../components/Categorysales.vue"

export default {
  components: { DashboardLayout, StatisticsCard ,TrendingProducts,Categorysales},
  setup() {
    const totalSales = ref(0);
    const trendingProducts = ref([]);
    const categories = ref([]);
    const salesByCategory = ref([]);
    const products = ref([]);

    const fetchData = async () => {
      trendingProducts.value = (await getTrendingProducts()).data;
      const categoryData = await getCategorySales();
      categories.value = categoryData.data.categories;
      salesByCategory.value = categoryData.data.sales;
    };

    onMounted(fetchData);

    return { totalSales, trendingProducts, categories, salesByCategory, products, fetchData };
  },
};
</script>
