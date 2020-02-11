const BASE_URL = "http://localhost:3000"
const DESTINATIONS_URL = `${BASE_URL}/destinations`
const DESTINATION_URL = `${BASE_URL}/destination/`
const ATTRACTIONS_URL = `${BASE_URL}/attractions`

document.addEventListener("DOMContentLoaded", ()=>{
  getDestinations();
})

function getDestinations() {

  fetch(DESTINATIONS_URL)
  .then((response) => response.json())
  .then((data) => {
      
  //loop thru trips (destination with it's attractions)
      let destListDiv = document.querySelector(".dest-list ul");
      destListDiv.innerHTML = ''
      data.forEach(dest => {
        let newDest = new Destination(dest);
        //console.log(newDest);
        newDest.renderDest();
        });
      
  })
}


// function clearDestinationForm(){
//   let destListDiv = document.getElementById("dest-list ul")
// }

function displayCreateDestinationForm() {

}

function displayCreateAttractionForm() {
  
}

class Destination {
  constructor(dest) {
    this.id = dest.id
    this.name = dest.name
    this.country = dest.country
    this.language = dest.language
    this.currency = dest.currency
  }

  renderDest() {

    let ul = document.querySelector(".dest-list ul");
    let li = document.createElement('li');
    li.innerHTML = this.name;
    li.innerHTML += ` (${this.country}) `;
    let show_btn = document.createElement("button");
    show_btn.setAttribute("data-destination-id", this.id);
    show_btn.setAttribute('class', 'show');
    show_btn.innerText = "View Destination"
    show_btn.addEventListener('click', (e) => {
      
      viewDestination(e)
    });
    li.append(show_btn)
    console.log(li.innerHTML);
    ul.appendChild(li);
  }
}

function viewDestination(event){
  event.preventDefault();
  let id = this.dataset.destinationId
  let dst_details = document.querySelector(".dest-details");
  dst_details.innerHTML = ""

  showURL = DESTINATION_URL + `${id}`;
  fetch(showURL)
  .then((response) => response.json())
  .then((data) => {
      
  //loop thru trips (destination with it's attractions)
    dst_details.innerHTML = "name country language currency from data"
      let attrListDiv = document.querySelector(".attr-list ul");
      attrListDiv.innerHTML = ''
      data.forEach(dest => {
        let newDest = new Destination(dest);
        //console.log(newDest);
        newDest.renderDest();
        });
      
  })


  dst_details.innerHTML = event.target
  let ul = document.querySelector(".attr-list ul");
    // let li = document.createElement('li');
    // li.innerHTML = this.name;
    // li.innerHTML += ` (${this.country}) `;
    // let show_btn = document.createElement("button");
    // show_btn.setAttribute("data-destination-id", this.id);
    // show_btn.setAttribute('class', 'show');
    // show_btn.innerText = "View Destination"
    // show_btn.addEventListener('click', (e) => {
      
    //   viewDestination(e)
    // });
    // li.append(show_btn)
    // ul.appendChild(li);
  
}