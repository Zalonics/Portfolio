<template>  
  <a
    class="card"
    :href="`https://github.com/topics/${skill.topic}`"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div
      class="skill-cover"
      :style="{ backgroundImage: `url(${image})` }"
    ></div>
    <div class="skill-description">
      {{ skill.description }}
    </div>
  </a>
</template>

<script>
export default {
  props: {
    skill: {
      type: Object,
      required: true
    }
  },
  computed: {
    image: function image() {
      return this.skill.image || "https://cdn.jsdelivr.net/gh/github/explore/topics/".concat(this.skill.topic, "/").concat(this.skill.topic, ".png");
    }
  }
};
</script>

<style scoped>
.skill-cover {
  height: 130px;
  background-size: 60px;
  background-position: center;
  background-repeat: no-repeat;
}

.skill-description {
  color: var(--text-color-lighter);
}
</style>