<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <div class="content">
            <router-link class="navbar-item"
                         :to="{ name: 'Home'}">
              首页
            </router-link>
            <router-link class="navbar-item"
                         :to="{ name: 'FAQ'}">
              常见问题
            </router-link>
          </div>
        </div>
        <div class="column is-4">
          <div class="content">
            <router-link class="navbar-item"
                         :to="{ name: 'Term'}">
              使用条款
            </router-link>
            <router-link class="navbar-item"
                         :to="{ name: 'Privacy'}">
              隐私政策
            </router-link>
          </div>
        </div>
        <div class="column is-4">
          <div class="content">
            <span>联系我们</span>
            <a href="http://t.me/CryptoHero_Official"
               target="_blank">
              @Telegram
            </a>
          </div>
        </div>
      </div>
      <div class="content has-text-centered">
        <p>
          <small>
            &copy; Copyright 2018
            <strong>cryptohero.pro</strong>
          </small>
        </p>
      </div>
    </div>
  </footer>
</template>
