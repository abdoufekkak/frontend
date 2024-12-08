<template>
  <div>
    <!-- Spinner de chargement -->
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner"></div>
      Chargement des données...
    </div>

    <!-- Affichage du graphique quand les données sont chargées -->
    <Pie :data="chartData" :options="chartOptions" v-if="!isLoading && !error" />

    <!-- Message d'erreur -->
    <div v-if="error" class="text-red-500 text-center mt-4">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { getCategorySales } from '@/api/analytics';

// Enregistrement des modules nécessaires de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default defineComponent({
  name: 'CategorySalesChart',
  components: {
    Pie,
  },
  setup() {
    const data = ref<any[]>([]);
    const chartData = ref<any>(null);
    const chartOptions = ref<any>({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    });
    const isLoading = ref(true); // État de chargement
    const error = ref<string | null>(null); // État d'erreur

    const fetchData = async () => {
      isLoading.value = true; // Début du chargement
      error.value = null; // Réinitialiser les erreurs
      try {
        const response = await getCategorySales();
        data.value = response.data;
        updateChartData();
      } catch (err) {
        error.value =
          'Erreur lors de la récupération des données: ' +
          (err instanceof Error ? err.message : 'Inconnue');
      } finally {
        isLoading.value = false; // Fin du chargement
      }
    };

    const updateChartData = () => {
      if (data.value.length === 0) return;

      const labels = data.value.map((item) => item.category);
      const totalSales = data.value.map((item) => item.totalSales);
      const backgroundColors = [
        '#007bff',
        '#28a745',
        '#ffc107',
        '#dc3545',
        '#6c757d',
      ];

      chartData.value = {
        labels: labels,
        datasets: [
          {
            label: 'Ventes par catégorie',
            data: totalSales,
            backgroundColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      };
    };

    onMounted(fetchData);

    return {
      chartData,
      chartOptions,
      isLoading,
      error,
    };
  },
});
</script>

<style scoped>
/* Styles spécifiques au graphique */
canvas {
  padding-top: 10px;
  max-width: 600px;
  margin: 0 auto;
}

/* Styles du spinner */
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px; /* Hauteur personnalisée pour le spinner */
  color: #007bff;
  font-size: 16px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.text-red-500 {
  color: #dc3545;
}
</style>
