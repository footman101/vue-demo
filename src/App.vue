
<template>
<div>
  <div v-for="(config,index) of saveConfigs" :key="index">{{config.name}}</div>
</div>
  <a-button @click="handleClick">自定义筛选</a-button>
  <a-modal v-model:visible="visible" title="自定义筛选" @cancel="handleCancel" @before-ok="handleBeforeOk" @submit="handleSubmit">
    <a-form :model="form">
      <a-form-item v-for="(config,index) of form.configs" :field="`configs[${index}].name`" :label="`Config-${index}`" :key="index">
       <a-select v-model="config.name" placeholder="Please select ..." allow-clear>
          <a-option value="username">用户名</a-option>
          <a-option value="sex">性别</a-option>
          <a-option value="ageRange">年龄段</a-option>
        </a-select>
        <a-select v-model="config.compare" placeholder="Please select ..." allow-clear>
          <a-option value="equal">等于</a-option>
          <a-option value="notequal" v-if="form.name === 'username'">不等于</a-option>
          <a-option value="contain" v-if="form.name !== 'username'">包含</a-option>
        </a-select>
         <a-input v-if="config.name === 'username' || config.name === ''" placeholder="Please enter something" v-model="config.value" allow-clear />
        <a-select v-if="config.name === 'sex'" v-model="config.value" allow-clear>
          <a-option value="man">男</a-option>
          <a-option value="woman">女</a-option>
        </a-select>
        <a-select v-if="config.name === 'ageRange'" v-model="config.value" allow-clear multiple>
          <a-option value="0-10">0-10</a-option>
          <a-option value="10-20">10-20</a-option>
          <a-option value="20-20">20-30</a-option>
        </a-select>
      <a-button @click="handleDelete(index)" :style="{marginLeft:'10px'}">Delete</a-button>
    </a-form-item>
    </a-form>
      <div>
    <a-button @click="handleAdd">Add Config</a-button>
  </div>
  {{ form }}
  </a-modal>
</template>

<script>
import { reactive, ref, watch } from 'vue';

    const configList = [{
        field: 'username',
        type: 'input'
      },{
        field: 'sex',
        type: 'enum',
        multiple: false,
        options: [{
          key: 'man',
          value: '男'
        }]
      },{
        field: 'ageRange',
        type: 'enum',
        multiple: true,
        options: [{
          key: '20-30',
          value: '20-30',
        }]
  }];


export default {
  setup() {

    const visible = ref(false);
    const savedConfigs = reactive([]);


const form = reactive({
      configs: [{
         name: '',
        compare: '',
        value: '',
      }]
    });

    const handleAdd = () => {
      form.configs.push({
         name: '',
        compare: '',
        value: '',
      })
    };
    const handleDelete = (index) => {
      if(form.configs.length === 1) {
        return
      }
      form.configs.splice(index, 1)
    }


    const handleClick = () => {
      visible.value = true;
    };
    const handleBeforeOk = (done) => {
      console.log(form)
      window.setTimeout(() => {
        done()
      }, 1000)
    };
    const handleCancel = () => {
      visible.value = false;
    }

    const handleSubmit = (data) => {
      console.log(data);
    };

    return {
      visible,
      form,
      handleClick,
      handleBeforeOk,
      handleCancel, 
      handleSubmit,
      handleAdd,
      handleDelete
    }
  },
}
</script>
