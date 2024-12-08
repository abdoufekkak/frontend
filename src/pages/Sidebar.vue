<template>
  <el-row class="tac">
    <el-col :span="6">
      <h5 class="mb-2">Default colors</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true"  
      >
        <el-menu-item index="2" route="/">
          <el-icon><icon-menu /></el-icon>
          <span>Statistiques</span>
        </el-menu-item>

        <el-menu-item index="4" route="/product">
          <el-icon><setting /></el-icon>
          <span>Produits</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
  
  <script lang="ts" setup>
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue';
  
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  </script>
  
  <style scoped>
  .el-menu-vertical-demo {
    width: 250px;
    height: 100vh;
    position: fixed; /* Fixe la sidebar à gauche */
    top: 0;
    left: 0;
    background-color: #2c3e50;
    color: white;
    z-index: 1000; /* Assurez-vous que la sidebar soit au-dessus du contenu */
  }
  
  .el-menu-item,
  .el-sub-menu {
    padding: 10px;
  }
  
  .el-menu-item:hover {
    background-color: #34495e;
  }
  
  .el-sub-menu .el-menu-item {
    padding-left: 30px;
  }
  
  .el-menu-item-group .el-menu-item {
    padding-left: 20px;
  }
  </style>
  