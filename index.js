// api key and search endpoint

const apiKey = "1kIVDpLVwbJX2KrkzDq8XaCxdgjPgtgoZjfsKz92";
const parkEndpoint = "https://developer.nps.gov/api/v1/parks";


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function displayResults(responseJson) {
    console.log(responseJson);
    $("#search-results").empty();
    console.log($("#search-results"));

    for (let i = 0; i < responseJson.data.length; i++) {
        console.log(responseJson.data[i]);
        $("#search-results").append(
            `<li>
            <h2>${responseJson.data[i].fullName}</h2>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
            </li>`);
    }
    $("#search-results").removeClass("hidden");
}

function getParks(searchTerm, maxResults = 10) {

    const params = {
        stateCode: searchTerm,
        limit: maxResults,
        api_key: apiKey
    };

    let queryString = formatQueryParams(params);
    console.log("query done did it", queryString);
    const url = parkEndpoint + "?" + queryString;

    console.log("this ur url", url);

    fetch(url).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(responseJson => displayResults(responseJson))
        .catch(err => {
            $("#js-error-message").text(`Something failed: ${err.message}`);
        })
}


// watch the form submit button

function watchForm() {
    $("form").submit(event => {
        event.preventDefault();
        const searchTerm = $(".js-search-value").val();
        const maxResults = $(".js-result-num").val();
        getParks(searchTerm, maxResults);

    });

}



$(watchForm);