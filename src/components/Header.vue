<template lang="pug">
  header
    <!-- Botão Menu -->
    a(class="toggle bt-menu" @click="toggleMenu" v-if="!hideToggle")
      div(v-show="isCloseMenu")
        include ../assets/close-menu.svg
      div(v-show="!isCloseMenu")
        include ../assets/botao-menu.svg

    <!-- Logo -->
    div.logo
      router-link(to='/vitrine')
        img(src="../assets/logo.png")

    Nav

    <!-- Botão Minha Conta -->
    router-link(to='/minha-conta' class="toggle nav-link  bt-minha-conta" :class="{ 'hide-element': !user }" v-if='user') 
      p#welcome-text.hide-mobile Olá, {{ user ? (user.nome.charAt(0).toUpperCase() + user.nome.slice(1)) : null }}
      include ../assets/user.svg
    router-link(to="/auth" class="nav-link bt-login" alt="Login" title='Login' v-if='!user') Login #[font-awesome-icon(icon='sign-in-alt')]

    <!-- Botão Notificações -->
    a(class="toggle bt-notify" @click="toggleNotify" v-if="!hideToggle" :class="{ 'hide-element': !user }")
      div(v-show="isCloseNotify")
        include ../assets/close-menu.svg
      div(v-show="!isCloseNotify")
        include ../assets/notifications.svg

    <!-- Barra de pesquisa -->
    input(
      id="inline-form-input-name"
      class="barra-pesquisa"
      placeholder="Encontrar livros"
      v-model='buscar'
    )

    <!-- Botão pesquisar -->
    button(
      type='button'     
      class="btn btn-primary btn-sm bt-pesquisa" 
      @click='  '
    ) #[font-awesome-icon(icon="search")] 

</template>

<script>
import { mapState } from 'vuex'
import Nav from "@/components/Nav";

export default {
  name: "Header",
  components: { Nav },
  props: {
    hideToggle: Boolean,
  },
  computed: mapState(['isCloseMenu', 'isCloseMinhaConta', 'isCloseNotify', 'user']),
  data: () => {
    return { livroProcurado: '' } 
  },
  // store.watch: {
  //   buscar() {
  //     return this.$store.state.commit('setBusca', this.buscar) 
  //   }
  // },
  methods: {
    toggleMenu() { this.$store.commit("toggleMenu") },
    toggleNotify() { this.$store.commit("toggleNotify") },
    // buscar () { 
    //   this.$store.commit('setBusca', this.livroProcurado) 
    // }
  }
}
</script>

<style lang='scss'>
  header {
    width: 100vw;
    display: grid !important;
    top: -2px;
    align-items: center;

    #user_svg { 
      fill: #fff; 
    }


    @media only screen and (max-width: 900px) {
    
      grid-template-columns: .5fr 2fr 1fr 1fr .5fr; 
      grid-template-rows: .5fr 1fr .5fr 1fr .5fr; 
      height: 150px;

      nav { display: none !important; }

      .bt-menu {
        grid-column: 2 / 3;
        grid-row: 2 / 3;

        display: none;
      }

      .logo {
        grid-column: 2 / 3;
        grid-row: 2 / 3;

        margin: 0px !important;
        justify-content: flex-start;
        text-align: left;

        img {
          width: 50px;
          justify-self: flex-start;
        }
      }

      .bt-minha-conta {
        grid-column: 3 / 5;
        grid-row: 2 / 3;

        justify-self: flex-end;
        align-self: flex-end;

        background-color: #FFB600;
        border-radius: 5px;
        padding: 0px 15px;
        color: white;

        &:hover { background-color: #FFBE1D; color: white; }

        a#welcome-text  { padding: none !important; }
        svg { 
          width: 20px;
        }
      }

      .bt-login {
        grid-column: 3 / 5;
        grid-row: 2 / 3;

        justify-self: flex-end;  
        align-self: flex-end;

        background-color: #FFB600;
        border-radius: 5px;
        padding: 5px 15px;
        color: white;

        &:hover { background-color: #FFBE1D; color: white; }

        svg { 
          width: 20px;
          margin-left: 10px; 
        }
      }

      .bt-logout {
        grid-column: 3 / 5;
        grid-row: 2 / 3;
      }

      .bt-notify {
        // grid-column: 5 / 6;
        // grid-row: 2 / 3;

        justify-self: flex-end;
        display: none;
      }

      .barra-pesquisa {
        grid-column: 2 / 4;
        grid-row: 4 / 5;
        
        border-radius: 5px 0px 0px 5px;
        outline-color: transparent;
        border-style: none;
        background-color: #f5f5f5;
        height: 40px;

        padding: 5px 15px;
      }

      .bt-pesquisa {
        grid-column: 4 / 5;
        grid-row: 4 / 5;

        border-radius: 0px 5px 5px 0px;
        background-color: #00ABC8;
        border: none;
        height: 40px;
      }

    }
    
    @media only screen and (min-width: 901px) {
      grid-template-columns: 15vw .5fr 1.5fr 1fr 5vw 3vw 12vw 15vw; 
      grid-template-rows: .5fr 1fr .5fr; 

      align-items: center;

      .bt-menu {  display: none; }

      .logo {
        grid-column: 2 / 3;
        grid-row: 2 / 3;

        justify-self: flex-start;

        img {
          height: 70px;
        }
        
      }

      nav { 
        grid-column: 3 / 5;
        grid-row: 2 / 3; 

        justify-self: flex-start;
      }

      .barra-pesquisa {
        grid-column: 3 / 5;
        grid-row: 2 / 3;
        
        border-radius: 5px 0px 0px 5px;
        outline-color: transparent;
        border-style: none;
        background-color: #f5f5f5;
        height: 40px; 
        width: 15vw;

        padding: 5px 15px;
        justify-self: flex-end; 
      }

      .bt-pesquisa {
        grid-column: 5 / 6;
        grid-row: 2 / 3;

        border-radius: 0px 5px 5px 0px;
        background-color: #00ABC8;
        border: none;
        height: 40px;
      }

      .bt-minha-conta {
        grid-column: 7 / 8;
        grid-row: 2 / 3;

        display: flex;  
        flex-direction: row;
        justify-self: flex-start;  
        align-self: center;

        background-color: #FFB600;
        border-radius: 5px;
        padding: 0px 15px;
        color: white;

        &:hover { background-color: #FFBE1D; color: white; }

        p#welcome-text { margin: 5px auto; }
        svg { 
          width: 20px;
          margin-left: 10px; 
        }
      }

      .bt-login {
        grid-column: 7 / 8;
        grid-row: 2 / 3;

        justify-self: flex-start;  
        align-self: center;

        align-items: center;
        padding: 5px 15px;
        background-color: #FFB600;
        border-radius: 5px;
        
        color: white;

        &:hover { background-color: #FFBE1D; color: white; }
        svg { 
          width: 20px;
          margin-left: 10px; 
        }
      }

      .bt-notify {
        // grid-column: 7 / 8;
        // grid-row: 2 / 3;

        display: none;

        // justify-self: flex-end;
        // align-self: center;

        // margin-top: -8px;
      }

    }
  }
</style>