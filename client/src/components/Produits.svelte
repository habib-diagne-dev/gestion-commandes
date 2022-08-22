<script>
    import axios from "axios";
    import { Button, Table } from "attractions";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import SvgIcon from "./icons/SVGIcon.svelte";
    import { ProductAdd, ModeEdit, Details } from "./icons/Icons";

    const headers = [
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Age", value: "age", align: "end" },
    ];
    const items = [
        { firstName: "John", lastName: "Doe", age: 694 },
        {
            firstName: "Leo",
            lastName: "Tolstoy",
            age: new Date().getFullYear() - 1828,
        },
        { firstName: "فلان", lastName: "الفلاني", age: 42 },
        { firstName: "Иван", lastName: "Иванов", age: 69 },
    ];

    const SERVER = "localhost";
    const PORT = 4000;
    const ENDPOINT = `http://${SERVER}:${PORT}`;

    // Variables de test pour vérifier si le format des champs est valide
    // let test_nom = true;
    // let test_addresse = true;
    // let test_ville = true;
    // let test_telephone = true;
    // let test_mobile = true;
    // let test_email = true;

    //Variable qui définit la visibilité du formulaire flottant d'ajout de nouveaux produits
    let isVisible = false;

    //Variable qui définit si le formulaire flottant sera utilisé pour l'ajout ou bien l'édition d'un produit
    let isEdit = true;

    //Variable qui reçoit l'ensemble des produits affichés
    let produits = [];

    //Variable lié au formulaire flottant d'ajout ou d'édition de produit
    let produit = {
        nom: "",
        description: "",
        prix_unitaire: 0,
        taux_tva: 0.0,
        quantite_stock: 0,
        quantite_alerte: 0,
        quantite_appro: 0,
        code_barre: "|||||||||",
    };

    //*** Not Yet ***
    /**
     * Fonction qui permet d'ajouter un nouveau produit
     *
     * Liée au bouton "Ajouter" du formulaire d'ajout de produits
     */
    function ajouter() {
        // test_nom = NAME_PATTERN.test(fournisseur.nom.trim());
        // test_addresse = ADDRESS_PATTERN.test(fournisseur.addresse.trim());
        // test_ville = CITY_PATTERN.test(fournisseur.ville.trim());
        // test_telephone = NUMBER_PATTERN.test(fournisseur.telephone.trim());
        // test_mobile = MOBILE_PATTERN.test(fournisseur.mobile.trim());
        // test_email = EMAIL_PATTERN.test(fournisseur.email.trim());

        // console.log(fournisseur);
        // console.log(fournisseur.nom.trim());
        // console.log("Nom : " + test_nom);
        // console.log(fournisseur.mobile.trim());
        // console.log("Mobile : " + test_mobile);
        if (
            // test_nom &&
            // test_addresse &&
            // test_ville &&
            // test_telephone &&
            // test_mobile &&
            // test_email
            true
        ) {
            if (isEdit) {
                // Partie "Edition d'un produit"
                axios.put(`${ENDPOINT}/produits/${produit.id}`, produit);
                for (let i = 0; i < produits.length; i++) {
                    let el = produits[i];
                    if (el.id === produit.id) {
                        el = Object.assign({}, produit);
                        break;
                    }
                }
            } else {
                // Partie "Ajout d'un nouveau produit"
                axios.post(`${ENDPOINT}/produits`, produit);
                produits = [...produits, produit];
            }
            produits = produits;
            isVisible = false;
        }
    }

    //*** Checked ***
    /**
     * Fonction qui masque le formulaire flottant
     *
     * Liée au bouton "Retour"
     */
    function cancel() {
        isVisible = false;
        isEdit = false;
        produit = {
            nom: "",
            description: "",
            prix_unnitaire: 0,
            taux_tva: 0.0,
            quantite_stock: 0,
            quantite_alerte: 0,
            quantite_appro: 0,
            code_barre: "|||||||||",
        };
    }

    onMount(async function () {
        const response = await axios.get(`${ENDPOINT}/produits`);
        produits = response.data;
    });
</script>

<!------------------------------------------------------------------------------------------>

<svelte:head>
    <title>Produits</title>
    <link
        rel="shortcut icon"
        href="/img/icons8-product-96.png"
        type="image/x-icon"
    />
    <meta name="description" content="Gestion des produits de l'entreprise" />
</svelte:head>

<!-- Bouton d'ajout de produits -->
<div class="my-row">
    <div id="ajouter-produit">
        <button
            class="btn btn-success"
            style="width: 10vw;"
            on:click|preventDefault={() => {
                (isVisible = true),
                    (isEdit = false),
                    (produit = {
                        nom: "",
                        description: "",
                        prix_unnitaire: 0,
                        taux_tva: 0.0,
                        quantite_stock: 0,
                        quantite_alerte: 0,
                        quantite_appro: 0,
                        code_barre: "|||||||||",
                    });
            }}
        >
            <SvgIcon d={ProductAdd} />
        </button>

        <Table {headers} {items} />
    </div>
</div>

