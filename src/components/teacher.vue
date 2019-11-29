<template>
  <div class="teacher imooc-container">
    <p class="">讲师列表</p>
    <div class="item imooc-flex imooc-container" :key="index" v-for="(teacher,index) in teacherList">
      <div class="avatar mr-10">
        <img
          :src="teacher.avatar==''||teacher.avatar==null?'/static/images/noPhotoimg.jpg':teacher.avatar"
          class="avatar"
        />
      </div>
      <div class="info imooc-flex imooc-flex-column imooc-flex-between">
        <div class="name">{{ teacher.name }}</div>
        <div class="type cr-basic">{{ teacher.position }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["teacherList"]
};
</script>

