<template>
    <div class="trending-products">
      <h3>Produits les plus vendus</h3>
      <el-table
        v-if="products.length"
        :data="products"
        style="width: 100%"        
      >
        <!-- Colonne pour le nom du produit -->
        <el-table-column prop="name" label="Nom du produit" width="180" ></el-table-column>
        
        <!-- Colonne pour la quantité vendue -->
        <el-table-column prop="quantity" label="Quantité vendue" width="180"></el-table-column>
        
        <!-- Colonne pour le montant total -->
        <el-table-column prop="totalSales" label="Montant total des ventes (€)" ></el-table-column>
      </el-table>
  
      <!-- Message si aucune donnée n'est disponible -->
      <p v-else>Aucune donnée disponible pour le moment.</p>
  
      <!-- Message d'erreur -->
      <p v-if="error" class="error">{{ error }}</p>
  
      <!-- Bouton pour rafraîchir les données -->
      <div class="refresh-button">
        <el-button type="primary" @click="fetchTrendingProducts" :loading="loading">
          Actualiser
        </el-button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    data() {
      return {
        products: [] as Array<{ name: string; quantity: number; totalSales: number }>,
        loading: false,
        error: null as string | null,
      };
    },
    methods: {
      async fetchTrendingProducts() {
        this.loading = true;
        this.error = null;
  
        try {
          const response = await axios.get('http://localhost:5000/analytics/trending_products');
          this.products = response.data; // Assume que l'API retourne une clé `products`.
        } catch (err) {
          console.error(err);
          this.error = "Impossible de récupérer les produits les plus vendus.";
        } finally {
          this.loading = false;
        }
      },
    },
    mounted() {
      // Récupérer les données lors du montage du composant
      this.fetchTrendingProducts();
    },
  });
  </script>
  
  <style scoped>
  .trending-products {
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  h3 {
    font-size: 18px;
    margin-bottom: 16px;
  }
  
  .error {
    color: red;
    margin-top: 8px;
  }
  
  .refresh-button {
    margin-top: 16px;
    text-align: center;
  }
  </style>
  