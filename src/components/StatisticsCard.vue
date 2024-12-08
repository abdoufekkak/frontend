<template>
  <div class="statistics-card">
    <div class="date-selection">
      <el-date-picker
        v-model="selectedPeriod"
        type="daterange"
        range-separator="à"
        start-placeholder="Date de début"
        end-placeholder="Date de fin"
        @change="fetchTotalSales"
        format="YYYY-MM-DD"
        unlink-panels
      />
    </div>
    <h3>{{ title }}</h3>
    <p v-if="loading">Chargement...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>{{ totalSales ? `${totalSales} €` : 'Pas de données' }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'; // Importez axios si ce n'est pas déjà fait
import { getTotalSales } from '../api/analytics'; // Assurez-vous que le chemin est correct

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedPeriod: [] as string[], // Tableau contenant [startDate, endDate]
      totalSales: null as number | null,
      loading: false,
      error: null as string | null,
    };
  },
  methods: {
    async fetchTotalSales() {
      if (this.selectedPeriod.length !== 2) return;

      const [dateDebut, dateFin] = this.selectedPeriod;
      this.loading = true;
      this.error = null;

      try {
        const response = await getTotalSales(new Date(dateDebut), new Date(dateFin));
        this.totalSales = response.data.totalSalesAmount;
      } catch (err) {
        this.error = "Erreur lors de la récupération des données.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
.statistics-card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  background-color: #f9f9f9;
}

.date-selection {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

p {
  font-size: 24px;
  font-weight: bold;
}
</style>
