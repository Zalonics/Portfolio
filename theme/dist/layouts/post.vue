<template>  
  <div>
    <div class="wrap">
      <saber-link to="/" class="back-home">
        <CornerUpLeftIcon />Home
      </saber-link>
      <div class="container">
        <div class="columns post-columns">
          <div class="column is-6 is-offset-3">
            <div
              v-if="
                page.attributes.assets.cover &&
                  $themeConfig.coverLayout === 'minimal'
              "
              class="post-cover post-cover-minimal"
            >
              <img
                class="post-cover__image"
                :src="page.attributes.assets.cover"
                alt="cover"
              />
            </div>
            <div class="page-title post-title">
              {{ page.attributes.title }}
            </div>
            <PostMeta :attributes="page.attributes" />
            <div class="page-content">
              <slot name="default" />
            </div>
            <div v-if="page.tagsInfo" class="post-tags">
              <saber-link
                v-for="tag in page.tagsInfo"
                :key="tag.permalink"
                :to="tag.permalink"
                class="post-tag"
              >
                <HashIcon />
                {{ tag.name }}
              </saber-link>
            </div>
            <Disqus
              v-if="page.attributes.comments !== false && $themeConfig.disqus"
              class="post-comments"
              :url="$siteConfig.url"
              :permalink="page.attributes.permalink"
              :shortname="$themeConfig.disqus"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CornerUpLeftIcon, HashIcon } from 'vue-feather-icons';
import PostMeta from '../components/PostMeta.vue';
import Disqus from '../components/Disqus.vue';
export default {
  components: {
    CornerUpLeftIcon: CornerUpLeftIcon,
    PostMeta: PostMeta,
    HashIcon: HashIcon,
    Disqus: Disqus
  },
  props: ['page'],
  head: function head() {
    var title = "".concat(this.page.attributes.title, " - ").concat(this.$siteConfig.title);
    var description = this.page.excerpt.replace(/<(?:.|\n)*?>/gm, '');
    return {
      title: title,
      meta: [{
        name: 'description',
        content: description
      }, {
        property: 'og:title',
        content: title
      }, {
        property: 'og:description',
        content: description
      }, {
        property: 'og:image',
        content: this.page.attributes.assets.cover || this.$themeConfig.profilePicture
      }].filter(Boolean)
    };
  }
};
</script>

<style scoped>
.back-home {
  border: 1px solid var(--button-border-color);
  border-radius: 33px;
  padding: 8px 30px;
  position: fixed;
  top: 20px;
  left: 20px;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  color: var(--text-color)
}

.back-home:hover {
    border-color: var(--button-hover-border-color);
  }

.back-home svg {
    margin-right: 10px;
    width: 1rem;
    height: 1rem;
  }

@media (max-width: 768px) {

.back-home {
    position: static;
    position: initial;
    margin-bottom: 30px
}
  }

.post-title {
  margin-bottom: 0;
}

.page-content {
  margin-top: 30px;
}

.post-tags {
  display: flex;
  margin-top: 60px;
  font-size: 0.9rem;
}

.post-tag {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  padding: 3px 6px;
  border-radius: 4px;
  margin-right: 10px;
  color: var(--text-color-lighter)
}

.post-tag svg {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 2px;
  }

.post-tag:hover {
    border-color: var(--hover-border-color);
    color: var(--text-color);
  }

.post-comments {
  margin-top: 60px;
}

.post-columns {
  width: 100%;
}
</style>