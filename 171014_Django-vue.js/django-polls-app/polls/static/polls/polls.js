Vue.component('page-content', {
  props: ['isError', 'errorMessage', 'headline'],
  template: `
  	<div class="content">
  		<h1>{{ headline }}</h1>
  		<p v-if="isError"><strong v-html="errorMessage"></strong></p>
  		<slot></slot>
  	</div>`
})

Vue.component('question', {
  props: ['url', 'text'],
  template: '<li><a v-bind:href="url">{{ text }}</a></li>'
})

Vue.component('results', {
	props: ['choices', 'backlink'],
	template: `
		<ul>
		    <li v-for="choice in choices">
		    	<img v-bind:src="choice.imagePath" /> {{ choice.text }} -- {{ choice.votes }}
		    </li>
		</ul>
		<a v-bind:href="backlink">Vote again?</a>
	`
})

Vue.component('vote-form', {
	props: ['choices', 'action', 'token'],
	template: `
		<form v-bind:action="action" method='post'>
			<input type='hidden' name='csrfmiddlewaretoken' v-bind:value="token" />
			<vote-option v-for="choice in choices" v-bind:choice="choice" v-bind:key="choice.id"></vote-option>
			<input type="submit" value="Vote" />
		</form>`
})

Vue.component('vote-option', {
	props: ['choice'],
	template: `
		<div class='option'>
		    <input type="radio" name="choice" v-bind:id="choice.id" v-bind:value="choice.id" />
		    <label v-bind:for="choice.id"> {{ choice.text }} <img v-bind:src="choice.imagePath" /></label><br />
		</div>`
})

var app = new Vue({
  el: '#app',
  delimiters:['${', '}'],
  data: {
  	choices: [],
  	isError: false,
  	errorMessage: '',
  }
})