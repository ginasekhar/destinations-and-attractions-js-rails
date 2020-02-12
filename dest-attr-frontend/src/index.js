const BASE_URL = "http://localhost:3000"
const DESTINATIONS_URL = `${BASE_URL}/destinations`

const ATTRACTIONS_URL = `${BASE_URL}/attractions`

document.addEventListener("DOMContentLoaded", ()=>{
  getDestinations();
})

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
    show_btn.innerText = "View"
    show_btn.addEventListener('click', (e) => {
      
      viewDestination(e)
    });
    li.append(show_btn)

    let del_btn = document.createElement("button");
    del_btn.setAttribute("data-destination-id", this.id);
    del_btn.setAttribute('class', 'del-dest');
    del_btn.innerText = "Delete"
    del_btn.addEventListener('click', (e) => {
      
      deleteDestination(e)
    });
    li.append(del_btn)
    ul.appendChild(li);
  }
}

///Destination
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
  let frmWrapper = document.getElementById("dest-form-container");
  let frmHTML = `
    <div id="dest-form">
      <br>
      <form onsubmit="createDestination();return false;">
          <label for="name">Name:</label>
          <input type="text" id="name">
          <label for="country">Country:</label>
          <input type="text" id="country">
          <label for="language">Language:</label>
          <input type="text" id="language">
          <label for="currency">Currency:</label>
          <input type="text" id="currency">
          <input type ="submit" value="Add New Destination">
          <br>
      </form>
    </div> 
    `
    frmWrapper.innerHTML = frmHTML;

  }

  function createDestination () {
    //const destinationObj = new Destination ( { "name": e.target. , country:  }
    //document.forms["dest-form"].getElementsByTagName("input");

    let inputDest = {
      name: document.getElementById('name').value,
      country: document.getElementById('country').value,
      currency: document.getElementById('currency').value,
      language: document.getElementById('language').value
  }

  //const destinationObj = (({'description', 'country', 'currency', 'language'}) => ({ 'description', 'country', 'currency', 'language' }))(inputDest);

  
  fetch(DESTINATIONS_URL,{
      method: "POST",
      body: JSON.stringify(inputDest),
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
  .catch((error) => {
    console.log(error)
  }); 
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
              displayCreateAttractionForm(e)
            });
            dst_details.append(add_btn);
  
      let attrListDiv = document.querySelector(".attr-list ul");
      // clear attraction list before populating with fetched ones 
      attrListDiv.innerHTML = ''

      if (data["attractions"].length > 0) {
        data["attractions"].forEach(attr => {
          let newAttr = new Attraction(attr);
          newAttr.renderAttr();
        } )
      } else {
        dst_details.innerHTML += `No attractions saved for this destination` 
      }
  
    }) // second .then
    .catch((error) => {
      console.log(error)
    }); 
  
  }

  function deleteDestination(dest){
    dest.preventDefault();
    destinationId = dest.target.dataset.destinationId;
    delete_url = `${DESTINATIONS_URL}/${destinationId}`
  
    let configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
    };
       
    fetch(delete_url, configObj)
    .then(event.target.parentElement.remove())
    .catch((error) => {
      console.log(error)
    }); 
  }



class Attraction {
  constructor(attr) { 
    this.id = attr.id
    this.name = attr.name
    this.category = attr.category
    this.reservations_required = attr.reservations_required
    this.cost = attr.cost
  }

  renderAttr() {
    let attrListDiv = document.querySelector(".attr-list ul");
       
    let li = document.createElement('li');
    li.innerHTML = `<hr><strong>${this.name}</strong><strong> Category:</strong>${this.category} <strong>Reservation: </strong>${this.reservations_required ? "Required" : "Not Required"} <strong>Entry Fee : </strong>USD $${this.cost} <br>`;
    let del_btn = document.createElement("button");
    del_btn.setAttribute("data-attraction-id", this.id);
    del_btn.setAttribute('class', 'delete-attr');
    del_btn.innerText = "Delete"
    del_btn.addEventListener('click', (e) => {
      deleteAttraction(e)
    });
    li.append(del_btn);
    let edt_btn = document.createElement("button");
    edt_btn.setAttribute("data-attraction-id", this.id);
    edt_btn.setAttribute('class', 'edt-attr');
    edt_btn.innerText = "Edit"
    edt_btn.addEventListener('click', (e) => {
      editAttraction(e)
    });
    li.append(edt_btn);
    attrListDiv.appendChild(li);
  }
}

function displayCreateAttractionForm() {
  
}

function createAttraction(attr){
  attr.preventDefault();
  const destinationId = attr.target.dataset.destinationId

  const attractionObj = new Attraction ( { "destination_id": destinationId })

  let configObj = {
      method: "POST",
      body: JSON.stringify(attractionObj),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
  };
     
  fetch(ATTRACTIONS_URL, configObj)
  .then(window.location.reload());

}



function deleteAttraction(attr){
  attr.preventDefault();
  attractionId = attr.target.dataset.attractionId;
  delete_url = `${ATTRACTIONS_URL}/${attractionId}`

  let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
  };
     
  fetch(delete_url, configObj)
  .then(event.target.parentElement.remove())
  .catch((error) => {
    console.log(error)
  }); 
}






  ////
  // Get DOM Elements
// const modal = document.querySelector('#my-modal');
// const modalBtn = document.querySelector('#modal-btn');
// const closeBtn = document.querySelector('.close');

// // Events
// modalBtn.addEventListener('click', openModal);
// closeBtn.addEventListener('click', closeModal);
// window.addEventListener('click', outsideClick);
  
  
  
    
    
