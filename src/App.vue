<script setup lang="ts">
import ComontentHome from './views/home.vue'
</script>

<template>
  <header>
    <h1>在线考试项目</h1>
  </header>
  <section>
    <aside></aside>
    <main>
      <ComontentHome></ComontentHome>
    </main>
  </section>
  <footer>@2023-04-26 22:37:34</footer>
</template>

<style scoped>
header {
  height: 60px;
  text-align: center;
  color: #fff;
  background-color: #000;
}
h1 {
  margin-top: 0;
  margin-bottom: 0;
}
section {
  display: flex;
  height: calc(100vh - 81px);
}
aside {
  width: 200px;
  height: calc(100vh - 80px);
  border-right: 1px solid #404040;
}
main {
  padding: 20px;
}
footer {
  height: 20px;
  text-align: center;
  font-size: 14px;
  color: #808080;
  border-top: 1px solid #404040;
}
</style>
