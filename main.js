const btn = document.getElementById("submit");

// get covid data from api
const fetchData = async (value) => {
  let response = await fetch(
    `https://covid19.mathdro.id/api/countries/${value}`
  );
  let json = await response.json();
  let data = [];
  data.push(json.confirmed.value);
  data.push(json.deaths.value);
  data.push(json.recovered.value);
  return data;
};

// get value for find country and display results
btn.onclick = async () => {
  let input = document.getElementById("country").value;
  display.innerHTML = '<div class="lds-circle"><div></div></div>';
  let response = await fetchData(input);
  console.log(response);
  if (response.length === 0) {
    display.innerHTML = `<h2 class="text-center">Please, Enter the country correctly</h2>`;
  } else {
    display.innerHTML = `
    <h2 class="text-center">Covid-19 data</h2>
        <div class="row shadow rounded my-5">
        <div class="col p-3 border  d-flex justify-content-center align-items-center flex-column">
            <h4 class="text-warning">Confirmed</h4>

            <h5 id="confrimed">${response[0]}</h5>
        </div>

        <div class="col p-3 border  d-flex justify-content-center align-items-center flex-column">
            <h4 class="text-danger">Deaths</h4>

            <h5 id="deaths">${response[1]}</h5>
        </div>
    </div>
    
    <h5 class="text-center" > Search for <i> covid data ${input}</i> from google to check :) </h5>
    `;
  }
};
