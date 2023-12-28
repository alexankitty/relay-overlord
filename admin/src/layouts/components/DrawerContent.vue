<script setup>
import logo from '@/assets/logo.svg?raw'
import router from '@/router'
import { VerticalNavLink, VerticalNavSectionTitle } from '@layouts'
import { useTheme } from 'vuetify'

const logout = () => {
  localStorage.removeItem('token')
  router.push('logout')
}

const vuetifyTheme = useTheme()
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
      <div v-html="logo" fill="white" />
      
      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">Relay Overlord</h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'index',
        icon: { icon: 'mdi-home-outline' },
      }"
    />
    <!-- 👉 Pages -->
    <VerticalNavSectionTitle :item="{ heading: 'Configuration' }" />

    

    <VerticalNavLink
      :item="{
        to: 'devices',
        title: 'Devices',
        icon: { icon: 'mdi-tools' },
      }"
    />

    <VerticalNavLink
      :item="{
        to: 'templates',
        title: 'Templates',
        icon: { icon: 'mdi-file-document-edit' },
      }"
    />

    <VerticalNavLink
      :item="{
        to: 'events',
        title: 'Events',
        icon: { icon: 'mdi-calendar' },
      }"
    />

    <!-- 👉 Admin todo: show this only when users have permissions to do so -->
    <VerticalNavSectionTitle :item="{ heading: 'Admin' }" />
    <VerticalNavLink
      :item="{
        to: 'users',
        title: 'Users',
        icon: { icon: 'mdi-account-group' },
      }"
    />
    <VerticalNavLink
      :item="{
        to: 'groups',
        title: 'Groups',
        icon: { icon: 'mdi-account-multiple' },
      }"
    />

    <!-- 👉 User -->
    <VerticalNavSectionTitle :item="{ heading: 'User' }" />
    <VerticalNavLink
      :item="{
        to: 'account',
        title: 'Account',
        icon: { icon: 'mdi-account' },
      }"
    />
    <VerticalNavLink
      :item="{
        to: 'login',
        title: 'Logout',
        icon: { icon: 'mdi-login' },
      }"
      @click="logout"
    />
  </ul>
</template>

<style lang="scss">
.upgrade-banner {
  margin-top: auto;
}
</style>
