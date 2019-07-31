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

	<b-container class="mt-5">
		<Alert :status="status" v-show="!spinner">
			<template v-slot:message>
			<div v-if="status == 'danger'">
				<ul>
					<li v-for="msg in validator.message">{{ msg | removeUnderScores }}</li>
				</ul>
			</div>
			<div v-else>
				{{ message }}
			</div>
			</template>
		</Alert>

		<form @submit.prevent="registerAUser">
			<div class="text-center">
				<Spinner v-show="spinner"></Spinner>
			</div>
			  <b-row class="my-1">
			  		<b-col sm="6">
			  			<b-form-group id="fieldset-1" description="Let us know your fullname" label="Fullname: " label-for="input-1">
			      			<b-form-input id="input-1" type="text" v-model="owner.fullname" trim required :disabled="spinner"></b-form-input>
			    		</b-form-group>		
			  		</b-col>

			  		<b-col sm="6">
			  			<b-form-group id="fieldset-2" description="We'll never share your email with anyone else." label="Email: " label-for="input-2">
			      			<b-form-input id="input-2" type="email" v-model="owner.email" trim required :disabled="spinner"></b-form-input>
			    		</b-form-group>		
			  		</b-col>
			  </b-row>

			  <b-row class="my-1">
			  		<b-col sm="6">
			  			<b-form-group id="fieldset-3" description="1 Capital letter, 1 digit and 1 Symbol" label="Password: " label-for="input-3">
			      			<b-form-input id="input-3" type="password" v-model="owner.password" trim required :disabled="spinner"></b-form-input>
			    		</b-form-group>		
			  		</b-col>

			  		<b-col sm="6">
			  			<b-form-group id="fieldset-4" description="This field must be same with the password field" label="Confirm Password: " label-for="input-4">
			      			<b-form-input id="input-4" type="password" v-model="owner.confirm_password" trim required :disabled="spinner"></b-form-input>
			    		</b-form-group>		
			  		</b-col>
			  </b-row>

			   <b-row class="my-1">
			  		<b-col sm="6">
			  			<b-form-group id="fieldset-5" description="Your permanent address" label="Address: " label-for="input-5">
			      			<b-form-input id="input-5" type="text" v-model="owner.address" trim required :disabled="spinner"></b-form-input>
			    		</b-form-group>		
			  		</b-col>

			  		<b-col sm="6">
			  			<b-form-group id="fieldset-6" description="Start with 09 or +639" label="Contact No: " label-for="input-6">
			      			<b-form-input id="input-6" type="text" v-model="owner.contact_no" trim required :disabled="spinner"></b-form-input>
			    		</b-form-group>		
			  		</b-col>
			  </b-row>
			<div class="text-right">
				<b-button type="submit" variant="primary" pill :disabled="spinner">Sign Up</b-button> 	
			</div>
		</form>
	</b-container>
</div>
</template>
<script>
import axios from 'axios'
import FormValidator from '../class/FormValidator'
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
				{ to : '/login', text : 'Sign In' },
			],
			owner : {
				fullname : 'Christopher',
				email : 'testing@yahoo.com',
				password : '123456789',
				confirm_password : '123456789',
				address : 'Awasian',
				contact_no : '09193693499',
			},
			status : 'info',
			message : `	Create an account, all fields are required.`,
			validator : null,
			spinner: false,
		};
	},
	filters : {
		removeUnderScores(value) {
			let newVal = value.replace('_', ' ').toLowerCase();
			return value.substring(0,1).toUpperCase() + newVal.substring(1,newVal.length);
		}
	},
	methods : {
		registerAUser() {
			// This is for front-end Form validation located at class/FormValidator.js
			this.validator = new FormValidator(this.owner,{
				fullname 	: 'required|min:1|max:20',
				email 	 	: 'required',
				password 	: 'min:6|max:20|match:confirm_password|strict',
				address    	: 'required',
				contact_no 	: 'required',
			});
			this.validator.success( () => {
				// To not leave the alert box blank we temporarily change the status info
				this.spinner = true;
				axios.post(`http://localhost:8000/owner`, this.owner)
				.then((res) => {
					this.status = 'success';
					this.message = 'Successfully registered!, Redirecting...';
					setTimeout(() => this.$router.replace('/owner/dashboard'), 2000);
				}).catch((err) => {
					// API response validation
					if ( err.response.status == 422 ) {
						this.status = 'danger';
						this.spinner = false;
						let data = Object.values(err.response.data).map((data) => {
							this.validator.message.push(data[0]);
						});
					}
				});
			}).fail(() => {
				this.status = 'danger';
				this.spinner = false;
			}); // again for Front-end Form validation
		}
	},
	components : {
		Alert,
		Nav,
		Spinner,
	}
}
</script>