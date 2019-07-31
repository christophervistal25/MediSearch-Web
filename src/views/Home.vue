<template>
<div>
	<Nav>
		<template v-slot:left-links>
			<a v-if="leftLinks" class="nav-link" v-for="link in leftLinks">
				<b-link :to="link.to">{{ link.text }}</b-link>
			</a>
		</template>
		<template v-slot:right-links>
			<a v-if="rightLinks" class="nav-link" v-for="link in rightLinks">
				<b-link :to="link.to">{{ link.text }}</b-link>
			</a>
		</template>
	</Nav>
	<div class="container mt-5">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum consequatur facere explicabo possimus distinctio nihil dolorem neque quas saepe, omnis, perferendis quod commodi sit nam voluptatem dolore voluptatum vitae! Eum?</p>
	</div>
</div>
</template>
<script>
import Nav from '../components/Nav.vue'
export default {
	data() {
		return {
			leftLinks :[
				{ to : '/', text : 'Home' },
			],
			rightLinks : [
				{ to : '/login', text : 'Sign In' },
				{ to : '/register', text : 'Sign Up' },
			],
		};
	},
	components : {
		Nav,
	}
}
</script>