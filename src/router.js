import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import OwnerDashboard from './views/owner/Dashboard.vue'
import OwnerAddStore from './views/owner/AddStore.vue'
import OwnerStores from './views/owner/Stores.vue'

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
		},
		{
			path : '/owner/dashboard',
			name : 'owner.dashboard',
			component : OwnerDashboard
		},
		{
			path : '/owner/add/store',
			name : 'owner.add.store',
			component : OwnerAddStore
		},
		{
			path : '/owner/stores',
			name : 'owner.stores',
			component : OwnerStores
		},
	],
});

export default router;