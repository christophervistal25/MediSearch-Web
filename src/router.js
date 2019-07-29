import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(Router);

const router = new Router({
	mode : 'history',
	routes : [
		{
			path : '/',
			component : Home,
		},
		{
			path : '/login',
			name : 'login',
			component : Login
		},
		{
			path : '/register',
			name : 'register',
			component : Register
		}
	],
});

export default router;