<template>  
  <div class="wrap">
    <div class="container">
      <HomeProfile />
      <div class="main">
        <div class="columns">
          <div class="column is-8">
            <h2 class="page-title">
              {{ page.attributes.title }}
            </h2>
            <div class="page-content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeProfile from '../components/HomeProfile.vue';
export default {
  components: {
    HomeProfile: HomeProfile
  },
  props: ['page'],
  head: function head() {
    var description = this.page.excerpt.replace(/<(?:.|\n)*?>/gm, '');
    return {
      title: "".concat(this.page.attributes.title, " - ").concat(this.$siteConfig.title),
      meta: [{
        property: 'og:title',
        content: this.$siteConfig.title
      }, {
        property: 'og:description',
        content: description
      }, {
        property: 'og:image',
        content: this.$themeConfig.profilePicture
      }]
    };
  }
};
</script>