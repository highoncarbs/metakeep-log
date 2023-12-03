<template>
  <div class="">
    <div class="level px-4 py-4 is-mobile is-hidden-desktop" style="border-bottom: 1px solid #dbdbdb">
      <div class="level-left">
        <figure class="image mt-1">
          <img src="~assets/logplug.png" style="width:100px;" alt="" />
        </figure>
      </div>
      <div class="level-right">
        <button class="button is-text" @click="openSidebar = !openSidebar">
          <b-icon icon="menu" class="mr-2"></b-icon>
          <span>

            Menu
          </span>
        </button>
      </div>
    </div>


    <b-sidebar type="is-white" fullheight fullwidth overlay right v-model="openSidebar">
      <div class="level px-4 py-4 is-mobile is-hidden-desktop" style="border-bottom: 1px solid #dbdbdb">
        <div class="level-left">
          <figure class="image mt-1">
            <img src="~assets/logplug.png" style="width:100px;" alt="" />
          </figure>
        </div>
        <div class="level-right">
          <button class="button is-text" @click="openSidebar = !openSidebar">
            <b-icon icon="window-close" class="mr-2"></b-icon>
            <span>

              Close
            </span>
          </button>
        </div>
      </div>
      <div class="sidebar-content-body px-4  mx-0 ">
        <!-- <header class="has-text-centered"></header> -->
        <section class="sidebar-content-main">
          <div class="menu sticky is-fullheight px-0">


            <nuxt-link v-for="(nav, index) in navigation" :key="index + '_side_nav'" class="button-x is-fullwidth pl-3"
              to="/">
              <b-icon class="mr-3" :icon="nav.icon"></b-icon>
              <span class="">{{ nav.name }}</span>
            </nuxt-link>


          </div>
          <hr>
          <p class="heading">ADMIN</p>
          <div class="button-x is-fullwidth pl-3"
>
              <b-icon class="mr-3" icon="account-circle"></b-icon>
              <span class="">Padam Sethia</span>
        </div>
          
        </section>
        <footer class="mx-3">
          <div class="media my-2 ">
            <div class="media-left">
              <b-icon icon="account-circle"></b-icon>

            </div>
            <div class="media-content">
              <p class="">Padam Sethia</p>
              <p class="heading">ADMIN</p>
            </div>
            <div class="media-right">
              <button class="button is-light">

                <b-icon icon="dots-vertical"></b-icon>
              </button>
            </div>
          </div>
        
        </footer>
      </div>
    </b-sidebar>

    <!-- Desktop Nav Layout -->

    <div class="columns">
      <div class="column is-hidden-touch pr-0 is-2 mt-0 pt-0 mb-0 pb-0" style="border-right: 1px solid #dbdbdb">
        <div class="sidebar-content-body px-3  mx-0 my-2 pb-4">
          <header class="has-text-centered pt-4">

          </header>
          <section class="sidebar-content-main">

            <div class="menu sticky is-fullheight px-0">


              <nuxt-link v-for="(nav, index) in navigation" v-if="!nav.nested" :key="index + '_side_nav'"
                class="button-x is-fullwidth pl-3" to="/">
                <div class="media">
                  <div class="media-left">
                    <b-icon class="" :icon="nav.icon"></b-icon>

                  </div>
                  <div class="media-content is-fullwidth">

                    <span class="">{{ nav.name }}</span>
                  </div>

                </div>
              </nuxt-link>
              <b-collapse v-else :open="false" animation="slide" aria-id="contentIdForA11y1">
                <template #trigger="props">
                  <div class="button-x is-fullwidth pl-3">
                    <div class="media">
                      <div class="media-left">
                        <b-icon class="" :icon="nav.icon"></b-icon>

                      </div>
                      <div class="media-content is-fullwidth">

                        <span class="">{{ nav.name }}</span>
                      </div>
                      <div class="media-right">

                        <b-icon class="is-pulled-right" :icon="!props.open ? 'chevron-down' : 'chevron-up'"></b-icon>
                      </div>
                    </div>

                  </div>
                </template>
                <div class="">
                  <nuxt-link v-for="(sub_nav, index) in nav.nested" :key="index + '_sub_nav'"
                    class="button-x is-fullwidth pl-6" :to="sub_nav.to">
                    <!-- <b-icon class="mr-3" :icon="nav.icon"></b-icon> -->
                    <span class="">{{ sub_nav.name }}</span>
                  </nuxt-link>
                </div>
              </b-collapse>


            </div>
          </section>
        
        </div>
      </div>
      <div class="column">

        <section class="section pt-5">
          <transition name="fade">
            <div>
              <nuxt />
            </div>
          </transition>
          <figure class="image is-fixed-bottom my-6">
            <p class="heading has-text-centered has-text-grey">POWERED BY</p>
            <img src="~assets/logplug.png" class="container" style="width:100px; opacity: 0.5;" alt="" />
          </figure>
        </section>
      </div>
    </div>


  </div>
