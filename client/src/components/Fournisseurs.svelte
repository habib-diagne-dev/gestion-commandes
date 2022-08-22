<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import NavBar from "./NavBar.svelte";
    import SvgIcon from "./icons/SVGIcon.svelte";
    import {
        Email,
        ModeEdit,
        PersonAdd,
        PersonDelete,
        Telephone,
        Unlock,
    } from "./icons/Icons";

    const SERVER = "localhost";
    const PORT = 4000;
    const ENDPOINT = `http://${SERVER}:${PORT}`;

    //Expression régulière pour la validation d'emails
    const EMAIL_PATTERN =
        /^[a-zA-Z]+[a-zA-Z0-9]{2,}@[a-zA-Z][a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}$/gim;

    //Expression régulière pour la validation de numéros de téléphones Sénégalais
    const NUMBER_PATTERN = /^33 (?=(\d{3} \d{2} \d{2}))/gim;
    //Expression régulière pour la validation de numéros mobiles de téléphones Sénégalais
    const MOBILE_PATTERN = /^(70|76|77|78)(?=( \d{3} \d{2} \d{2}))/gim;

    //Expression régulière pour la validation de noms de personnes
    const NAME_PATTERN =
        /^[a-zA-Z]{2,}\s?[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ]*\s?[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ]*\s?[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ]+$/giu;

    //Expression régulière pour la validation de noms de villes
    const CITY_PATTERN =
        /^[a-zA-Z]{2,}\s?[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ,.'-]*\s?[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ,.'-]*\s?[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ]+$/giu;

    //Expression régulière pour la validation d'addresses
    const ADDRESS_PATTERN =
        /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ]{3,}[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*$/giu;

    //Variables de test pour vérifier si le format des champs est valide
    let test_nom = true;
    let test_addresse = true;
    let test_ville = true;
    let test_telephone = true;
    let test_mobile = true;
    let test_email = true;

    //Variable qui définit la visibilité du formulaire flottant d'ajout de nouveaux fournisseurs
    let isVisible = false;

    //Variable qui définit si le formulaire flottant sera utilisé pour l'ajout ou bien l'édition d'un fournisseur
    let isEdit = true;

    //Variable de listes de choix pour le type d'affichage des fournisseurs
    let choices = [
        { id: 1, value: "Tous les fournisseurs" },
        { id: 2, value: "Fournisseurs actifs" },
        { id: 3, value: "Fournisseurs inactifs" },
    ];

    //Variable qui reçoit la valeur de l'option sélectionné du "select" d'affichage de fournisseurs et définit le type de fournisseurs sélectionné
    let selected;

    //Variable qui reçoit le type de fourniseurs affichés suivant la valeur de "selected"
    let fournisseurs_selectionnes = [];
    let fournisseurs = [];
    let fournisseurs_actifs = [];
    let fournisseurs_inactifs = [];

    //Variable lié au formulaire flottant d'ajout ou d'édition de fournisseur
    let fournisseur = {
        id: null,
        nom: "",
        addresse: "",
        ville: "",
        telephone: "",
        mobile: "",
        email: "",
        actif: 1,
    };

    //*** Not Yet ***
    /**
     * Fonction qui permet d'ajouter un nouveau fournisseur à l'entreprise
     *
     * Liée au bouton "Ajouter" du formulaire d'ajout de fournisseurs
     */
    function ajouter() {
        test_nom = NAME_PATTERN.test(fournisseur.nom.trim());
        test_addresse = ADDRESS_PATTERN.test(fournisseur.addresse.trim());
        test_ville = CITY_PATTERN.test(fournisseur.ville.trim());
        test_telephone = NUMBER_PATTERN.test(fournisseur.telephone.trim());
        test_mobile = MOBILE_PATTERN.test(fournisseur.mobile.trim());
        test_email = EMAIL_PATTERN.test(fournisseur.email.trim());

        console.log(fournisseur);
        console.log(fournisseur.nom.trim());
        console.log("Nom : " + test_nom);
        console.log(fournisseur.mobile.trim());
        console.log("Mobile : " + test_mobile);
        if (
            test_nom &&
            test_addresse &&
            test_ville &&
            test_telephone &&
            test_mobile &&
            test_email
        ) {
            if (isEdit) {
                //Partie "Edition d'un fournisseur"
                axios.put(
                    `${ENDPOINT}/fournisseurs/${fournisseur.id}`,
                    fournisseur
                );
                for (let i = 0; i < fournisseurs.length; i++) {
                    let el = fournisseurs[i];
                    if (el.id === fournisseur.id) {
                        el = Object.assign({}, fournisseur);
                        break;
                    }
                }
            } else {
                //Partie "Ajout d'un nouveau fournisseur"
                axios.post(`${ENDPOINT}/fournisseurs`, fournisseur);
                fournisseurs = [...fournisseurs, fournisseur];
            }

            fournisseurs_selectionnes = fournisseurs;
            fournisseurs_actifs = fournisseurs.filter(
                (fournisseur) => fournisseur.actif === 1
            );
            fournisseurs_inactifs = fournisseurs.filter(
                (fournisseur) => fournisseur.actif === 0
            );
            isVisible = false;
        }
    }

    //*** Checked ***
    /**
     * Fonction qui permet de définir un fournisseur comme étant inactif à l'entreprise
     *
     * Liée au bouton SVG "PersonDelete" de la liste des fournisseurs de l'entreprise
     * @param id
     */
    function desactiver(id) {
        axios.put(`${ENDPOINT}/fournisseurs/lock/${id}`);
        document.getElementById(id + "").style.display = "none";

        let test = fournisseurs_actifs.filter((f) => f.id === id)[0];
        test.actif = 0;
        fournisseurs_inactifs = [...fournisseurs_inactifs, test];
        fournisseurs_actifs = fournisseurs.filter((f) => f.actif === 1);
    }

    //*** Checked ***
    /**
     * Fonction qui permet de définir un fournisseur comme étant inactif à l'entreprise
     *
     * Liée au bouton SVG "PersonDelete" de la liste des fournisseurs de l'entreprise
     * @param id
     */
    function activer(id) {
        axios.put(`${ENDPOINT}/fournisseurs/unlock/${id}`);
        document.getElementById(id + "").style.display = "none";

        let test = fournisseurs_inactifs.filter((f) => f.id === id)[0];
        test.actif = 1;
        fournisseurs_actifs = [...fournisseurs_actifs, test];
        fournisseurs_inactifs = fournisseurs.filter((f) => f.actif === 0);
    }

    //*** Checked ***
    /**
     * Fonction qui définit
     *
     * Liée au bouton "Retour"
     */
    function cancel() {
        isVisible = false;
        isEdit = false;
        fournisseur = {
            nom: "",
            addresse: "",
            ville: "",
            telephone: "",
            mobile: "",
            email: "",
            actif: 1,
        };
    }

    //*** Checked ***
    /**
     * Fonction qui définit si tous les fournisseurs, les fournisseurs actifs ou bien les fournisseurs
     * inactifs seront affichés
     *
     * Liée au bouton "select"
     */
    function change() {
        switch (selected) {
            case 2:
                fournisseurs_selectionnes = fournisseurs_actifs;
                break;
            case 3:
                fournisseurs_selectionnes = fournisseurs_inactifs;
                break;
            default:
                fournisseurs_selectionnes = fournisseurs;
                break;
        }
    }

    onMount(async function () {
        const response = await axios.get(`${ENDPOINT}/fournisseurs`);

        fournisseurs = response.data;
        fournisseurs_selectionnes = fournisseurs;
        fournisseurs_actifs = fournisseurs.filter(
            (fournisseur) => fournisseur.actif === 1
        );
        fournisseurs_inactifs = fournisseurs.filter(
            (fournisseur) => fournisseur.actif === 0
        );
    });
</script>

<!------------------------------------------------------------------------------------------>

<svelte:head>
    <title>Fournisseurs</title>
    <link
        rel="shortcut icon"
        href="/img/icons8-supplier-96.png"
        type="image/x-icon"
    />
</svelte:head>

<!-- Liste déroulante et bouton d'ajout de fournisseurs -->
<div class="my-row">
    <select
        class="form-select text-center"
        style="height: 50%; margin-left: 25px; width: 15%"
        bind:value={selected}
        on:change={change}
    >
        {#each choices as choice (choice.id)}
            <option value={choice.id}>{choice.value}</option>
        {/each}
    </select>

    <div id="ajouter-fournisseur">
        <button
            class="btn btn-success"
            style="width: 10vw;"
            on:click|preventDefault={() => {
                (isVisible = true),
                    (isEdit = false),
                    (fournisseur = {
                        nom: "",
                        addresse: "",
                        ville: "",
                        telephone: "",
                        mobile: "",
                        email: "",
                        actif: 1,
                    });
            }}
        >
            <SvgIcon d={PersonAdd} />
        </button>
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
                bind:value={fournisseur.nom}
            />
            {#if !test_nom}
                <div class="invalid-feedback">
                    Veuillez entrez un nom valide
                </div>
            {/if}
        </div>
        <div class="col-md-6">
            <label for="ville" class="form-label">Ville</label>
            <input
                type="text"
                name="ville"
                id="ville"
                class="form-control"
                required
                bind:value={fournisseur.ville}
            />
            {#if !test_ville}
                <div class="invalid-feedback">
                    Veuillez entrez un nom de ville valide
                </div>
            {/if}
        </div>
        <div class="col-md-6">
            <label for="addresse" class="form-label">Addresse</label>
            <input
                type="text"
                name="addresse"
                id="addresse"
                class="form-control"
                required
                bind:value={fournisseur.addresse}
            />
            {#if !test_addresse}
                <div class="invalid-feedback">
                    Veuillez entrez une addresse valide
                </div>
            {/if}
        </div>
        <div class="col-md-6">
            <label for="mobile" class="form-label">Mobile</label>
            <input
                type="text"
                name="mobile"
                id="mobile"
                class="form-control"
                required
                class:failure={test_mobile === false}
                bind:value={fournisseur.mobile}
            />
            {#if test_mobile === false}
                <div>Veuillez entrez un numéro mobile valide</div>
            {/if}
        </div>
        <div class="col-md-6">
            <label for="tel" class="form-label">Téléphone</label>
            <input
                type="text"
                name="tel"
                id="tel"
                class="form-control"
                required
                bind:value={fournisseur.telephone}
            />
            {#if !test_telephone}
                <div class="invalid-feedback">
                    Veuillez entrez un numéro de téléphone valide
                </div>
            {/if}
        </div>
        <div class="col-md-12">
            <label for="email" class="form-label">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                class="form-control"
                required
                bind:value={fournisseur.email}
            />
            {#if !test_mobile}
                <div class="invalid-feedback">
                    Veuillez entrez une addresse email valide
                </div>
            {/if}
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

<!-- Liste des fournisseurs de l'entreprise -->
<h1>
    Nombre total des fournisseurs {selected === 1
        ? "de l'entreprise"
        : selected === 2
        ? "actifs"
        : "inactifs"}: {fournisseurs_selectionnes.length}
</h1>

<table class="table text-center table-hover" style="vertical-align: middle;">
    <thead class="table-dark">
        <tr>
            <th>Nom</th>
            <th>Addresse</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th colspan="2">Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each fournisseurs_selectionnes as f (f.id)}
            <tr
                id={f.id}
                class={selected === 1
                    ? f.actif === 1
                        ? "success"
                        : "failure"
                    : ""}
            >
                <td>{f.nom}</td>
                <td>{f.ville}, {f.addresse}</td>
                <td>
                    <SvgIcon d={Telephone} fill="green" viewBox="-2 -2 26 26" />
                    {f.telephone} - {f.mobile}
                </td>
                <td style="text-align: left; margin-left: 12px;">
                    <SvgIcon d={Email} fill="brown" viewBox="-2 -2 26 26" />
                    {f.email}
                </td>
                <td>
                    <button
                        class="btn btn-primary col-12"
                        on:click|preventDefault={() => {
                            isEdit = true;
                            isVisible = true;
                            fournisseur = f;
                        }}
                    >
                        <SvgIcon d={ModeEdit} />
                    </button>
                </td>
                <td>
                    {#if selected !== 1}
                        <button
                            class="btn btn-danger col-12"
                            on:click|preventDefault={selected === 2
                                ? desactiver(f.id)
                                : activer(f.id)}
                            on:click={change}
                        >
                            <SvgIcon
                                d={selected === 2 ? PersonDelete : Unlock}
                                viewBox={selected === 2
                                    ? "0 0 16 16"
                                    : "-5 0 30 30"}
                            />
                        </button>
                    {/if}
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

    form {
        display: flex;
        position: fixed;
        width: 50%;
        top: 15%;
        left: 25%;
        background-color: white;
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
        z-index: 999;
    }

    #ajouter-fournisseur {
        text-align: right;
        margin-right: 20px;
        margin-bottom: 50px;
    }

    .success {
        background-color: rgb(190, 255, 190);
        border: 1px solid rgb(190, 255, 190);
    }

    .failure {
        background-color: rgb(255, 176, 176);
        border: 1px solid rgb(255, 176, 176);
    }

    .my-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
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
