# destinations-and-attractions-js-rails

# this is a test
//CSS

main {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 20px;
    padding-top: 10px;
    padding-bottom: 30px;
  }



<nav>
  <ul>
  <li><a href="#" onclick='getDestinations();return false;'>All Destinations</a></li>
  <li><a href="#" onclick='displayCreateAttractionForm();return false;'>New Attraction</a></li>
  <li><a href="#" onclick='displayCreateDestinationForm();return false;'>New Destination</a></li>
  </ul>
</nav>

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