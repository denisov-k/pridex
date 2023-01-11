<script setup>
import { ref, reactive, computed } from 'vue'
import Report from "@/views/Report.vue";

let reportsCount = ref(1);
const onAddReportClick = () => {
  if (reportsCount.value < 5)
    reportsCount.value++;
}
const onRemoveReportClick = () => {
  if (reportsCount.value > 1)
    reportsCount.value--;
}

</script>

<template>
  <main>
    <div id="reports">
      <Report v-for="n in reportsCount" />
    </div>
    <div id="inputs">
      <input type="button" value="Добавить объект" v-on:click="onAddReportClick">
      <input type="button" value="Убрать объект" v-on:click="onRemoveReportClick">
    </div>
  </main>
</template>

<style src="flexboxgrid/dist/flexboxgrid.min.css"></style>

<style scoped>
  main {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #report::-webkit-scrollbar {
     width: 5px;
     height: 5px;
   }

  #report::-webkit-scrollbar-track {
     background-color: black;
     border-radius: 25px;
   }

  #report::-webkit-scrollbar-thumb {
     background: #4e4e4e;
     border-radius: 25px;
   }
  #reports {
    display: flex;
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
  }
  #inputs {
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input {
    margin: 0 5px;
    border-radius: 5px;
    border-color: white;
    background-color: #bebebe;
    border-width: 1px;
    /* border-style: unset; */
    border-style: solid;
    padding: 3px 10px;
  }
</style>
