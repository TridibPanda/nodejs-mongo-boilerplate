# nodejs-mongo-boilerplate

This is a sample Nodejs boilerplate setup which using Mongoose as ORM tool for MongoDB

#Instructions

1. Clone the repo.
2. Run "npm install"
2. Start server using "node app.js". The app will start booting on port 4000 by default.

# Please strictly follow the general guideline for developing any Nodejs backend with MongoDB

1. Always split the structure in MVC style. In this boilerplate code, we are using Mongoose and strictly follow that for all upcoming projects.
2. When developing the database architecture, first think about the relational mapping and the best practice would be make it on pen and paper, try to optimize the database models.
3. Increasing the number of collections should not be a problem but please do not create redundancy. Do not put all the required data into a single collection. Try to modularize it.
4. Strictly use config and environment variables to store database credentials, API Keys, custom endpoints etc.
5. Do not hardcode any custom variable data in code.
