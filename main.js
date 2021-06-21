const input = document.getElementById('country');
      form = document.getElementById('form')
      display = document.getElementById('display')

// get covid data from api
fetchData = (value) => {
    let resp = []
    fetch(`https://covid19.mathdro.id/api/countries/${value}`)
        .then(res => res.json())
        .then(data => {
            resp.push(data.confirmed.value)
            resp.push(data.deaths.value)
            resp.push(data.recovered.value)
        })
        .catch(err => console.log(err))

    return resp
}

// get value for find country and display results
form.addEventListener('submit', (e) => {
    e.preventDefault()
    display.innerHTML = '<div class="lds-circle"><div></div></div>'
    let value = input.value;
    let response = fetchData(value)
    console.log(response)

    
    setTimeout(() => {
        if(response.length === 0 ){
                display.innerHTML = `<h2 class="text-center">Please, Enter the state correctly</h2>`
            } 
        else{
            display.innerHTML = `<h2 class="text-center">Covid-19 data</h2>
            <div class="row shadow rounded my-5">
            <div class="col p-3 border  d-flex justify-content-center align-items-center flex-column">
                <h4 class="text-warning">Confirmed</h4>
    
                <h5 id="confrimed">${response[0]}</h5>
            </div>
            <div class="col p-3 border d-flex justify-content-center align-items-center flex-column">
                <h4 class="text-success">Recovered</h4>
    
                <h5 id="recovered">${response[2]}</h5>
            </div>
    
            <div class="col p-3 border  d-flex justify-content-center align-items-center flex-column">
                <h4 class="text-danger">Deaths</h4>
    
                <h5 id="deaths">${response[1]}</h5>
            </div>
            </div>`}
        }, 2000);
})
