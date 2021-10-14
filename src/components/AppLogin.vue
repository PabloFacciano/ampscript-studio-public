<template>
  <div class="flex-fill row g-0">
    <div class="col-xl-4 col-sm-6 col-12 d-flex">

      <div class="my-auto px-lg-5 px-sm-4 px-2 w-100">
        <div class="card shadow-sm">
          <div class="card-body">       
            <h3 class="mb-3">Log In</h3>
            <div v-if="showForm.email" class="mb-3 text-start">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="form.email">
            </div>            
            <div v-if="!showForm.email" class="mb-3 text-start">
              <label for="email" class="form-label">Email</label>
              <div class="input-group mb-3">
                <input type="email" class="form-control" id="email" :value="form.email" disabled>
                <button @click="reset" class="btn btn-secondary" type="button">&times;</button>
              </div>
            </div>
            <div v-if="showForm.password" class="mb-3 text-start">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="form.password">
            </div>
            <div v-if="showForm.gobackButton" class="alert d-flex align-items-center my-3">
              {{ errorMessage }}
            </div>
            <button v-if="showForm.gobackButton" @click="reset" type="button" class="btn btn-primary w-100">Go back</button>
            <button v-if="showForm.nextButton" :disabled="this.form.email.trim() === ''" @click="next" type="button" class="btn btn-primary w-100">Next</button>
            <button v-if="showForm.loginButton" :disabled="this.form.password.trim() === ''" @click="loginWith('email')" type="button" class="btn btn-outline-primary w-100">Login with Email</button>
            <hr>

            <div v-if="showForm.loginButton || showForm.nextButton">
              <div class="mb-3">Or login with</div>
              <div class="row g-2">
                <div class="col">
                  <button @click="loginWith('google')" type="button" class="btn btn-light d-flex align-items-center justify-content-around py-2 w-100">
                    <img width="20" class="mx-2" alt="Google sign-in" src="../assets/google-icon.webp" />
                    <span class="mx-2">Login with Google</span>
                  </button>
                </div>
                <div class="col d-none">
                  <button @click="loginWith('github')" type="button" class="btn btn-light d-flex align-items-center justify-content-around py-2 w-100">
                    <img width="20" class="mx-2" alt="Github sign-in" src="../assets/github-icon.png" />
                    <span class="mx-2">Github</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showForm.signupButton" class="mt-4 text-center text-muted">
          Don't have an account? <a href="#">Sign Up</a>
        </div>
        <div v-if="showForm.forgotPassword" class="mt-4 text-center">
          <a href="#">Forgot your password?</a>
        </div>
      </div>

    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import supabase from "../supabase";

export default {
  data() {
    return {
      showForm: {
        email: true,
        emailMessage: '',
        password: false,
        nextButton: true,
        loginButton: false,
        forgotPassword: false,
        signupButton: true,
        gobackButton: false
      },
      form: {
        email: "",
        password: "",
      },
      errorMessage: '',
      loginChecker: null
    };
  },
  created() {
    this.loginChecker = setInterval(() => {
      const currentUser = supabase.auth.user();
      if(currentUser !== null){
        clearInterval(this.loginChecker);
        this.$router.push("/");
      }
    },100);
  },
  computed: {
    
  },
  methods: {
    reset(){
      this.errorMessage = '';
      this.showForm = {
        email: true,
        emailMessage: '',
        password: false,
        nextButton: true,
        loginButton: false,
        forgotPassword: false,
        signupButton: true,
        gobackButton: false
      };
      this.form = {
        email: "",
        password: "",
      };
    },
    next(){
      this.showForm = {
        email: false,
        password: true,
        nextButton: false,
        loginButton: true,
        forgotPassword: true,
        signupButton: false
      };
    },
    loginWith(provider){
      let postData;
      if (provider == 'email'){
        postData = this.form;
      } else {
        postData = { provider: provider };
      }

      this.$store.dispatch("loginWithAction", postData);

    }
  }
}
</script>

<style scoped>

</style>

