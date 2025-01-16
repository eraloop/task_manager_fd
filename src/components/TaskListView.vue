<template>
  <div class="bg-white flex items-center justify-center align-center p-8 shadow-md">
    <div class="flex flex-col bg-white p-6 rounded-lg" style="width: 50vw; height: 50vh">
      
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-semibold text-gray-800">{{ greeting }} 👋</h1>

        <div class="flex items-center gap-4 mb-6">
          <button @click="toggleDropdown" class="p-2 text-gray-600 hover:bg-gray-200 rounded-md">
            {{ selectedFilter }} ▾
          </button>

          <div v-if="dropdownVisible" class="absolute mt-2 bg-white border rounded-md shadow-lg">
            <button @click="applyFilter('Today')" class="block px-4 py-2 text-sm">Today</button>
            <button @click="applyFilter('This Week')" class="block px-4 py-2 text-sm">
              This Week
            </button>
            <button @click="applyFilter('All')" class="block px-4 py-2 text-sm">All</button>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 mb-6">
        <input
          v-model="newTaskTitle"
          type="text"
          placeholder="Enter task title..."
          class="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
        />
        <button
          @click="addNewTask"
          class="w-1/5 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
        >
          Add
        </button>
      </div>

      <div v-if="loading" class="flex text-center align-center justify-center text-black">
        Loading...
      </div>
      <div v-else-if="error !== null">{{ error }}</div>
      <div v-else class="flex-1 space-y-4 overflow-auto">
        <TaskItem
          v-for="task in filteredTasks"
          :key="task.id"
          :title="task.title"
          :completed="task.status === 'completed'"
          @delete="handleDeleteTask(task.id)"
          @toggle-status="toggleTaskStatus(task.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'
import { useTaskStore } from '@/stores/taskStore'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

export default {
  components: {
    TaskItem,
  },

  setup() {
    const taskStore = useTaskStore()
    const { loading, error, tasks, filteredTasks, selectedFilter } = storeToRefs(taskStore)
    const { toggleTaskStatus, deleteTask, addTask, setFilter } = taskStore

    const newTaskTitle = ref('')
    const dropdownVisible = ref(false)
    const greeting = ref('')

    onMounted(() => {
      taskStore.fetchTasks()
      setGreeting()
    })

    const toggleDropdown = () => {
      console.log(dropdownVisible.value, 'Toggling before')
      dropdownVisible.value = !dropdownVisible.value
      console.log(dropdownVisible.value, 'Toggling after')
    }

    const applyFilter = (filter) => {
      setFilter(filter)
      dropdownVisible = false
    }

    const addNewTask = () => {
      if (!newTaskTitle.value.trim()) return

      const newTask = {
        title: newTaskTitle.value,
        description: 'New task description',
        status: 'pending',
      }
      addTask(newTask)
      newTaskTitle.value = ''
    }

    const setGreeting = () => {
      const currentHour = new Date().getHours()
      if (currentHour < 12) {
        greeting.value = 'Good Morning'
      } else if (currentHour < 18) {
        greeting.value = 'Good Afternoon'
      } else {
        greeting.value = 'Good Evening'
      }
    }

    const handleDeleteTask = (taskId) => {
      deleteTask(taskId)
    }

    return {
      selectedFilter,
      loading,
      error,
      tasks,
      dropdownVisible,
      toggleDropdown,
      applyFilter,
      addNewTask,
      filteredTasks,
      greeting,
      newTaskTitle,
      toggleTaskStatus,
      handleDeleteTask,
    }
  },
}
</script>

<style scoped>
.absolute {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
}
</style>
