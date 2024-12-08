<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <Sidebar />
    <!-- Main content area -->
    <div class="main-content">
      <header class="header">
        <slot name="header"></slot>
      </header>
      <main class="content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from '../pages/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh; /* Assure que la hauteur de l'écran soit prise en compte */
}

.main-content {
  flex-grow: 1;
  margin-left: 250px; /* La largeur de la sidebar */
  padding: 20px;
  overflow-y: auto; /* Permet au contenu de défiler */
  height: 100vh; /* Utilisation de toute la hauteur de l'écran */
}

.header {
  background-color: #ffffff;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.content {
  flex-grow: 1;
  overflow-y: auto; /* Contenu qui défile */
}
</style>
