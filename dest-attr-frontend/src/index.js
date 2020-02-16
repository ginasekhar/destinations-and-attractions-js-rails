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
        newDest.renderDest();
        });
      
  })
  .catch((error) => {
    alert(`${error} on Listing All Destinations` )
  }); 
}

function displayCreateDestinationForm() {
  let frmWrapper = document.getElementById("dest-form-container");
  
  let frmHTML = `
    <div id="dest-form" class="modal-content">
      <div class="modal-header">
        <div id="close-dest" class="close">&times;</div>
        <h2> Add New Destination</h2>
      </div>
      <div class="modal-body">
        <form onsubmit="createDestination();return false;">
          <div class="class="dest-form-row">
            <label for="name">Name:</label>
            <input type="text" id="name" required>
          </div>
          <div class="class="dest-form-row">
            <label for="country">Country:</label>
            <input type="text" id="country" required>
          </div>
          <div class="class="dest-form-row">
            <label for="language">Language:</label>
            <input type="text" id="language">
          </div>
          <div class="class="dest-form-row">
            <label for="currency">Currency:</label>
            <input type="text" id="currency">
          </div>
            <input type="submit" class="submit-btn" value="Add New Destination">
        </form>
      </div> 
    </div>
    `
    frmWrapper.innerHTML = frmHTML;
    frmWrapper.style.display = 'block';

    const closeBtn = document.getElementById("close-dest");
    closeBtn.addEventListener('click', () => {
      let frmWrapper = document.getElementById("dest-form-container");
      frmWrapper.style.display = 'none';
    });

  }

  function createDestination () {
    
    let inputDest = {
      name: document.getElementById('name').value,
      country: document.getElementById('country').value,
      currency: document.getElementById('currency').value,
      language: document.getElementById('language').value
    }

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
      frmWrapper.style.display = 'none';

      //clear right side of form
      let dstDetails = document.querySelector(".dest-details p");
      let dstBtnsCont = document.getElementById("dest-btns-container");
      let attrListDiv = document.querySelector(".attr-list ul");
      dstDetails.innerHTML = ""
      dstBtnsCont.innerHTML = ""
      attrListDiv.innerHTML = ''

    })
    .catch((error) => {
      alert(`${error} on Creating New Destination` )
    }); 
  }
  
  // function viewDestination(event){
  //   event.preventDefault();
  function viewDestination(){
    let dstDetails = document.querySelector(".dest-details p");

    let dstBtnsCont = document.getElementById("dest-btns-container");
    
  
    dstDetails.innerHTML = ""

    dstBtnsCont.innerHTML = ""
  
    let id = event.target.dataset["destinationId"]
  
    showURL = DESTINATIONS_URL + `/${id}`;
    fetch(showURL)
    .then((response) => response.json())
    .then( (data) => {
      let dest = new Destination(data)
    
      dstDetails.innerHTML = 
        `<center><strong>Destination:</strong> ${dest.name} (${dest.country}) <strong>Currency:</strong> ${dest.currency}  <strong>Language:</strong> ${dest.language} </center> <hr> `;

      let addBtn = document.createElement("button");
      addBtn.setAttribute("data-attr-destination-id", id);
      addBtn.setAttribute('class', 'add-attr');
      addBtn.innerText = "Add Attraction to Destination"
      // dstDetails.append(addBtn);
      dstBtnsCont.append(addBtn);
      addBtn.addEventListener('click', () => {
        displayCreateAttractionForm()
      })

      let attrListDiv = document.querySelector(".attr-list ul");
      // clear attraction list before populating with fetched ones 
      

      if (data["attractions"].length > 0) {
        attrListDiv.innerHTML = '<center><h4> Attractions </h4> </center>'
        data["attractions"].forEach(attr => {
          let newAttr = new Attraction(attr);
          newAttr.renderAttr();
        } )
      } else {
        attrListDiv.innerHTML = '<hr><center>No attractions saved for this destination </center>' 
      }
  
    }) // second .then
    .catch((error) => {
      alert(`${error} on View Destination` )
    }); 
  
  }

  
  function deleteDestination(dest){
    dest.preventDefault();

    if (!confirm('This will permanently delete this destination and all its attractions. Are you sure?')) { return false }
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
    .then((response) => response.json())
    .then(() => {
      event.target.parentElement.remove();
      let dstDetails = document.querySelector(".dest-details p");
      let dstBtnsCont = document.getElementById("dest-btns-container");
      let attrListDiv = document.querySelector(".attr-list ul");
      dstDetails.innerHTML = ""
      dstBtnsCont.innerHTML = ""
      attrListDiv.innerHTML = ''
    })
    .catch((error) => {
      alert(`${error} on Delete Destination` )
    }); 
  }



