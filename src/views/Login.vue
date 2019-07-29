<template>
	<div class="p-5">
		<Alert :status="status">
			<template v-slot:message>
				{{ message }}
			</template>			
		</Alert>
		<form @submit.prevent="loginAUser">
		  <div class="form-row">
		    <div class="form-group col-md-6">
		      <label for="inputEmail">Email</label>
		      <input type="email" class="form-control" v-model="userLogin.email" id="inputEmail" placeholder="Email">
		    </div>
		    <div class="form-group col-md-6">
		      <label for="inputPassword">Password</label>
		      <input type="password" class="form-control" v-model="userLogin.password" id="inputPassword" placeholder="Password">
		    </div>
		  </div>
		  <span class="text-primary"><router-link to="/register">Create an account?</router-link></span>
		  <div class="clear-fix"></div>
		  <div class="float-right">
		  	<button type="submit" class="btn btn-primary">Sign in</button>
		  </div>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
import Alert from '../components/Alert.vue'
export default {
	data() {
		return {
			userLogin  : {
				email : null,
				password : null,
			},
			status : 'info',
			message : 'Welcome Back!',
		};
	},
	methods : {
		loginAUser() {
			axios.post(`http://localhost:8000/owner/login`, this.userLogin)
				.then((res) => {
					this.status = 'success';
					this.message = 'Redirecting...';
					setTimeout((_) => this.$router.push('/home'), 2000);
				})
				.catch((err) => {
					if ( err.response.status === 422 ) {
						// Change the background of alert
							this.status = 'danger';
						// Display the message
							this.message = err.response.data.message;
					}
				});
		},
	},
	components : {
		Alert,
	}
}
</script>