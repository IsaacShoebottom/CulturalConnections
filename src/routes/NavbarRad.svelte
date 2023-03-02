<style>
	#navigationBar {
	background-color: rgba(13, 17, 23, 1);
	position: fixed;
	top: 0; /* Pushes navbar to the top of the screen - always */
	z-index: 1000; /* layering priority - higher value -> on top */

	width: 100vw;
	
	display: flex;
	left: 0; right: 0; /* This makes the navbar span across the whole page */
	align-items: center; /* Center vertically */
	

	justify-content: space-between;
	padding: 5px 50px 5px;
	margin-left: auto;
	margin-right: auto;
	
	max-height: 100px;

	transition: all .25s ease;

	background-image: url("/frontpage/navbarBG.jpg");

}


.subdomain-container[selected] {
	border: gray 2px solid;
}

.subdomain-container:hover {
	border: rgb(195, 195, 195) 2px solid;
	transform: scale(1.1);
	text-decoration: none;
}

.subdomain-container:hover:active {
	transform: scale(1.0);
}

.subdomain-icon {
	width: 32px;
	padding: 0 30px;
}

.subdomain-text {
	margin: 0 0 5px 0;
	color: lightgray;
	visibility: hidden;
	opacity: 0;
	transition: opacity 0.1s linear, visibility  0.1s  linear;	
}



#title1 {
	color: white;
	font-weight: bold;
	text-align: right;
	font-size: 25px;
	display: inline-block;
}

#title2 {
	color: white;
	font-weight: bold;
	font-size: 45px;
	background-color: #CD010C;
	width: fit-content;
	padding: 0px 20px;
	border-radius: 12px;
	margin-left: 10px;
	display: inline-block;
	transition: ease .5s;
}

#title2:hover {
	transform: rotate3d(0,1,0, 360deg);
}

#username {
	color: white;
	font-weight: bold;
	text-align: right;
	font-size: 25px;
	display: inline-block;
	margin-left: 50px;
	margin-right: 20px;
}
#leftside {
	display: flex;
	align-items: center; /* Center vertically */
	cursor: pointer;
}
#rightside {
	text-align: right;
	display: flex;
	align-items: center; /* Center vertically */
	align-content: flex-end;
	float: right;
	flex-wrap: wrap;
}

.vertbar {
	height:60px;
	width: 2px;
	background: white;
}

.textBtn {
	color: white;
	font-size: 25px;
	font-weight: bold;
	margin-left: 25px;
	margin-right: 25px;
	transition: ease .1s;
}

.textBtn:hover:not(:active) {
	transform: scale(1.1);
}

.textBtn:hover {
	cursor: pointer;
}


</style>


<nav id="navigationBar">
	<a href="/" id="leftside">
		<span id="title1">Cultural Connections<br>Through</span>
		<span id="title2">COOKING</span>
	</a>
	
	<span id="rightside">
		<a href="/recipes" class="textBtn">Recipes</a>
		<div class="vertbar"></div>
		<a href="/recipes/add" class="textBtn">Create Recipe</a>
		<div class="vertbar"></div>
		<a href="/recipes/my-recipes" class="textBtn">My Recipes</a>

		<span id="username">Matei</span>
		<img src="/frontpage/user.svg" height="50" width="50" style="filter: invert()"/>
		
	</span>
	
</nav>