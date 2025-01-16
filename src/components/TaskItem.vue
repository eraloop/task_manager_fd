<template>
  <div class="flex items-center justify-between p-2 border rounded-md shadow-sm">
    <div class="flex items-center gap-3">
      <input
        type="checkbox"
        :checked="completed"
        @change="toggleTaskStatus"
        class="w-5 h-5 accent-gray-800"
      />

      <div
        :class="{
          'line-through text-gray-400': completed,
          'text-gray-800': !completed,
        }"
        class="text-lg font-medium"
      >
        {{ title }}
      </div>
    </div>

    <div class="flex gap-2">
      <button @click="$emit('delete', taskId)" class="text-red-500 hover:text-red-700">🗑</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    taskId: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    toggleTaskStatus() {
      this.$emit('toggle-status', this.taskId)
    },
  },
}
</script>
