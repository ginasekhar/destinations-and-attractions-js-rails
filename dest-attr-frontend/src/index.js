const BASE_URL = "http://localhost:3000"
const DESTINATIONS_URL = `${BASE_URL}/destinations`

const ATTRACTIONS_URL = `${BASE_URL}/attractions`

document.addEventListener("DOMContentLoaded", ()=>{
  getDestinations();
  // let addDestBtn = document.getElementById("add-dest-btn");
  // addDestBtn.addEventListener('click', () => {
  //   displayCreateDestinationForm(e)
  // });
})

function getDestinations() {

  fetch(DESTINATIONS_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Could not fetch data');
    }
  })
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
  .catch((error) => {
    console.log(error)
  }); 
}

// function clearDestinationForm(){
//   let destListDiv = document.getElementById("dest-list ul")
// }

function displayCreateDestinationForm() {
  let frm = document.getElementById("dest-form");

  // now make form visible
  frm.style.visibility="visible";
  console.log("fillout form now")

  //after all the processing clear form make the form disappear
  //x.style.visibility="hidden";
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
    show_btn.setAttribute('class', 'show-dest');
    show_btn.innerText = "Details"
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
  let dst_details = document.querySelector(".dest-details p");

  dst_details.innerHTML = ""

  let id = event.target.dataset["destinationId"]

  showURL = DESTINATIONS_URL + `/${id}`;
  fetch(showURL)
  .then((response) => response.json())
  .then( (data) => {
    let dest = new Destination(data)
  
    dst_details.innerHTML = 
      `<strong>Destination:</strong> ${dest.name} (${dest.country}) <strong>Currency:</strong> ${dest.currency}      <strong>Language:</strong> ${dest.language} <hr> <center><strong> Attractions </strong> </center>`;
      let add_btn = document.createElement("button");
          add_btn.setAttribute("data-destination-id", id);
          add_btn.setAttribute('class', 'add-attr');
          add_btn.innerText = "Add Attraction"
          add_btn.addEventListener('click', (e) => {
            addAttraction(e)
          });
          dst_details.append(add_btn);

    let attrListDiv = document.querySelector(".attr-list ul");
    //let attrListDiv = document.querySelector(".dest-details > ul");
    attrListDiv.innerHTML = ''
    if (data["attractions"].length > 0) {
      data["attractions"].forEach(attr => {
        //let newAttr = new Attraction(attr);
          let li = document.createElement('li');
          li.innerHTML = `<hr>${attr.name} Category:${attr.category} Reservation: ${attr.reservations_required} ? "Required" : "Not Required" Entry Fee : USD $${attr.cost} <br>`;
          let del_btn = document.createElement("button");
          del_btn.setAttribute("data-attraction-id", attr.id);
          del_btn.setAttribute('class', 'delete-attr');
          del_btn.innerText = "Delete"
          del_btn.addEventListener('click', (e) => {
            deleteAttraction(e)
          });
          li.append(del_btn);
          let edt_btn = document.createElement("button");
          edt_btn.setAttribute("data-attraction-id", attr.id);
          edt_btn.setAttribute('class', 'edt-attr');
          edt_btn.innerText = "Edit"
          edt_btn.addEventListener('click', (e) => {
            editAttraction(e)
          });
          li.append(edt_btn);
          attrListDiv.appendChild(li);
      } )
    } else {
      dst_details.innerHTML += `No attractions saved for this destination` 
    }

  }) // second .then
  .catch((error) => {
    console.log(error)
  }); 

}

function createDestination (e) {
  const dest = {
    name: document.getElementById('description').value,
    country: document.getElementById('completed').value,
    currency: document.getElementById('currency').value,
    language: document.getElementById('language').value
}
fetch(DESTINATIONS_URL,{
    method: "POST",
    body: JSON.stringify(dest),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then(resp => resp.json())
.then(dest => {
  let newDest = new Destination(dest);
  //add new destination to page
  newDest.renderDest();
  //frm.reset();
    
})
}

  
  
  
  
    
    