class Attraction {
  constructor(attr) { 
    this.id = attr.id
    this.name = attr.name
    this.category = attr.category
    this.reservations_required = attr.reservations_required
    this.cost = attr.cost
    this.destinationId = attr.destination_id
  }

  renderAttr() {
    let attrListDiv = document.querySelector(".attr-list ul");
       
    let li = document.createElement('li');
    
    li.innerHTML = `<hr>${this.name} (${this.category} )    |    Reservation ${this.reservations_required ? "Required" : "Not Required"}    |   Entry Fee - USD $${this.cost} <br>`;

    
    let del_btn = document.createElement("button");
    del_btn.setAttribute("data-attraction-id", this.id);
    del_btn.setAttribute('class', 'delete-attr');
    del_btn.innerText = "Delete"
    del_btn.addEventListener('click', (e) => {
      deleteAttraction(e)
    });
    li.append(del_btn);
    
    attrListDiv.appendChild(li);
  }
}

function displayCreateAttractionForm() {
  
  let destinationId = event.target.dataset["attrDestinationId"]

  let frmWrapper = document.getElementById("new-attraction-form-container");
  
  let frmHTML = `
    <div id="add-attr-form" class="modal-content">
      <div class="modal-header">
      <div id="close-attr" class="close">&times;</div>
      <h2> Add New Attraction</h2>
      </div>
      <div class="modal-body">
        <form onsubmit="createAttraction();return false;">
          <input id="destination_id" name="destination_id" type="hidden" value="${destinationId}">
          <label for="name">Name:</label>
          <input type="text" id="name" required>
          <label for="category">Category:</label>
          <input type="text" id="category">
          <label for="reservations_required">Reservation Required:</label>
          <input type="checkbox" name="reservations_required" id="reservations_required" value="true">
          <label for="cost">Cost:</label>
          <input type="number" id="cost" value=0>
          <input type ="submit" value="Add New Attraction">
        </form>  
      </div> 
      </div> 
    `
    frmWrapper.innerHTML = frmHTML;
    frmWrapper.style.display = 'block';

    const closeBtn = document.getElementById("close-attr");
    closeBtn.addEventListener('click', () => {
      let frmWrapper = document.getElementById("new-attraction-form-container");
      frmWrapper.style.display = 'none';
    });
}

function createAttraction(){
    
  const reservationsRequired = document.getElementById('reservations_required').checked;
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const cost = document.getElementById('cost').value;
  const destinationId = document.getElementById('destination_id').value;
  let attractionObj = {name: name, category: category,  reservations_required: reservationsRequired,
                      cost: cost, destination_id: destinationId};
  
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
    frmWrapper.style.display = 'none';
  })
  .catch((error) => {
    alert(`${error} on Creating New Attraction` )
  }); 

}



function deleteAttraction(attr){
  attr.preventDefault();

  if (!confirm('This will permanently delete this attraction. Are you sure?')) { return false }

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
  .then((response) => response.json())
  .then(event.target.parentElement.remove())
  .catch((error) => {
    alert(`${error} on Delete Attraction` )
  }); 
}
    
