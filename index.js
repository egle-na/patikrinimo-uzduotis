const tableLabels = {
    "countries" : `
        <tr class="table-label">
            <th><div>Pavadinimas<div class="order-arr"><i class="fas fa-chevron-up"></i><i class="fas fa-chevron-down"></i></div></div></th>
            <th>Užimamas Plotas</th>
            <th>Gyventojų Skaičius</th>
            <th>Šalies Tel. Kodas</th>
            <th>Veiksmai</th>
        </tr>`,
    "cities" : `
        <tr class="table-label">
            <th><div>Pavadinimas<div class="order-arr"><i class="fas fa-chevron-up"></i><i class="fas fa-chevron-down"></i></div></div></th>
            <th>Užimamas Plotas</th>
            <th>Gyventojų Skaičius</th>
            <th>Miesto Pašto Kodas</th>
            <th>Veiksmai</th>
        </tr>`
};

const actions = function(id) {
    return `
    <p data-delete="${id}"><svg class="btn delete-btn" data-delete="${id}" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>ištrinti įrašą</title>
        <path d="M18.1806 1.88441H12.8052V0.935742C12.8052 0.419766 12.386 0 11.8708 0H8.12922C7.61399 0 7.19485 0.419766 7.19485 0.935742V1.88438H1.81942C1.55946 1.88438 1.34875 2.09508 1.34875 2.35504C1.34875 2.615 1.55946 2.8257 1.81942 2.8257H2.69176L3.28661 18.3099C3.32301 19.2576 4.09446 20 5.04293 20H14.9571C15.9056 20 16.6771 19.2576 16.7134 18.3099L17.3082 2.82566H18.1806C18.4405 2.82566 18.6512 2.61496 18.6512 2.355C18.6512 2.09512 18.4405 1.88441 18.1806 1.88441ZM8.13614 0.941289H11.8639V1.88438H8.13614V0.941289ZM15.7728 18.2738C15.7559 18.7139 15.3976 19.0587 14.9571 19.0587H5.04293C4.60246 19.0587 4.24418 18.7139 4.22723 18.2738L3.63379 2.8257H16.3663L15.7728 18.2738Z" fill="#969696"/>
        <path d="M7.134 7.09258C7.12904 6.83575 6.91939 6.63098 6.66361 6.63098C6.66056 6.63098 6.65744 6.63098 6.65439 6.63106C6.39455 6.63606 6.18787 6.85083 6.19287 7.11067L6.34056 14.7917C6.34549 15.0485 6.55521 15.2533 6.81095 15.2533C6.814 15.2533 6.81713 15.2533 6.82017 15.2532C7.08006 15.2482 7.2867 15.0335 7.2817 14.7736L7.134 7.09258Z" fill="#969696"/>
        <path d="M9.99993 6.63098C9.74001 6.63098 9.52927 6.84168 9.52927 7.10165V14.7827C9.52927 15.0426 9.73997 15.2533 9.99993 15.2533C10.2599 15.2533 10.4706 15.0426 10.4706 14.7827V7.10165C10.4706 6.84172 10.2599 6.63098 9.99993 6.63098Z" fill="#969696"/>
        <path d="M13.3455 6.6311C13.0866 6.62536 12.8709 6.83274 12.8659 7.09262L12.7182 14.7736C12.7132 15.0335 12.9198 15.2482 13.1797 15.2532C13.1828 15.2533 13.1859 15.2533 13.1889 15.2533C13.4446 15.2533 13.6544 15.0485 13.6593 14.7917L13.807 7.11071C13.812 6.85079 13.6054 6.63606 13.3455 6.6311Z" fill="#969696"/>
    </svg></p>
    <span class="line"></span>
    <p data-edit="${id}"><svg class="btn edit-btn" data-edit="${id}" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Redaguoti įrašą</title>
        <path d="M19.3026 1.8986C18.1044 0.700466 16.1618 0.700466 14.9635 1.8986L2.79947 14.0616C2.71611 14.1449 2.65592 14.2483 2.62449 14.3617L1.02488 20.1361C0.959095 20.3729 1.02595 20.6264 1.1996 20.8003C1.37351 20.9739 1.62706 21.0408 1.86384 20.9753L7.63878 19.3755C7.75223 19.3441 7.85557 19.2839 7.93893 19.2006L20.1027 7.03734C21.2991 5.83841 21.2991 3.89753 20.1027 2.6986L19.3026 1.8986ZM4.28509 14.5047L14.2404 4.55L17.4511 7.76038L7.49549 17.7151L4.28509 14.5047ZM3.64375 15.7915L6.20882 18.3566L2.66071 19.3396L3.64375 15.7915ZM19.1386 6.0733L18.4155 6.79633L15.2046 3.58568L15.9279 2.86265C16.5935 2.19714 17.6727 2.19714 18.3382 2.86265L19.1386 3.66265C19.8031 4.32896 19.8031 5.40725 19.1386 6.0733Z" fill="#969696" stroke="white" stroke-width="0.5"/>
    </svg></p>
`;
}

