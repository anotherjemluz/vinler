<template lang='pug'>
  transition
    div.auth-content
      div(class='auth-modal col-lg-3')
        h1(class='auth-title') {{ showSignup ? 'Novo Cadastro ' : 'Login' }}

        form.form-box
          div.form-group
            input(
              type="text" 
              class="form-control" 
              placeholder="Seu nome aqui :)"
              v-model='user.nome'
              v-if="showSignup"
              required
                )
          div.form-group
            input(
              type="text" 
              class="form-control" 
              placeholder="seu e-mail"
              v-model='user.email'
              v-if="showSignup"
              required
            )
          div.form-group
            input(
              type="text" 
              class="form-control" 
              placeholder="... e o login!"
              v-model='user.login'
              required
            )
          div.form-group
            input(
              type="password" 
              class="form-control" 
              placeholder="Ah! Tem a senha também."
              v-model='user.senha'
              required
            )
          div.form-group
            input(
              type="password" 
              class="form-control" 
              placeholder="Pode repetir a senha?"
              v-model='user.confirmarSenha'
              v-if="showSignup"
              required
            )
          div.form-group
            input(
              type="text" 
              class="form-control" 
              placeholder="Diz aí qual teu número."
              v-model='user.celular'
              v-if="showSignup"
              required
            )
          div.form-group
            input(
              type="text" 
              class="form-control" 
              placeholder="E onde você mora ;)"
              v-model='user.local'
              v-if="showSignup"
              required
            )
          
            //- div.form-check    
            //- input(
            //-   id='checkFuncionario'
            //-   type="checkbox" 
            //-   class="form-check-input" 
            //-   v-model='user.isFuncionario'
            //-   v-if="showSignup"
            //-   required
            //- )
            //- label(
            //-   class="form-check-label" 
            //-   v-if="showSignup"
            //-   for="checkFuncionario") É funcionário?

            //- div.form-group
            //- input(
            //-   type="tel" 
            //-   class="form-control" 
            //-   placeholder="Ganha quanto?"
            //-   v-if="user.isFuncionario && showSignup "
            //-   v-model='user.salario'
            //-   required
            //- )  

          div.button-group
            input(
              type='button'     
              class="btn btn-primary btn-pill bt-entrar" 
              v-if="!showSignup"
              @click="signin"
              value="Entrar"
            )
            input(
              type='button'     
              class="btn btn-primary btn-pill bt-entrar" 
              v-else
              @click="signup"
              value="Registrar"
            )

            input(
              type='button'
              class="btn btn-dark danger ml-3 btn-pill" 
              @click=""
              value="limpar"        
              data-aos="fade-left" 
            )

        a(href @click.prevent="showSignup = !showSignup" class="alternar") 
            p(v-if='!showSignup' style='color: grey;') cadastro
            p(v-else style='color: #FFB600;') cadastro
            span(v-if='showSignup' class="fa fa-toggle-off fa-lg")
            span(v-else class="fa fa-toggle-on fa-lg")
            p(v-if='showSignup' style='color: grey;') login
            p(v-else style='color: #FFB600;') login

</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
  name: 'LoginCadastro',
  data: function() {
    return {
      showSignup: false,
      user: { }
    }
  },
  methods: {
    signin() {
      axios.post(`${baseApiUrl}/signin`, this.user)
      .then(res => {
          this.$store.commit('setUser', res.data)
          localStorage.setItem(userKey, JSON.stringify(res.data))
          this.$router.push({ path: '/vitrine'}) 
      }).catch(showError)
    },
    signup() {
      axios.post(`${baseApiUrl}/signup`, this.user)
      .then(() => {
          this.$toasted.global.defaultSucess()
          this.user = {}
          this.showSignup = false
      }).catch(showError)
    }
  }
}
</script>

<style lang="scss">
.auth-content {
  h1 { margin: 50px auto; justify-self: center; color: #FFB600;}
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px auto;
  // background-color: #f9f9f9;
}

.auth-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 80px 0px 80px;
}

.form-check {
  margin: auto auto 20px 17%;
}
.button-group {
  display: flex;
  margin: 30px auto 0px auto;
  align-items: center;
  justify-content: center;
}  

.bt-entrar { background-color: #00ABC8; border: none; }

.alternar { 
  display: flex; 
  flex-direction: row; 
  padding: 40px; 
  text-decoration: none; 

  p:hover { color: #FFB600; }
  span { padding: 7px; color: #FFB600;} 
}

.v-enter, .v-leave-to { opacity: 0; }
.v-enter-active, .v-leave-active { transition: opacity .5s; }


</style>