<!-- Formulaire d'ajout de fournisseurs masqué par défaut -->
{#if isVisible}
    <form
        class="row g-3"
        action="#"
        method="post"
        id="form"
        in:fly={{ y: -300, duration: 1000 }}
        out:fly={{ y: 300, duration: 1000 }}
    >
        <div class="col-md-12">
            <label for="nom" class="form-label">Nom</label>
            <input
                type="text"
                name="nom"
                class="form-control"
                id="nom"
                required
                bind:value={produit.nom}
            />
            <!-- {#if !test_nom}
                <div class="invalid-feedback">
                    Veuillez entrez un nom valide
                </div>
            {/if} -->
        </div>
        <div class="col-md-6">
            <label for="pu" class="form-label">Prix Unitaire</label>
            <input
                type="number"
                name="pu"
                id="pu"
                class="form-control"
                required
                bind:value={produit.prix_unitaire}
            />
            <!-- {#if !test_ville}
                <div class="invalid-feedback">
                    Veuillez entrez un nom de ville valide
                </div>
            {/if} -->
        </div>
        <div class="col-md-6">
            <label for="tva" class="form-label">Taux TVA</label>
            <input
                type="text"
                name="tva"
                id="tva"
                class="form-control"
                required
                bind:value={produit.taux_tva}
            />
            <!-- {#if !test_addresse}
                <div class="invalid-feedback">
                    Veuillez entrez une addresse valide
                </div>
            {/if} -->
        </div>
        <div class="col-md-6">
            <label for="stock" class="form-label">Quantité en stock</label>
            <input
                type="text"
                name="stock"
                id="stock"
                class="form-control"
                required
                bind:value={produit.quantite_stock}
                readonly={isEdit ? "" : "readonly"}
                style:background-color={!isEdit ? "rgb(201, 201, 201)" : ""}
            />
            <!-- {#if test_mobile === false}
                <div>Veuillez entrez un numéro mobile valide</div>
            {/if} -->
        </div>
        <div class="col-md-6">
            <label for="alerte" class="form-label">Quantité alerte</label>
            <input
                type="text"
                name="alerte"
                id="alerte"
                class="form-control"
                required
                bind:value={produit.quantite_alerte}
            />
            <!-- {#if !test_telephone}
                <div class="invalid-feedback">
                    Veuillez entrez un numéro de téléphone valide
                </div>
            {/if} -->
        </div>
        <input
            class="col-md-2 offset-2 btn btn-primary"
            type="submit"
            value={isEdit ? "Editer" : "Ajouter"}
            on:click|preventDefault={ajouter}
        />
        <input
            class="col-md-2 offset-4 btn btn-danger"
            type="submit"
            value="Retour"
            on:click|preventDefault={cancel}
        />
    </form>
{/if}

<!-- Liste des produits -->
<h1>Nombre total de produits : {produits.length}</h1>

<table class="table text-center table-hover" style="vertical-align: middle;">
    <thead class="table-dark">
        <tr>
            <th>Nom</th>
            <th>Prix unitaire</th>
            <th>Quantité en stock</th>
            <th>Quantité alerte</th>
            <th>Taux TVA</th>
            <!-- <th>Code barre</th> -->
            <th colspan="2">Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each produits as p (p.id)}
            <tr id={p.id} class:failure={p.quantite_alerte >= p.quantite_stock}>
                <td>{p.nom}</td>
                <td>
                    {new Intl.NumberFormat("fr-FR").format(p.prix_unitaire)} F CFA
                </td>
                <td>{p.quantite_stock}</td>
                <td>{p.quantite_alerte}</td>
                <td>{p.taux_tva}</td>
                <!-- <td>
                    <svg id="barcode"></svg>
                </td> -->
                <td>
                    <button
                        class="btn btn-primary col-12"
                        on:click|preventDefault={() => {
                            isEdit = true;
                            isVisible = true;
                            produit = p;
                        }}
                    >
                        <SvgIcon d={ModeEdit} />
                    </button>
                </td>
                <td>
                    <button
                        class="btn col-12"
                        style="background-color: rgb(219, 106, 0);"
                        on:click|preventDefault={() => {
                            isEdit = true;
                            isVisible = true;
                            produit = p;
                        }}
                    >
                        <SvgIcon d={Details} />
                    </button>
                </td>
            </tr>
        {:else}
            <div class="loader" />
        {/each}
    </tbody>
</table>

<!------------------------------------------------------------------------------------------>
<style>
    /* Titre du tableau d'affichage des fournisseurs */
    h1 {
        text-align: right;
        font-style: italic;
        margin-right: 12px;
        font-weight: bold;
        font-size: 2.3vw;
        color: black;
        font-family: "Rosarivo";
        margin-bottom: 25px;
    }

    /* Formulaire d'ajout ou d'édition de produits */
    form {
        display: flex;
        position: fixed;
        width: 50%;
        top: 25%;
        left: 25%;
        background-color: white;
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
        z-index: 999;
    }

    /* Bouton d'ajout de produits */
    #ajouter-produit {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-align: right;
        margin-right: 20px;
        margin-bottom: 50px;
    }

    .my-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }

    .failure {
        background-color: rgb(255, 176, 176);
        border: 1px solid rgb(255, 176, 176);
    }

    .loader {
        position: fixed;
        bottom: 20%;
        left: 45%;
        width: 90px;
        height: 80px;
        --c: linear-gradient(#007523 0 0);
        background: var(--c) 0% 100%, var(--c) 50% 100%, var(--c) 100% 100%;
        background-size: 18px 100%;
        background-repeat: no-repeat;
        animation: b2 1s infinite linear;
    }
    @keyframes b2 {
        20% {
            background-size: 18px 60%, 18px 100%, 18px 100%;
        }
        40% {
            background-size: 18px 80%, 18px 60%, 18px 100%;
        }
        60% {
            background-size: 18px 100%, 18px 80%, 18px 60%;
        }
        80% {
            background-size: 18px 100%, 18px 100%, 18px 80%;
        }
    }
</style>