</template>
 
<script>
export default {
  // middleware: ["auth-user"],
  watch: {
    $route(to, from) {
      this.openSidebar = false;
    },
  },
  computed: {
    crumbs() {
      const route = this.$route

      const pathArray = route.path.split('/')
      pathArray.shift()
      const crumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          to: !!breadcrumbArray[idx - 1]
            ? breadcrumbArray[idx - 1].to + '/' + path
            : '/' + path,
          title: path.toString().replace('-', ' '),
        })
        return breadcrumbArray
      }, [])
      return crumbs
    },
  },
  data() {
    return {
      expandOnHover: false,
      mobile: "reduce",
      openSidebar: false,
      reduce: false,
      navigation: [
        {
          'name': 'Home',
          'to': '/',
          'icon': 'home-variant',
        },



        // {
        //   'name': 'Utilities',
        //   'to': '/',
        //   'icon': 'puzzle',
        //   'nested': [
        //     {
        //       'name': 'FOREX Conversion',
        //       'to': '/utilities/forex',
        //     },
        //     {
        //       'name': 'Price updates',
        //       'to': '/utilities/price_updates',
        //     },
        //     {
        //       'name': 'GST Updates',
        //       'to': '/utilities/gst_updates',
        //     },

        //   ]
        // },
        {
          'name': 'Settings',
          'to': '/',
          'icon': 'cog',
        },
      ],
      app_switcher: [
        {
          'name': 'E-Catalogue',
          'to': 'https://jaitexart.in',
          // 'icon': 'home-variant',
        },
      ]
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout().then((response) => {
        this.$router.push("/auth");
      });
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

* {
  font-family: 'Inter', sans-serif;

}

li a.nuxt-link-exact-active.nuxt-link-active {
  color: grey;
}

hr {
  background-color: #dbdbdb;
  height: 1px;
}

html {
  scroll-behavior: smooth;
}

.user-box {
  border: 1px solid transparent;
  transition: 0.2s all ease-in;
  border-radius: 7px
}

.user-box:hover {
  border: 1px solid #552fbc88
}

.sidebar-content-body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.sidebar-content-main {
  flex: 1;
}

.button-x {
  color: #0a0a0a;
  font-weight: 500;
  width: 100%;

  cursor: pointer;
  justify-content: left;
  padding: 0.5rem 0 0.5rem 0;
  /* padding-bottom: calc(0.7em - 1px);

  padding-top: calc(0.7em - 1px); */
  text-align: left;
  vertical-align: center;
  display: flex;
  white-space: nowrap;
  transition: 0.2s all ease-in;
}

.button-x-center {
  justify-content: center;
  text-align: center;
}

.button-x:hover {
  background-color: rgb(228, 228, 228);
  border-radius: 3px;
  color: #0a0a0a !important;
}

.sub-nav .button-x {
  padding: 10px 10px;
  font-weight: 300 !important;
}

.sub-nav .button-x:hover {
  font-weight: 300;
}

.menu-burger {
  cursor: pointer;
  display: block;
  height: 3.25rem;
  position: relative;
  width: 3.25rem;
  margin-left: auto;
  padding: 10px 10px 5px 0;
}

.is-family-monospace {
  font-family: "Roboto Mono";
  text-transform: uppercase;
}

.th-wrap {
  color: black;
  font-weight: 600;
}

.modal-content {
  overflow-y: auto !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

li {
  list-style: none;
}

.sticky-pref {
  position: sticky;
  bottom: 3px;
}
</style>
