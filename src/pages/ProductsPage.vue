<template>
  <DashboardLayout>
    <div class="dashboard">
      <div class="product-list" v-loading="isLoading" element-loading-text="Chargement...">
        <h2 class="text-xl font-bold mb-4">Liste des Produits</h2>
        <el-table :data="paginatedProducts" style="width: 100%">
          <el-table-column label="Nom du Produit" prop="ProductName" />
          <el-table-column label="Categorie" prop="Category" />
          <el-table-column label="Total Sales" prop="totalSales" />
        </el-table>

        <!-- Pagination -->
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalProducts"
          @current-change="handlePageChange"
          layout="prev, pager, next"
          class="mt-4"
        />
      </div>
    </div>
  </DashboardLayout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { getProducts } from '../api/products'; // Assurez-vous que cette fonction est correcte

export default defineComponent({
  name: 'ProductList',
  components: {
    DashboardLayout
  },
  setup() {
    const products = ref<any[]>([]);
    const currentPage = ref(1);
    const pageSize = ref(10); // Nombre de produits par page
    const isLoading = ref(false); // État de chargement

    const fetchProducts = async () => {
      isLoading.value = true; // Début du chargement
      try {
        const response = await getProducts(); // Récupération des produits depuis l'API
        products.value = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      } finally {
        isLoading.value = false; // Fin du chargement
      }
    };

    const handlePageChange = (page: number) => {
      currentPage.value = page;
    };

    const paginatedProducts = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize.value;
      return products.value.slice(startIndex, startIndex + pageSize.value);
    });

    const totalProducts = computed(() => {
      return products.value.length; // Le total des produits pour la pagination
    });

    onMounted(fetchProducts);

    return {
      products,
      currentPage,
      pageSize,
      isLoading,
      handlePageChange,
      paginatedProducts,
      totalProducts
    };
  }
});
</script>

<style scoped>
.product-list {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.el-table {
  width: 100%;
  border: 1px solid #ddd;
  border-collapse: collapse;
}

.el-table th {
  text-align: left;
  background-color: #f8f8f8;
}

.el-table td {
  text-align: left;
}

h2 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
