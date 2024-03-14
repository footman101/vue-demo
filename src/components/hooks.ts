import { reactive } from 'vue'

let id = 0
export function useConditions() {
    const conditions = reactive<any[]>([])


    function addConditions() {
        conditions.push({ filter: '', operator: '', value: '', id: ++id })
    }

    function deleteConditions(id: number) {
        const index = conditions.findIndex((item) => item.id === id)
        if (index > -1) {
            conditions.splice(index, 1)
        }
    }

    return { conditions, addConditions, deleteConditions }
}