const headerText = document.querySelector("h1");
const countriesTable = document.querySelector(".countries");

let allDataInPage;

let countryId = "";
let originalApi;

let numberOfPages = 1;
let currentPage = 1;

let order = "";
let search = "";
let filter = "";

const searchBar = document.querySelector("#searchbar");
const filterDate = document.querySelector("#data-filter");

const addItemBtn = document.querySelector(".add-item-btn");
const createCloseBtn = document.querySelector(".create-new-close-btn");
const createCard = document.querySelector(".create-new");
const cardTitle = document.querySelector("#card-title")

const addItemForm = document.querySelector(".add-item-form");
// const countrySelect = document.querySelector("#country-select");

const messageField = document.querySelector(".message");
const pageDis = document.querySelector(".page-numbers");
const pageList = document.getElementById("page-list");

// get data and draw table
const loadPage = function() {
    getData()
        .then(drawTable)
        .then(countPageNums)
        .then(drawPageNums)
}

// ------- Data Functions
const getData = function() {
    let jsonName = title;
    const url = constructUrl(currentPage);

    if (title === "countries") {
        jsonName = "countires";
    }
    if(countryId){
        return fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                allDataInPage = json
            })
    } else {
        return fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                allDataInPage = json[jsonName]
            })
    }
}

// create url with conditions
const constructUrl = function (pages) {
    const constrUrl = new URL(api)

    constrUrl.searchParams.append("page", pages.toString())
    if (order) {
        constrUrl.searchParams.append("order", order);
    }
    if (search) {
        constrUrl.searchParams.append("text", search);
    }
    if (filter) {
        constrUrl.searchParams.append("date", filter)
    }
    return constrUrl.href ;
}

// get item with id
const getItem = function (id) {
    for (let i = 0; i < allDataInPage.length; i++){
        if(allDataInPage[i].id === parseInt(id)){
            return allDataInPage[i];
        }
    }
    return {};
}

// get search values
const getSearch = function () {
    search = searchBar.value;
    currentPage = 1;
    loadPage();
}

// get filter values
const getFilter = function () {
    filter = filterDate.value;
    currentPage = 1;
    loadPage();
}

// get data about the country
const getCityDataFromURL = function() {
    const readUrl = window.location.search;
    const urlParams = new URLSearchParams(readUrl);

    countryId = urlParams.get("country-id");
    const countryName = urlParams.get("country-name");

    if(countryName){
        headerText.textContent = countryName;
    }
}

// count how many pages with data are available
const countPageNums = function () {
    const url = constructUrl(numberOfPages);

    if (countryId) {
        fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                const numberOfItems = json.length;
                if (numberOfItems !== 0) {
                    numberOfPages++;
                    countPageNums();
                } else {
                    numberOfPages--;
                    drawPageNums();
                }
            })
    } else {
        fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                const numberOfItems = json["count"];
                if (numberOfItems !== 0) {
                    numberOfPages++;
                    countPageNums();
                } else {
                    numberOfPages--;
                    drawPageNums();
                }
            })
    }
}

