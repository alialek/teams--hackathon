<template>
  <div>
   
    <div v-for="(tag, i) in text.blocks" :key="i">
      <p class="paragraph" v-html="tag.data.text " v-if="tag.type === 'paragraph'">

      </p>
      <h2 class="header my-5" v-html="tag.data.text " v-if="tag.type === 'header'"></h2>
      <div class="my-8" v-if="tag.type === 'image'">
        <div
          class="justify-center"
          style="display: flex; background-color: #EEE"
        >
          <img
            :src="tag.data.file.url"
            style="width: 100% !important"
          />
        </div>
        <p class="my-1 text-center post-caption">{{ tag.data.caption }}</p>
      </div>
      <div class="my-2 ml-2 mb-4" v-if="tag.type === 'list'">
        <ol v-if="tag.data.style === 'ordered'">
          <li v-for="(item, i) in tag.data.items" class="my-1" :key="i">
            {{ item }}
          </li>
        </ol>
        <ul v-if="tag.data.style === 'unordered'">
          <li v-for="(item, i) in tag.data.items" class="my-1" :key="i">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["post"],
    name: "PostViewer",
    computed: {
      text() {
       console.log(this.post.blocks)
       
          return this.post
        
      }
    }
  };
</script>

<style>

</style>
