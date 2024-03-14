<template>
 <div>
    <Filter :filters="filters" @change="onChange"></Filter>
    <span v-for="item in currentConditions" :key="item.id">{{ mappingConditionDisplay(item) }}</span>
 </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue' 
import Filter from './components/Filter.vue'

const filters = {
  name: { label: '名称', type: 'input', value: '' },
  age: { label: '年龄', type: 'singleSelect', value: ['男', '女'] },
  ageRange: { label: '年龄范围', type: 'multipleSelect', value: ['1-10', '10-20'] }
}

const currentConditions = reactive([])

function onChange(conditions: any) {
  console.log('>>>>', conditions);
  currentConditions.push(...conditions)
}

function mappingConditionDisplay(condition: Record<string, string>) {
  const label = filters[condition.filter]
  return `${label}:${condition.operator}${condition.value}`
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
