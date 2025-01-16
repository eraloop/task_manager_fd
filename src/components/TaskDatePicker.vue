<template>
    <div class="relative">
      <button
        @click="toggleDropdown"
        class="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        <span>{{ selectedDate }}</span>
        <span>▾</span>
      </button>
  
      <div
        v-if="showDropdown"
        class="absolute top-full left-0 mt-2 w-80 bg-white border shadow rounded-lg"
      >
        <!-- Calendar -->
        <div class="p-4">
          <p class="text-center font-medium">July, 2023</p>
          <div class="grid grid-cols-7 gap-2 mt-2 text-center">
            <span v-for="day in days" :key="day" class="text-gray-600">
              {{ day }}
            </span>
            <!-- Add Date Buttons Here -->
            <button
              v-for="date in dates"
              :key="date"
              @click="selectDate(date)"
              class="w-10 h-10 rounded-full hover:bg-gray-200"
            >
              {{ date }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showDropdown: false,
        selectedDate: "Today",
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dates: Array.from({ length: 31 }, (_, i) => i + 1),
      };
    },
    methods: {
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      selectDate(date) {
        this.selectedDate = `July ${date}, 2023`;
        this.showDropdown = false;
      },
    },
  };
  </script>
  
  <style scoped></style>
  