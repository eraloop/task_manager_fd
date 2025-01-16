import { defineStore } from 'pinia';
import  apiService  from '../services/api.js';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
    selectedFilter: 'All', 
    dropdownVisible: false
  }),

  getters: {

    completedTasks: (state) => state.tasks.filter((task) => task.status === 'completed'),
    pendingTasks: (state) => state.tasks.filter((task) => task.status === 'pending'),

    filteredTasks: (state) => {
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      switch (state.selectedFilter) {
        case 'Today':
          return state.tasks.filter((task) => {
            const taskDate = new Date(task.createdAt);
            return taskDate.toDateString() === today.toDateString();
          });
        case 'This Week':
          return state.tasks.filter((task) => {
            const taskDate = new Date(task.createdAt);
            return taskDate >= oneWeekAgo && taskDate <= today;
          });
        case 'All':
        default:
          return state.tasks;
      }
    },
  },

  actions: {
    
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiService.get('tasks')
        this.tasks = [...response.data]
        console.log(this.tasks)
      } catch (err) {
        this.error = err.message || 'Failed to fetch tasks.';
      } finally {
        this.loading = false;
      }
    },


    async addTask(newTask) {
      try {
        const response = await apiService.post('tasks', newTask)
        this.tasks = [...this.tasks, response]
      } catch (err) {
        this.error = err.message || 'Failed to add task.';
      }
    },


    async updateTask(id, updatedTask) {
      try {
        const updatedTaskData = await apiService.put(`tasks/update/${id}`, updatedTask);
        const index = this.tasks.findIndex((task) => task.id === id);

        if (index !== -1) {
          this.tasks[index] = updatedTaskData;
        }
      } catch (err) {
        console.log(err, 'jsdgjhsgjhgsdjhg');
        this.error = err.message || 'Failed to update task.';
      }
    },


    async deleteTask(id) {
      try {
        const response = await apiService.delete(`tasks/delete/${id}`);
        if (response == 204) {
          this.tasks = this.tasks.filter((task) => task.id !== id);
        } else {
          throw new Error('Failed to delete task on server.');
        }
      } catch (err) {
        this.error = err.message || 'Failed to delete task.';
      }
    },


    async toggleTaskStatus(id) {
      try {
        const response = await apiService.put(`tasks/${id}/toggle-status`);
        if (response.status === 200) {

          const index = this.tasks.findIndex((task) => task.id === id);
          if ( index !== -1 ) {
            this.tasks[index].status = this.tasks[index].status === 'pending' ? 'completed' : 'pending';
          }

        } else {
          throw new Error('Failed to toggle task status.');
        }
      } catch (err) {
        this.error = err.message || 'Failed to toggle task status.';
      }
    },

    setFilter(filter) {
      this.selectedFilter = filter;
    },


  },
});


