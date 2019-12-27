<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="static/images/logo.png" />
        </a>
      </div>
      <div class="navbar-right-container">
        <a href="javascript:void(0)" class="navbar-link">Login</a>
        <a href="javascript:void(0)" class="navbar-link">Logout</a>
        <a class="navbar-link navbar-cart-link" href="/#/cart">car</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
header{
  margin: 0 10%;
}
img{
  height: 80px;
}
.navbar {
  height: 80px;
  display: flex;
}
.navbar-left-container,
.navbar-right-container {
  line-height: 80px;
  flex: 1;
}

.navbar-right-container {
  text-align: right;
}
</style>>
