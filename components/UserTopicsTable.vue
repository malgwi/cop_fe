<template>
  <div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Topics</th>
            <th>Category</th>
            <th>Author</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tr v-for="topic in topics" :key="topic.id">
          <td>
            <input type="checkbox" aria-label="select topic" />
          </td>
          <td>{{topic.title}}</td>
          <!-- <td>{{topic.category.slug}}</td> -->
          <td>{{topic.email}}</td>
          <td>{{converDate(topic.created_at)}}</td>
          <td>
            <span v-if="topic.status === 'pending'" class="badge badge-pill status-btn p-2">PENDING</span>
            <span v-else-if="topic.status === 'approved'" class="badge badge-pill status-btn approved p-2">APPROVED</span>
            <span v-else class="badge badge-pill status-btn declined p-2">DECLINED</span>
          </td>
          <td>
            <nuxt-link :to="`/user/topics/${topic.id}`">View</nuxt-link>
          </td>
        </tr>
        
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name:'user-topics-table',
  props:{
    topics:{
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods:{
    converDate(date){
      return new Date(date).toDateString()
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: separate !important;
  border-spacing: 0;
}
.table th,
.table td {
  border: 0;
}
thead {
  background: rgba(231, 231, 237, 0.3);
}
tr th {
  font-size: 16px;
  font-weight: 600;
}
table tr {
  border-bottom-left-radius: 10px;
}
.status-btn{
  background: #FDE59B;
  color: #4e3c06;
  width: 72px;
  font-weight: 600;
}
.status-btn.declined{
  background: #fd9b9b;
  color: #4e0606;
  width: 72px;
  font-weight: 600;
}
.status-btn.approved{
  background: #1ce1ac;
  color:#0c673c;
  width: 72px;
  font-weight: 600;
}
td a.nuxt-link{
  font-size: 12px;
}
</style>
