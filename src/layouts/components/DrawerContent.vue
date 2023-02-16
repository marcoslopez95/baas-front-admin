<script setup lang="ts">
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
import logo from '@/assets/logo.svg?raw'
import { VerticalNavLink, VerticalNavSectionTitle } from '@layouts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? upgradeBannerLight
    : upgradeBannerDark
})
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
      <div v-html="logo" />

      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
          Materio
        </h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'index',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    <VerticalNavSectionTitle :item="{ heading: 'Configs', dropable:true }" >

    <VerticalNavLink
      :item="{
        title: 'Roles',
        to: 'roles-user',
        icon: { icon: 'mdi-account-group' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Permission',
        to: 'permission',
        icon: { icon: 'mdi-gesture-tap-button' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Countries',
        to: 'countries',
        icon: { icon: 'mdi-earth' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Foreing Admins',
        to: 'foreign-admins',
        icon: { icon: 'mdi-account' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Bussiness Networks',
        to: 'bussiness-network',
        icon: { icon: 'mdi-office-building-cog' }
      }"
    />
   
    <VerticalNavLink
      :item="{
        title: 'Bussinesses',
        to: 'bussinesses',
        icon: { icon: 'mdi-account-tie-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Currency Categories',
        to: 'currency-categories',
        icon: { icon: 'mdi-cash-multiple' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Currencies',
        to: 'currency',
        icon: { icon: 'mdi-cash' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Payment Methods',
        to: 'payment-methods',
        icon: { icon: 'mdi-account-cash' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Bank Account Types',
        to: 'banks-account-type',
        icon: { icon: 'mdi-bank-plus' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Operation Categories',
        to: 'operation-category',
        icon: { icon: 'mdi-clipboard-list' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Operation Status',
        to: 'operation-status',
        icon: { icon: 'mdi-list-status' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Account Types',
        to: 'account-types',
        icon: { icon: 'mdi-account-supervisor-circle' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Centralized Categories',
        to: 'centralized-category',
        icon: { icon: 'mdi-account-supervisor-circle' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Criptocurrecy Networks',
        to: 'criptocurrency-networks',
        icon: { icon: 'mdi-network' }
      }"
    />
  </VerticalNavSectionTitle>
    <!-- <VerticalNavLink
      :item="{
        title: 'Account Settings',
        to: 'account-settings',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    /> -->
    
    <!-- 👉 Pages -->
    <VerticalNavSectionTitle :item="{ heading: 'Pages' }" />
    <VerticalNavLink
      :item="{
        title: 'Login',
        to: 'login',
        target: '_blank',
        icon: { icon: 'mdi-login' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Register',
        to: 'register',
        target: '_blank',
        icon: { icon: 'mdi-account-plus-outline' }
      }"
    />

    <!-- ℹ️ This path doesn't exist so 404 route will catch this undefined path -->
    <VerticalNavLink
      :item="{
        title: 'Error',
        to: { path: '/error' },
        target: '_blank',
        icon: { icon: 'mdi-alert-circle-outline' }
      }"
    />

    <!-- 👉 User Interface -->
    <VerticalNavSectionTitle :item="{ heading: 'User Interface' }" />

    <VerticalNavLink
      :item="{
        title: 'Typography',
        to: 'typography',
        icon: { icon: 'mdi-alpha-t-box-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Icons',
        to: 'icons',
        icon: { icon: 'mdi-eye-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Cards',
        to: 'card-basic',
        icon: { icon: 'mdi-credit-card-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Tables',
        to: 'tables',
        icon: { icon: 'mdi-table' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Form Layouts',
        to: 'form-layouts',
        icon: { icon: 'mdi-form-select' }
      }"
    />
  </ul>

  <!-- 👉 illustration -->
  <a
    href="https://themeselection.com/item/materio-vuetify-vuejs-admin-template"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      :src="upgradeBanner"
      alt="upgrade-banner"
      transition="scale-transition"
      class="upgrade-banner mx-auto"
      style="max-width: 230px"
    >
  </a>
</template>

<style lang="scss">
// .v-navigation-drawer {
//   height: 100%;

//   .v-navigation-drawer__content {
//     display: flex;
//     flex-direction: column;

//     > ul {
//       flex-grow: 1;
//     }
//   }
// }

.upgrade-banner {
  margin-top: auto;
  // position: absolute;
  // bottom: 13px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