// draw pages display
const drawPageNums = function () {
    pageList.innerHTML = "";
    if(numberOfPages > 1){
        pageList.parentElement.classList.remove("disabled");
        for (let i = 1; i <= numberOfPages; i++) {
            if(i === parseInt(currentPage)){
                pageList.innerHTML += `<li data-page="${i}" class="current-page">${i}</li>`
            } else {
                pageList.innerHTML += `<li data-page="${i}">${i}</li>`
            }
        }
    } else {
        pageList.parentElement.classList.add("disabled");

    }
}

// ------- Event Functions

// open - item Card
const openCard = function(id) {
    if(title === "cities") {
        if(id) {
            cardTitle.textContent = "Redaguoti miestą"
        } else {
            cardTitle.textContent = "Pridėti miestą"
        }
    } else {
        if(id) {
            cardTitle.textContent = "Redaguoti šalį"
        } else {
            cardTitle.textContent = "Pridėti šalį"
        }
    }
    createCard.classList.remove("disabled");
    addItemForm["name"].focus();

    if(id) {
        const item = getItem(id);
        addItemForm["name"].value = item.name;
        addItemForm["area"].value = item.area;
        addItemForm["population"].value = item.population;
        addItemForm["id"].value = id;

        if(title === "cities"){
            addItemForm["postcode"].value = item.postcode;
            addItemForm["country_id"].value = item.country_id;

        } else {
            addItemForm["calling_code"].value = item.calling_code;
        }
    }
    else if(title === "cities") {
        addItemForm["country_id"].value = countryId;
    }
}

// close - item card
const closeItemCard = function() {
    createCard.classList.add("disabled");
    clearForm();
}

// empty - item card
const clearForm = function () {
    addItemForm.reset();
    addItemForm["id"].value = "";
    if(addItemForm["country_id"]){
        addItemForm["country_id"].value = "";
    }
}

// draw table
const drawTable = function (data) {
    if (!data) {
        data = allDataInPage;
    }
    let table = tableLabels[title];
    for (let i = 0; i < data.length; i++) {
        if(title === "countries") {
            table += `
                <tr data-id="${data[i].id}">
                    <td><a href="cities.html?country-id=${data[i].id}&country-name=${data[i].name}">${data[i].name}</a></td>
                    <td>${data[i].area}</td>
                    <td>${data[i].population}</td>
                    <td>${data[i].calling_code}</td>
                    <td class="actions">${actions(data[i].id)}</td>
                </tr>`
        } else { // if all cities
            table += `
                <tr data-id="${data[i].id}">
                    <td>${data[i].name}</td>
                    <td>${data[i].area}</td>
                    <td>${data[i].population}</td>
                    <td>${data[i].postcode}</td>
                    <td class="actions">${actions(data[i].id)}</td>
                </tr>`
            }
        }
    countriesTable.innerHTML = table;
}

// click on table
const interactTable = function(e) {
    if (e.target.getAttribute("data-delete")) {
        deleteItem(e.target.getAttribute("data-delete"));

    } else if (e.target.getAttribute("data-edit")) {
        openCard(e.target.getAttribute("data-edit"))

    } else if (e.target.classList.contains("fa-chevron-up")) {
        order = "desc";
        currentPage = 1;
        loadPage();

    } else if (e.target.classList.contains("fa-chevron-down")) {
        order = "asc";
        currentPage = 1;
        loadPage();
    }
}

// click on page numbers
const interactPageNums = function(e) {
    if (e.target.getAttribute("data-page")) {
        currentPage = parseInt(e.target.getAttribute("data-page"));
        loadPage();

    } else if (e.target.classList.contains("fa-chevron-left")) {
        if(currentPage !== 1){
            currentPage--;
            loadPage();
        }
    } else if (e.target.classList.contains("fa-chevron-right")) {
        if(currentPage !== numberOfPages) {
            currentPage++;
            loadPage();
        }
    }
}

