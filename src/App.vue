
<template lang="pug">
  div
    Loading.loading(v-if="isBussy")
    div(v-else)
      Header
      //- Content(@add-to-cart="updateCart")
      Content(v-if='!validatingToken')
      Footer
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'

import { mapState } from "vuex";
import Header from "@/components/Header";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

export default {
  name: "App",
  components: { Header, Content, Footer, Loading },
  computed: mapState(['isLogoutVisible', 'user']),
  data: function() {
    return {
      validatingToken: true,
      isBussy: true
    }
  },
  methods: {
    async validateToken() {
      this.validatingToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)

      if(!userData) {
        this.validatingToken = false
        this.$router.push({ name: 'auth' })
        // alert('Você precisa fazer login!')
        return 
      }
      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

      if(res.data) { 
        this.$store.commit('setUser', userData) 
      } else { 
        localStorage.removeItem(userKey) 
        this.$router.push({ name: 'auth' })
        return alert('Seu token não foi validado!')
      }
      this.validatingToken = false
    },
    loading() {
    }
  },
  mounted() {
    setTimeout(() => {
      this.isBussy = false
    }, 200)
  },
  created() {
    this.validateToken() 
    this.$router.push({ path: '/auth'}) 
  }
};
</script>


<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

a:hover, a, li { text-decoration: none !important; }
li { list-style-type: none; }
button { outline: none; }

.loading { margin: 200px; }
.hide-element { display: none; }

@media only screen and (max-width: 900px) {
  .hide-mobile { display: none; }
}
 

// outline do form
.form-control:focus {
  border-color: #FFB600;
  box-shadow: 0 0 0 .2rem #FFB60030;
}

// hover do tabs
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link { 
  border-color: #00ABC8 #00ABC8 #fff;
  background-color: transparent;
  color: #00ABC8;
}
.nav-tabs { 
  border-color: #00ABC8; 
  a { color: black; }
}

</style>