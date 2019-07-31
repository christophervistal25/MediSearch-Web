<template>
<div>
	<Nav>
		<template v-slot:left-links>
			<b-nav-item v-if="leftLinks" v-for="link in leftLinks">
				<b-link :to="link.to">{{ link.text }}</b-link>
			</b-nav-item>
		</template>
		<template v-slot:right-links>
			<b-nav-item v-if="rightLinks" v-for="link in rightLinks">
				<b-link :to="link.to">{{ link.text }}</b-link>
			</b-nav-item>
		</template>
	</Nav>

	<div class="container mt-5">
		<Alert :status="status" v-show="!spinner">
			<template v-slot:message>
			{{ message }}
			</template>
		</Alert>

		<div class="text-center">
			<Spinner v-show="spinner"></Spinner>
		</div>

		<b-form @submit.prevent="onSubmit">
			<b-form-group id="input-group-1" label="Email address:" label-for="input-1" description="">
				<b-form-input id="input-1" type="email" v-model="userLogin.email" required placeholder="Enter email" :disabled="spinner"></b-form-input>
			</b-form-group>

			<b-form-group id="input-group-2" label="Password:" label-for="input-2">
				<b-form-input id="input-2" type="password" v-model="userLogin.password" required placeholder="Enter email" :disabled="spinner"></b-form-input>
			</b-form-group>

			<div class="text-right">
			 	<b-button type="submit" variant="primary" :disabled="spinner" pill>Sign In</b-button>
			</div>
		</b-form>
	</div>

</div>
</template>
<script>

import axios from 'axios'
import Alert from '../components/Alert.vue'
import Nav from '../components/Nav.vue'
import Spinner from '../components/Spinner.vue'

export default {
	data() {
		return {
		leftLinks :[
			{ to : '/', text : 'Home' },
		],
		rightLinks : [
			{ to : '/register', text : 'Sign Up' },
		],
		userLogin  : {
				email : 'testing@yahoo.com',
				password : '123456',
		},
		status : 'info',
		message : 'Welcome Back!',
		spinner : false,
		};
	},
	methods : {
		onSubmit() {
			this.spinner = true;
			axios.post(`http://localhost:8000/owner/login`, this.userLogin)
				.then((res) => {
					this.status = 'success';
					this.message = 'Redirecting...';
					setTimeout((_) =>  {
						this.$router.push('/owner/dashboard');
						this.spinner = false;
					}, 2000);
				})
				.catch((err) => {
					if ( err.response.status === 422 ) {
						// Change the background of alert
							this.status = 'danger';
						// Display the message
							this.message = err.response.data.message;

						this.spinner = false;
					}
				});
		},
	},
	components : {
		Alert,
		Nav,
		Spinner,
	}
}
</script>