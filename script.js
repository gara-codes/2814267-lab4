async function searchCountry(countryName) {
    
     const spinner = document.getElementById("loading-spinner");
    try {
         // Show loading spinner
           spinner.classList.remove("hidden");
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

    if(!response.ok){
        throw new Error("Could not fetch resource");
    }
    const data = await response.json();
    const country = data[0];
    document.getElementById('country-info').innerHTML = `
    <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital[0]}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <img src="${country.flags.svg}" alt="${country.name.common} flag">
`;

     if (country.borders) {
            const borderContainer = document.getElementById("bordering-countries");
            borderContainer.innerHTML = ""; 

            for (const code of country.borders) {
                const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                const borderData = await borderResponse.json();
                const borderCountry = borderData[0];

                borderContainer.innerHTML += `
                <h2>Neighbouring countries</h2>  
                    <p>${borderCountry.name.common}</p>
                    <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} flag" width="100">
                `;
            }
        } else {
            document.getElementById("borders").innerHTML = "<p>No neighbouring countries</p>";
        }

        
    } catch (error) {
        console.error(error);
    } finally {
        spinner.classList.add("hidden");

    }

}





document.getElementById("search-btn").addEventListener("click", () => {
    const countryName = document.getElementById("country-input").value;
    searchCountry(countryName);


})