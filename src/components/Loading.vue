<template>
  <div class="loading">
    <div class="loading-content"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "Loading",
  setup() {}
})
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  z-index: 999999;
  background: rgba(237, 241, 245, 0.6);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.loading-content {
  border: 0 solid transparent;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  position: absolute;
  top: calc(50vh - 75px);
  left: calc(50vw - 75px);
}

.loading-content:before,
.loading-content:after {
  content: "";
  border: 1em solid var(--primary-color);
  border-radius: 50%;
  width: inherit;
  height: inherit;
  position: absolute;
  top: 0;
  left: 0;
  animation: loader 2s linear infinite;
  opacity: 0;
}

.loading-content:before {
  animation-delay: 0.5s;
}

@keyframes loader {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
