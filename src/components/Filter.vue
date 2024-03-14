<template>
    <a-button type="primary" @click="handleClick">自定义筛选器</a-button>
    <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>筛选器</template>
    <div>
        <div class="condition" v-for="(condition, index) in conditions" :key="condition.id">
            <div>
                <a-select :style="{width:'100px', marginRight: '5px'}" v-model="condition.filter" placeholder="请选择">
                    <a-option v-for="item in filterOptions" :key="item.value" :value="item.value" :label="item.label"></a-option>
                </a-select>
                <a-select :style="{width:'100px', marginRight: '5px'}" v-model="condition.operator" placeholder="请选择">
                    <a-option v-for="item in mappingOperator(condition.filter)" :key="item" :value="item" :label="item"></a-option>
                </a-select>
                <component v-model="condition.value" :is="mappingInput(condition.filter).type" :style="{width:'200px'}" v-bind="mappingInput(condition.filter).attrs">
                    <a-option v-for="item in mappingInput(condition.filter).options" :key="item" :value="item" :label="item"></a-option>
                </component>
            </div>
            <icon-plus v-if="index === 0" class="icon" @click="addConditions"/>
            <icon-close v-else class="icon" @click="deleteConditions(condition.id)"/>
        </div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useConditions } from './hooks'
import { Input } from '@arco-design/web-vue';

let id = 0
const props = defineProps<{ filters: Record<string, { type: string, value: string | string[], label: string }> }>()
const emit = defineEmits(['change'])

const visible = ref(false)
const filterOptions = computed(() => Object.keys(props?.filters).map((key) => ({ value: key, label: props.filters[key].label})))
const { conditions, addConditions, deleteConditions } = useConditions()

onMounted(() => {
    addConditions()
})

function mappingOperator(filter: string): string[] {
    if (!filter) return []

    const mapping = {
        input: ['等于', '不等于'],
        singleSelect: ['等于', '包含'],
        multipleSelect: ['等于', '包含'],
    }

    const type = props?.filters[filter]?.type as string

    if (!type) return []
    
    return  mapping[type] ? mapping[type] : []
}

function mappingInput(filter: string): Record<string, any> {
    if (!filter) return { type: 'a-input' }
    const mapping = {
        input: 'a-input',
        singleSelect: 'a-select',
        multipleSelect: 'a-select',
    }

    const item = props?.filters[filter]
    const attrs = {} as Record<string, any>

    if (item.type === 'multipleSelect') {
        attrs.multiple = true
    }

    return  { type: mapping[item.type], attrs, options: item.value }
}

function handleClick() {
    visible.value = true
}

function handleOk() {
    emit('change', conditions)
    handleCancel()
}

function handleCancel() {
    visible.value = false
}

</script>
<style scoped>
.condition {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.icon {
    margin-left: 10px;
}

.arco-select {
    margin-right: 5px;
}
</style>