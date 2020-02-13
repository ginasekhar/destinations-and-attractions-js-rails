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
    let showBtn = document.createElement("button");
    showBtn.setAttribute("data-destination-id", this.id);
    showBtn.setAttribute('class', 'show-dest');
    showBtn.setAttribute('id', `"show-dest-${this.id}"`);
    showBtn.innerText = "View"
    li.append(showBtn)

    let delBtn = document.createElement("button");
    delBtn.setAttribute("data-destination-id", this.id);
    delBtn.setAttribute('class', 'del-dest');
    delBtn.innerText = "Delete"
    li.append(delBtn)
    ul.appendChild(li);

    showBtn.addEventListener('click', (e) => {
        viewDestination(e)
      });
  
    delBtn.addEventListener('click', (e) => {
      deleteDestination(e)
    });
  
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
    let frmWrapper = document.getElementById("dest-form-container");
    frmWrapper.innerHTML = "";
  })
  .catch((error) => {
    console.log(error)
  }); 
  }
  
  function viewDestination(event){
    event.preventDefault();
    let dstDetails = document.querySelector(".dest-details p");
  
    dstDetails.innerHTML = ""
  
    let id = event.target.dataset["destinationId"]
  
    showURL = DESTINATIONS_URL + `/${id}`;
    fetch(showURL)
    .then((response) => response.json())
    .then( (data) => {
      let dest = new Destination(data)
    
      dstDetails.innerHTML = 
        `<strong>Destination:</strong> ${dest.name} (${dest.country}) <strong>Currency:</strong> ${dest.currency}  <strong>Language:</strong> ${dest.language} <br> `;
      let addBtn = document.createElement("button");
      addBtn.setAttribute("data-attr-destination-id", id);
      addBtn.setAttribute('class', 'add-attr');
      addBtn.innerText = "Add Attraction for this Destination"
      dstDetails.append(addBtn);
      addBtn.addEventListener('click', (e) => {
        displayCreateAttractionForm(e)
      })

      let attrListDiv = document.querySelector(".attr-list ul");
      // clear attraction list before populating with fetched ones 
      attrListDiv.innerHTML = '<center><h3> Attractions </h3> </center> <br>'

      if (data["attractions"].length > 0) {
        data["attractions"].forEach(attr => {
          let newAttr = new Attraction(attr);
          newAttr.renderAttr();
        } )
      } else {
        dstDetails.innerHTML += `No attractions saved for this destination` 
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

function displayCreateAttractionForm(e) {
  e.preventDefault();

  console.log("in displayCreateAttractionForm")

  const frmWrapper = document.getElementById("new-attraction-form-container");
  const destinationId = e.target.dataset.attrDestinationId
  
  
  let frmHTML = `
    <div id="add-attr-form">
      <br>
      <form onsubmit="createAttraction();return false;">
          <input id="destinationId" name="destinationId" type="hidden" value="${destinationId}">
          <label for="name">Name:</label>
          <input type="text" id="name">
          <label for="category">Category:</label>
          <input type="text" id="category">
          <label for="reservations_required">Reservation Required:</label>
          <input type="checkbox" id="reservations_required">
          <label for="cost">Cost:</label>
          <input type="number" id="cost">
          <input type ="submit" value="Add New Attraction">
          <br>
      </form>
    </div> 
    `
    frmWrapper.innerHTML = frmHTML;

}

function createAttraction(){
  
  // remember to translate check box to boolean
  
  const reservationsRequired = document.getElementById('reservations_required').value ? true : false ;
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const cost = document.getElementById('cost').value;
  let attractionObj = new Attraction ({name: name, 
                                        category: category,  
                                        reservations_required: reservationsRequired,
                                        cost: cost 
  })
  
  let configObj = {
      method: "POST",
      body: JSON.stringify(attractionObj), 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
  };
     
  fetch(ATTRACTIONS_URL, configObj)
  .then(resp => resp.json())
  .then(attr => {
    let newAttr = new Attraction(attr);
    //add new destination to page
    newAttr.renderAttr();

    //frm.reset();
    let frmWrapper = document.getElementById("new-attraction-form-container");
    frmWrapper.innerHTML = "";
  })
  .catch((error) => {
    console.log(error)
  }); 

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
  
  
  
    
    
