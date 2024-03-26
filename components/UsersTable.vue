<template>
  <div>
    <div
      v-if="miniAction"
      class="over-lay d-flex justify-content-center align-items-center"
    >
      <b-spinner
        style="width: 3rem; height: 3rem;"
        label="Large Spinner"
        type="grow"
        small
        class="bg-primary"
      ></b-spinner>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Email address</th>
            <th>Full name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <input type="checkbox" aria-label="select topic" />
            </td>
            <td>{{ user.email }}</td>
            <td>{{ fullName(user) }}</td>
            <td>{{ user.account_type }}</td>

            <td>
              <span
                :class="{ active: user.status === 'active' }"
                class="badge badge-pill status-btn p-2"
                >{{user.status === 'active' ? 'Active' : 'Inactive'}}</span
              >
            </td>
            <td :class="{ blocked: user.status !== 'active' }" class="action">
              <span @click="unBlockUser(user.id)" v-if="user.status !== 'active'">UNBLOCK USER</span>
              <span @click="blockUser(user.id)" v-else>BLOCK USER</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: [],
      required: true
    }
  },
  data() {
    return {
      miniAction: false
    };
  },
  methods: {
    fullName(user){
      if(user.first_name && user.last_name){
        return `${user.first_name} ${user.last_name}`
      }
      return 'Update profile'
    },
    makeToast(message, title, variant = null,) {
        this.$bvToast.toast(message, {
          title: ` ${title }`,
          variant: variant,
          solid: true
        })
      },
    async blockUser(id) {
      this.miniAction = true
      try {
        await this.$store.dispatch("admin/blockUser", id);
        this.miniAction = false
      } catch (error) {
        this.miniAction = false
        this.makeToast('Could not block user, please check network connection and try again', 'Failed Request', 'danger')
      }
    },
    async unBlockUser(id) {
      this.miniAction = true
      try {
        await this.$store.dispatch("admin/unblockUser", id);
        this.miniAction = false
      } catch (error) {
        this.miniAction = false
        this.makeToast('Could not unblock user. Please check network connection and try again.', 'Failed Request', 'danger')
        console.log(error);
      }
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
.status-btn {
  cursor: pointer;
  background: #f37d7d;
  width: 72px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
}
.status-btn.active {
  background: #48d784;
  width: 72px;
  font-weight: 600;
}
td.action {
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}
td.action.blocked {
  color: #f37d7d;
}
td.action {
  color: #48d784;
}
.over-lay {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgb(247, 247, 247);
  opacity: 0.4;
}
</style>
