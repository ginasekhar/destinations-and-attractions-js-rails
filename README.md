# destinations-and-attractions-js-rails

* Ruby version 
      2.6.1

* System dependencies
      This project uses the following gems:
            active_model_serializers
           
* Database creation
      cd dest-attr-backend
      rake db:migrate

* How to run the test suite
      Open dest-attr-frontend/index.html in a browser window. Upon login, the program will retrieve all destinations in the database. Click on the 'Add destination' button to add a new destination.  Click on the view button next to each destination see more details about that destination. Once you are viewing a destination, click on the 'Add attraction' button to add attractions to that destination. To delete an attraction, click the 'Delete' button under the attraction.  
      A destination can be deleted by clicking the 'Delete' button next to it. The user will be prompted to confirm and the destination and all associated attractions will be delete.