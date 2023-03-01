<script>
	import RangeSlider from 'svelte-range-slider-pips'
    import Tags from 'svelte-tags-input'
    import { presetCards } from '../components/imgData.js';
    import { Button } from 'flowbite-svelte';
	import Gallery from '../components/Gallery.svelte';
    import '../../../app.css';
    import { onMount } from 'svelte';
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Sidebar,
        SidebarGroup,
        SidebarWrapper,
        Drawer,
        CloseButton,
    } from 'flowbite-svelte';
    import { Cog } from 'svelte-heros-v2';
    import { sineIn } from 'svelte/easing';

    let cards = presetCards.slice();

    // page logic
    let unfilteredCards = presetCards.slice();
    let pageNumber = Math.ceil(cards.length / 15);
    let currentPage = 1;
    let pageArray = [];
    for (let i=0; i<pageNumber; i++) {
        pageArray.push(i+1);
    }

    console.log(cards);
    let selectedCards
    if (cards.length <= 15) {
        selectedCards = cards.slice();
    }
    else {
        selectedCards = cards.slice().splice(0, 15);
    }
    console.log(cards);

    function changePage(i) {
        console.log(i);
        currentPage = i;
        let firstIndex = i * 15;
        let lastIndex = firstIndex + 15;
        console.log(firstIndex + " " + lastIndex);
        console.log(cards);
        if (lastIndex >= cards.length) {
            selectedCards = cards.slice().splice(firstIndex, cards.length);
        }
        else {
            selectedCards = cards.slice().splice(firstIndex, lastIndex+1)
        }
    }
    
    let divClass = 'w-full md:block md:w-auto pr-8';
    let ulClass = 'flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium';

    let drawerHidden = false;
    let backdrop = false;
    const toggleDrawer = () => {
        drawerHidden = !drawerHidden;
    };

    let activateClickOutside = true;
    let breakPoint = 1024;
    let width;

    $: if (width >= breakPoint) {
      drawerHidden = false;
      backdrop = false;
      activateClickOutside = false;
    } else {
      drawerHidden = true;
      backdrop = true;
      activateClickOutside = true;
    }

    onMount(() => {
      if (width >= breakPoint) {
        drawerHidden = false;
        backdrop = false;
        activateClickOutside = false;
      } else {
        drawerHidden = true;
        backdrop = true;
        activateClickOutside = true;
      }
    });

</script>

<svelte:window bind:innerWidth={width} />

<Navbar let:hidden let:toggle>
    <NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden" />
    <NavBrand href="/" class="lg:ml-64">
      <span class= "self-center whitespace-nowrap text-xl font-semibold dark:text-white pl-4">
        Cultural Connections
      </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden} {divClass} {ulClass}>
      <NavLi href="../">Home</NavLi>
      <NavLi href="../recipes">Recipes</NavLi>
      <NavLi href="../recipes/add">Create Recipe</NavLi>
      <NavLi href="my-recipes">My Recipes</NavLi>
    </NavUl>
  </Navbar>

  <div class="flex px-4 mx-auto w-full" style="background-color:aliceblue; padding: 40px;">
    <main>
        <Gallery>
            {#each selectedCards as {name, url, keyword, descr}}	
                <div class="show column">
                    <div class="content">
                        <img src={url} alt={name} style="width:100%">
                        <h4>{name}</h4>
                        <p>{descr}</p>
                    </div>
                </div>
            {/each}
        </Gallery>
        <div class="pageNumbers">
            {#each pageArray as num, i (num)}
                <Button pill={true} color="red" size="xs" on:click={() => changePage(i)}>
                    {num}
                </Button>
            {/each}
          </div>
      <slot />
    </main>
  </div>

<style global>
    main {
        font-size: 28px; /* Increased text to enable scrolling */
        padding: 0px 10px;
        max-width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    /* 	background-color: red; */
    }

    h4 {
        font-size: 2rem;
        margin: 0;
    }
        
    p {
        margin: 0 0 .5rem;
        position: relative;
    }

    /* Create three equal columns */
    .column {
        width: auto;
        display: none;
        justify-content: center;
        margin: 20px 8px;
    }


    /* Content */
    .content {
        padding: 20px;
        width:250px;
        max-width:250px;
        min-width:250px;
        display: inline-block;
        background-color: white;
        margin: 5px;
        padding: 10px;
        width: 30vw;
        box-shadow: 1px 1px 5px rgb(167, 167, 167);
    }

    /* The "show" class is added to the filtered elements */
    .show {
        display: flex;
    }

    .apply {
        padding-top: 40px;
    }

    .pageNumbers {
        margin: 0 auto;
    }

    /* Style the list */
    ul.breadcrumb {
        padding: 10px 16px;
        list-style: none;
        background-color: #eee;
    }

    /* Display list items side by side */
    ul.breadcrumb li {
        display: inline;
        font-size: 18px;
    }

    /* Add a slash symbol (/) before/behind each list item */
    ul.breadcrumb li+li:before {
        padding: 8px;
        color: black;
        content: "/\00a0";
    }

    /* Add a color to all links inside the list */
    ul.breadcrumb li a {
        color: #0275d8;
        text-decoration: none;
    }

    /* Add a color on mouse-over */
    ul.breadcrumb li a:hover {
        color: #01447e;
        text-decoration: underline;
    }
</style>