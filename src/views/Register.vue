<template>
	<div class="p-5">
		<Alert :status="status">
		  <template v-slot:message>
		  	{{ message }}
		  </template>
		</Alert>
		<form @submit.prevent="registerAUser">
		  <div class="form-row">
		  	<div class="form-group col-md-6">
		      <label for="inputFullname">Fullname <span class="text-danger font-weight-bold">*</span></label>
		      <input type="text" class="form-control" v-model="owner.fullname" id="inputFullname" placeholder="Your Fullname">
		    </div>
		    <div class="form-group col-md-6">
		      <label for="inputEmail4">Email <span class="text-danger font-weight-bold">*</span></label>
		      <input type="email" class="form-control" v-model="owner.email" id="inputEmail4" placeholder="Email">
		    </div>
		    
		  </div>
		  <div class="form-row">
		  	<div class="form-group col-md-6">
		      <label for="inputPassword4">Password <span class="text-danger font-weight-bold">*</span></label>
		      <input type="password" class="form-control" v-model="owner.password" id="inputPassword4" placeholder="Password">
		    </div>

		    <div class="form-group col-md-6">
		    	<label for="inputConfirmPassword">Confirm Password <span class="text-danger font-weight-bold">*</span></label>
		    	<input type="password" class="form-control" v-model="owner.confirmation_password" id="inputConfirmPassword" placeholder="Password Confirmation">
		    </div>
		  </div>
		  <div class="form-row">
		    <div class="form-group col-md-6">
		    	<label for="inputAddress">Address <span class="text-danger font-weight-bold">*</span></label>
		    	<input type="text" class="form-control" v-model="owner.address" id="inputAddress" placeholder="Permanent Address">
		    </div>

		    <div class="form-group col-md-6">
		    	<label for="inputContactNo">Contact No : <span class="text-danger font-weight-bold">*</span></label>
		    	<input type="text" class="form-control" v-model="owner.contact_no" id="inputContactNo" placeholder="Your contact no.">
		    </div>

		  </div>
		  <div class="clear-fix"></div>
		  <div class="float-right">
		  	<button type="submit" class="btn btn-primary">Sign up</button>
		  </div>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
import Alert from '../components/Alert.vue'
import FormValidator from '../class/FormValidator'

export default {
	data() {
		return {
			owner : {
				fullname : null,
				email : null,
				password : null,
				confirmation_password : null,
				address : null,
				contact_no : null,
			},
			status : 'info',
			message : `	Create an account, all fields are required.`,
		};
	},
	methods : {
		registerAUser() {
			let validator = new FormValidator(this.owner,{
				fullname 	: 'required|min:1|max:20',
				email 	 	: 'required',
				password 	: 'min:6|max:20|match:confirmation_password|strict',
				address    	: 'required',
				contact_no 	: 'required',
			});
			validator.success( () => {
				axios.post(`http://localhost:8000/owner`, this.owner)
					 .then((res) => {
						this.status = 'success';
						this.message = 'Successfully registered!, Redirecting...';
						setTimeout(() => this.$router.replace('/home'), 2000);
					});
			});
			
		}
	},
	components : {
		Alert,
	}
}
</script>