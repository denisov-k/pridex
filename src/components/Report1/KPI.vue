<template>
  <div class="kpi">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="titles">
      <span class="title">{{ title }}</span>
      <span class="subtitle">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "KPI",
  props: {
    title: [String, Number],
    subtitle: [String, Number]
  }
}
</script>

<style scoped>
  .kpi {
    display: flex;
    min-height: 2.5rem;
    padding: 0.5rem;
    margin: 0.5rem 0;
    background-color: #bebebe;
    border: 0.125rem solid #e3e3e3;
    border-radius: 1rem;
    color: #000000;
  }
  .icon {
    fill: white;
    /*background-color: #0000005e;*/
    aspect-ratio: 1 / 1;
    height: 100%;
    box-sizing: border-box;
    padding: 3px;
    display: flex;
    align-self: center;
  }
  .icon :deep(svg) {
    width: 100%;
    height: 100%;
  }
  .titles {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 0 0.5rem;
  }
  .title {
    font-size: 0.9rem;
    font-weight: 700;
    padding-bottom: 4px;
  }
  .subtitle {
    font-size: 0.75rem;
    /* white-space: nowrap; */
    text-align: left;
    padding-top: 4px;
  }
  .progress {
    height: 2rem;
    aspect-ratio: 1 / 1;
    background-color: #0000005e;
    box-sizing: border-box;
    margin-left: auto;
    align-self: center;
  }
  @media only screen and (max-width: 48em) {
    .icon {
      display: none;
    }
    .titles {
      margin: 0;
    }
  }
</style>