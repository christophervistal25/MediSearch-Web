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
		<b-container fluid >
		  <b-row>
		    <b-col lg="2" class="side-nav-bar">col-lg-2</b-col>
		    <b-col lg="10" class="content">col-lg-10</b-col>
		  </b-row>
		</b-container>
</div>
</template>
<script>
import Nav from '../../components/Nav.vue'
export default {
	data() {
		return {
			leftLinks :[
			],
			rightLinks : [
				{ to : '/login', text : 'Logout' },
			],
		};
	},
	components : {
		Nav,
	}
}
</script>

<style scoped>
	.side-nav-bar {
		background :#f9f9f9;
		height : 94.8vh;
	}
	.content {
		background : white;
		height : 94.8vh;
	}
</style>