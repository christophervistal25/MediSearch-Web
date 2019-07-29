<template>
  <div id="app">
  	  <Nav>
  	  	<template v-slot:left-links>
  			<a class="nav-link"><router-link to="/">Home</router-link></a>
		</template>
		<template v-slot:right-links>
		    <a class="nav-link"><router-link to="/login">Login</router-link></a>
	        <a class="nav-link"><router-link to="/register">Sign Up</router-link></a>
		</template>
  	  </Nav>
  	  <router-view></router-view>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
export default {
  name: 'app',
  components: {
  	Nav,
  }
}
</script>

