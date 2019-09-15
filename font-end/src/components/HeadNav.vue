<template>
  <header class="header-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/kai.png" class="logo" />
        <span>王凯后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="user-info">
          <img :src="user.avatar" class="avatar" />
          <div class="welcome">
            <p class="name come-name">欢迎</p>
            <p class="name avatar-name">{{user.name}}</p>
          </div>
          <span class="user-name">
            <el-dropdown trigger="click" @command="SetDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: "HeadNav",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    SetDialogInfo(value) {
      switch (value) {
        case "info":
          this.showInfo();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfo() {
      this.$router.push("/userinfo");
    },
    logout() {
      // 移除 Token
      localStorage.removeItem("UserToken");
      this.$store.dispatch("clear");
      // 跳转至登录界面
      this.$router.push("/login");
    }
  }
};
</script>
<style  scoped>
.header-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #6a89cc;
  color: #fff;
  border-bottom: 1px solid #6a89cc;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.come-name {
  font-size: 12px;
}
.avatar-name {
  color: #409eff;
  font-weight: bolder;
}
.user-name {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