// delete item from the table
const deleteItem = function (id){
    let url = api + `/${id}`;
    if (countryId) {
        url = originalApi + `/${id}`;
    }

    fetch(url,{ method: 'DELETE' })
        .then(response => response.json())
        .then(json => printMessage(json))
        .then(loadPage)
}

// add or update item
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    let url = api;
    if(countryId) {
        url = originalApi;
    }

    try {
        const formData = new FormData(form);
        const id = formData.get("id");
        formData.delete("id")

        if(!id){
            fetch(url, {
                method:"POST",
                body: formData
            })
                .then( response => response.json())
                .then(json => {
                    printMessage(json);
                    loadPage();
                    clearForm();
                    closeItemCard();
                })
        } else {
            url = url + "/" + id;
            const constrUrl = new URL(url);
            constrUrl.searchParams.append("name", formData.get("name").toString())
            constrUrl.searchParams.append("area", formData.get("area").toString())
            constrUrl.searchParams.append("population", formData.get("population").toString())
            if (title === "cities") {
                constrUrl.searchParams.append("postcode", formData.get("postcode").toString())
                constrUrl.searchParams.append("country_id", formData.get("country_id").toString())
            } else {
                constrUrl.searchParams.append("calling_code", formData.get("calling_code").toString())
            }

            fetch(constrUrl.href, {
                method:"PUT",
                // headers: {'Content-type' : 'application/json'},
                // body: JSON.stringify(formData)
            })
                .then( response => response.json())
                .then(json => {
                    printMessage(json);
                    loadPage();
                    clearForm();
                    closeItemCard();
                })
        }
    } catch (error) {
        console.error(error);
    }
}

// print message
const printMessage = function (json) {
    messageField.classList.remove("disabled");
    setTimeout(function() {messageField.classList.add("disabled")}, 5000);

    if(json.message) {
        if (json.message === "Country added successfully"){
            messageField.innerHTML = `<p>Šalis pridėta sėkmingai!</p>`;
        } else if (json.message === "Country updated successfully"){
            messageField.innerHTML = `<p>Šalis redaguota sėkmingai!</p>`;
        } else if (json.message === "Country deleted successfully"){
            messageField.innerHTML = `<p>Šalis sėkmingai ištrinta!</p>`;
        } else if (json.message === "City added successfully"){
            messageField.innerHTML = `<p>Miestas pridėtas sėkmingai!</p>`;
        } else if (json.message === "City updated successfully"){
            messageField.innerHTML = `<p>Miestas redaguotas sėkmingai!</p>`;
        } else if (json.message === "City deleted successfully"){
            messageField.innerHTML = `<p>Miestas sėkmingai ištrintas!</p>`;
        } else {
            messageField.innerHTML = `<p>${json.message}!</p>`;
        }
    } else {
        messageField.innerHTML = `<!--<p class="error">Something went wrong. Please try again.</p>-->`;
        messageField.innerHTML = `<p class="error">Kažkas nepavyko. Pabandykite dar kartą.</p>`;
    }
}

// ------- Event Listeners

// open - create new item card
addItemBtn.addEventListener("click", () => openCard() );

// close - create new item card
createCloseBtn.addEventListener("click", closeItemCard);

// submit add new / update item
addItemForm.addEventListener("submit", handleFormSubmit);

// type in search
searchBar.addEventListener("input", getSearch);

// select filter date
filterDate.addEventListener("input", getFilter);

// table interactions
countriesTable.addEventListener("click", interactTable );

// page numbers interactions
pageDis.addEventListener("click", interactPageNums);

// ------- Do on load
if(title === "cities") {
    getCityDataFromURL();
    if (countryId) {
        originalApi = api;
        api = api + "/" + countryId;
    }
    loadPage();
} else {
    loadPage();
}