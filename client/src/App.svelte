<script>
	import router from "page";
	import NavBar from "./components/NavBar.svelte";
	import Produits from "./components/Produits.svelte";
	import Fournisseurs from "./components/Fournisseurs.svelte";
	import Commandes from "./components/Commandes.svelte";
	import Dashboard from "./components/Dashboard.svelte";

	let page;

	// Définition des routes
	router("/dashboard", () => (page = Dashboard));
	router("/commandes", () => (page = Commandes));
	router("/produits", () => (page = Produits));
	router("/fournisseurs", () => (page = Fournisseurs));

	// Activation du routage
	router.start();
</script>

<main>
	<!-- Barre de navigation -->
	<NavBar />
	<svelte:component this={page} />
</main>

<style>
</style>
