/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/auth/signup:
 *   post:
 *     tags:
 *        - Authorization
 *     summary: User Registration
 *     description: |
 *       Register a new user. To successfully register, you need to pass the basic
 *       user parameters in JSON format through the request body.
 *
 *       Request body:
 *       - <b>name</b> (string): User's name.
 *       - <b>email</b> (string): User's email.
 *       - <b>password</b> (string): User's password.
 *       - <b>age</b> (number): User's age.
 *       - <b>weight</b> (number): User's weight.
 *       - <b>height</b> (number): User's height.
 *       - <b>gender</b> (string): User's gender. Choose from values: ['male', 'female'].
 *       - <b>coefficientOfActivity</b> (number): User's activity coefficient. Choose from values: [1.2, 1.375, 1.55, 1.725, 1.9].
 *       - <b>goal</b> (string): User's goal. Choose from values: ['lose fat', 'maintain', 'gain muscle'].
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "User's name."
 *               email:
 *                 type: string
 *                 description: "User's email."
 *               password:
 *                 type: string
 *                 description: "User's password."
 *               age:
 *                 type: number
 *                 description: "User's age."
 *               weight:
 *                 type: number
 *                 description: "User's weight."
 *               height:
 *                 type: number
 *                 description: "User's height."
 *               gender:
 *                 type: string
 *                 description: "User's gender."
 *                 enum: ['male', 'female']
 *               coefficientOfActivity:
 *                  type: number
 *                  description: "User's activity coefficient. Choose from values: [1.2, 1.375, 1.55, 1.725, 1.9]."
 *                  enum: [1.2, 1.375, 1.55, 1.725, 1.9]
 *               goal:
 *                  type: string
 *                  description: "User's goal. Choose from values: ['lose fat', 'maintain', 'gain muscle']."
 *                  enum: ['lose fat', 'maintain', 'gain muscle']
 *     security: []
 *     responses:
 *       '201':
 *         description: "Successful registration"
 *         content:
 *           application/json:
 *              example:
 *                 token: ""
 *                 user:
 *                   _id: "657f06a253fd33c3bbc9276e"
 *                   name: "Dima"
 *                   email: "smilek222@gmail.com"
 *                   age: 12
 *                   gender: "male"
 *                   weight: 123
 *                   height: 165
 *                   coefficientOfActivity: 1.55
 *                   goal: "lose fat"
 *                   dailyCalories: 3813
 *                   dailyWater: 4040
 *                   dailyNutrition:
 *                     carbohydrates: 524
 *                     protein: 238
 *                     fat: 85
 *                   avatarURL: ""
 *                 consumedMealsByDay: 0,
 *                 consumedWaterByDay: 0,
 *                   
 * /api/auth/signin:
 *     post:
 *       tags:
 *         - Authorization
 *       summary: User Login
 *       description: |
 *         Authenticate the user in the system. To successfully log in, you need to pass
 *         the user's credentials in JSON format through the request body.
 *
 *         Request body:
 *         - <b>email</b> (string): User's email.
 *         - <b>password</b> (string): User's password.
 *
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: "User's email."
 *                 password:
 *                   type: string
 *                   description: "User's password."
 *       security: []
 *       responses:
 *         '200':
 *           description: "Successful authentication"
 *           content:
 *             application/json:
 *               example:
 *                 token: ""
 *                 user:
 *                   _id: "657f06a253fd33c3bbc9276e"
 *                   name: "Dima"
 *                   email: "smilek222@gmail.com"
 *                   age: 12
 *                   gender: "male"
 *                   weight: 123
 *                   height: 165
 *                   coefficientOfActivity: 1.55
 *                   goal: "lose fat"
 *                   dailyCalories: 3813
 *                   dailyWater: 4040
 *                   dailyNutrition:
 *                     carbohydrates: 524
 *                     protein: 238
 *                     fat: 85
 *                   avatarURL: ""
 *                 consumedMealsByDay: 
 *                   breakfast:
 *                     totalCarbohydrates: 100
 *                     totalProtein: 10
 *                     totalFat: 5
 *                     totalCalories: 115
 *                     foods: [
 *                       _id: "65823b3c2549fd125ae2a0fa"
 *                       name: "banana"
 *                       nutrition: 
 *                         carbohydrates: 100
 *                         protein: 10
 *                         fat: 5  
 *                       calories: 115
 *                     ]
 *                   lunch:
 *                     totalCarbohydrates: 100
 *                     totalProtein: 10
 *                     totalFat: 5
 *                     totalCalories: 115
 *                     foods: [
 *                       _id: "65823b3c2549fd125ae2a0fa"
 *                       name: "banana"
 *                       nutrition: 
 *                         carbohydrates: 100
 *                         protein: 10
 *                         fat: 5  
 *                       calories: 115
 *                     ]
 *                   dinner:
 *                     totalCarbohydrates: 0
 *                     totalProtein: 0
 *                     totalFat: 0
 *                     totalCalories: 0
 *                     foods: []
 *                   snack:
 *                     totalCarbohydrates: 0
 *                     totalProtein: 0
 *                     totalFat: 0
 *                     totalCalories: 0
 *                     foods: []
 *                   totalConsumedCaloriesPerDay: 230
 *                   totalConsumedCarbohydratesPerDay: 200
 *                   totalConsumedFatPerDay: 10
 *                   totalConsumedProteinPerDay: 20
 *                 consumedWaterByDay: 566
 *         '401':
 *           description: "Authentication error"
 *           content:
 *             application/json:
 *               example:
 *                 message: "Incorrect email or password."
 * /api/auth/signout:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *        - Authorization
 *     summary: User Logout
 *     description: |
 *       Log out the user from the system. To make this request, the user must be authenticated
 *       and pass a valid access token in the Authorization header, using the Bearer scheme.
 *       Logging out will invalidate the token and disconnect the user from activity.
 *     responses:
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *       '200':
 *         description: Successful signout
 *         content:
 *           application/json:
 *             example:
 *               message: "Logout success"
 * /api/auth/forgot-password:
 *   post:
 *     tags:
 *        - Authorization
 *     summary: Forgot Password
 *     description: |
 *       Initiate the password reset process. To reset the password, provide the user's email
 *       in JSON format through the request body.
 *
 *       Request body:
 *       - <b>email</b> (string): User's email for password reset.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "User's email for password reset."
 *     security: []
 *     responses:
 *       '200':
 *         description: "Password reset initiated successfully"
 *         content:
 *           application/json:
 *             example:
 *               message: "New password was sent to your email"
 *       '404':
 *         description: "User not found"
 *         content:
 *           application/json:
 *             example:
 *               message: "No user with email..."
 * /api/recommended-food:
 *   get:
 *     tags:
 *        - Recommended food
 *     summary: Recommended Food
 *     description: |
 *       Retrieve recommended food for the user based on their profile and goals. The response
 *       will include a list of recommended food items.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: "Successfully retrieved recommended food"
 *         content:
 *           application/json:
 *             example:
 *               recommendedFood:
 *                 - nutrition:
 *                     carbohydrates: 14
 *                     protein: 0.3
 *                     fat: 0.2
 *                   name: "Apples"
 *                   amount: "100 g"
 *                   img: "https://ftp.goit.study/img/you_health/Apples.png"
 *                   calories: 52
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 * /api/user/statistics:
 *   get:
 *     tags:
 *       - User
 *     summary: Monthly Statistic
 *     description: |
 *       Retrieve monthly statistics for the user based on their profile. The response
 *       will include information about weight, water, and calories for the specified month.
 *
 *       Request body:
 *       - <b>month</b> (number, required): The month for which to retrieve statistics. Should be a number between 1 and 12..
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: month
 *         in: query
 *         description: "The month for which to retrieve statistics. Should be a number between 1 and 12."
 *         required: true
 *         schema:
 *           type: number
 *           minimum: 1
 *           maximum: 12
 *
 *     responses:
 *       '200':
 *         description: "Successfully retrieved monthly statistics"
 *         content:
 *           application/json:
 *             example:
 *               monthlyStatistic:
 *                 callPerDay:
 *                   - day: 16
 *                     calories: 2765
 *                   - day: 17
 *                     calories: 2698
 *                 weightPerDay:
 *                   - day: 15
 *                     weight: 84
 *                   - day: 16
 *                     weight: 84
 *                   - day: 17
 *                     weight: 90
 *                 waterPerDay:
 *                   - day: 16
 *                     ml: 800
 *                   - day: 17
 *                     ml: 1200
 *                 avgCalories: 2731.5
 *                 avgWeight: 86
 *                 avgWater: 1000
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 * /api/user/current:
 *   get:
 *     tags:
 *       - User
 *     summary: Get Current User
 *     description: |
 *       Retrieve information about the currently authenticated user.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: "Successfully retrieved current user information"
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 name: "R"
 *                 email: "margo@gmail.com"
 *                 age: 25
 *                 gender: "female"
 *                 weight: 47
 *                 height: 169
 *                 goal: "maintain"
 *                 coefficientOfActivity: 1.2
 *                 dailyCalories: 2673
 *                 dailyNutrition:
 *                   carbohydrates: 368
 *                   protein: 167
 *                   fat: 59
 *                 dailyWater: 2080
 *                 avatarURL: ""
 *               consumedMealsByDay: 
 *                 breakfast:
 *                   totalCarbohydrates: 100
 *                   totalProtein: 10
 *                   totalFat: 5
 *                   totalCalories: 115
 *                   foods: [
 *                     _id: "65823b3c2549fd125ae2a0fa"
 *                     name: "banana"
 *                     nutrition: 
 *                       carbohydrates: 100
 *                       protein: 10
 *                       fat: 5  
 *                     calories: 115
 *                   ]
 *                 lunch:
 *                   totalCarbohydrates: 100
 *                   totalProtein: 10
 *                   totalFat: 5
 *                   totalCalories: 115
 *                   foods: [
 *                     _id: "65823b3c2549fd125ae2a0fa"
 *                     name: "banana"
 *                     nutrition: 
 *                       carbohydrates: 100
 *                       protein: 10
 *                       fat: 5  
 *                       calories: 115
 *                   ]
 *                 dinner:
 *                   totalCarbohydrates: 0
 *                   totalProtein: 0
 *                   totalFat: 0
 *                   totalCalories: 0
 *                   foods: []
 *                 snack:
 *                   totalCarbohydrates: 0
 *                   totalProtein: 0
 *                   totalFat: 0
 *                   totalCalories: 0
 *                   foods: []
 *                 totalConsumedCaloriesPerDay: 230
 *                 totalConsumedCarbohydratesPerDay: 200
 *                 totalConsumedFatPerDay: 10
 *                 totalConsumedProteinPerDay: 20
 *               consumedWaterByDay: 555
 *                 
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 * /api/user/update:
 *   put:
 *     tags:
 *       - User
 *     summary: Update User Information
 *     description: |
 *       Update user information such as age, weight, height, gender, coefficient of activity, and goal.
 *
 *       Request body:
 *       - <b>age</b> (number): User's age.
 *       - <b>weight</b> (number): User's weight.
 *       - <b>height</b> (number): User's height.
 *       - <b>gender</b> (string): User's gender. Choose from values: ['male', 'female'].
 *       - <b>coefficientOfActivity</b> (number): User's activity coefficient. Choose from values: [1.2, 1.375, 1.55, 1.725, 1.9].
 *       - <b>goal</b> (string): User's goal. Choose from values: ['lose fat', 'maintain', 'gain muscle'].
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age:
 *                 type: number
 *                 description: "User's age."
 *               weight:
 *                 type: number
 *                 description: "User's weight."
 *               height:
 *                 type: number
 *                 description: "User's height."
 *               gender:
 *                 type: string
 *                 description: "User's gender."
 *                 enum: ['male', 'female']
 *               coefficientOfActivity:
 *                 type: number
 *                 description: "User's activity coefficient. Choose from values: [1.2, 1.375, 1.55, 1.725, 1.9]."
 *                 enum: [1.2, 1.375, 1.55, 1.725, 1.9]
 *               goal:
 *                 type: string
 *                 description: "User's goal. Choose from values: ['lose fat', 'maintain', 'gain muscle']."
 *                 enum: ['lose fat', 'maintain', 'gain muscle']
 *
 *     responses:
 *       '200':
 *         description: "User information updated successfully"
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 age: 30
 *                 weight: 75
 *                 height: 180
 *                 gender: "male"
 *                 coefficientOfActivity: 1.55
 *                 goal: "maintain"
 *                 dailyWater: 1222
 *                 dailyCalories: 2500
 *                 dailyNutrition:
 *                  - carbohydrates: 265
 *                  - protein: 125
 *                  - fat: 44
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 * /api/user/goal:
 *   put:
 *     tags:
 *       - User
 *     summary: Update User Goal
 *     description: |
 *       Update the user's goal, which will recalculate daily nutrition based on the new goal.
 *
 *       Request body:
 *       - <b>goal</b> (string, required): User's new goal. Choose from values: ['lose fat', 'maintain', 'gain muscle'].
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goal:
 *                 type: string
 *                 description: "User's new goal. Choose from values: ['lose fat', 'maintain', 'gain muscle']."
 *                 enum: ['lose fat', 'maintain', 'gain muscle']
 *
 *     responses:
 *       '200':
 *         description: "User goal updated successfully"
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 age: 30
 *                 weight: 75
 *                 height: 180
 *                 gender: "male"
 *                 coefficientOfActivity: 1.55
 *                 goal: "maintain"
 *                 dailyNutrition:
 *                  - carbohydrates: 265
 *                  - protein: 125
 *                  - fat: 44
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 * /api/user/weight:
 *   post:
 *     tags:
 *       - User
 *     summary: Add User Weight
 *     description: |
 *       Add the user's weight, which will recalculate daily nutrition and update other relevant information.
 *
 *       Request body:
 *       - <b>weight</b> (number, required): User's weight.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight:
 *                 type: number
 *                 description: "User's new weight."
 *
 *     responses:
 *       '200':
 *         description: "User weight added successfully"
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 age: 30
 *                 weight: 80 // Updated weight
 *                 height: 180
 *                 gender: "male"
 *                 coefficientOfActivity: 1.55
 *                 goal: "maintain"
 *                 dailyWater: 1222
 *                 dailyCalories: 2500
 *                 dailyNutrition:
 *                  - carbohydrates: 265
 *                  - protein: 125
 *                  - fat: 44
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 * /api/user/food-intake:
 *   post:
 *     tags:
 *       - User
 *     summary: Add Food Intake
 *     description: |
 *       Add a food intake entry for a specific meal type. This will update the user's daily meal diary
 *
 *       Request body:
 *       - <b>mealType</b> (string, required): Type of the meal for the food intake. Choose from values: ['breakfast', 'lunch', 'dinner', 'snack'].
 *       - <b>foodDetails</b> (object, required): Details of the consumed food.
 *         - <b>name</b> (string): Name of the food.
 *         - <b>nutrition</b> (object): Nutritional information of the food.
 *           - <b>carbohydrates</b> (number): Carbohydrates content in grams.
 *           - <b>protein</b> (number): Protein content in grams.
 *           - <b>fat</b> (number): Fat content in grams.
 *         - <b>calories</b> (number): Calories content of the food.
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mealType:
 *                 type: string
 *                 description: "Type of the meal. Choose from values: ['breakfast', 'lunch', 'dinner', 'snack']."
 *                 enum: ['breakfast', 'lunch', 'dinner', 'snack']
 *               foodDetails:
 *                 type: object
 *                 description: "Details of the consumed food."
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: "Name of the food."
 *                   nutrition:
 *                     type: object
 *                     description: "Nutritional information of the food."
 *                     properties:
 *                       carbohydrates:
 *                         type: number
 *                         description: "Carbohydrates content in grams."
 *                       protein:
 *                         type: number
 *                         description: "Protein content in grams."
 *                       fat:
 *                         type: number
 *                         description: "Fat content in grams."
 *                   calories:
 *                     type: number
 *                     description: "Calories content of the food."
 *
 *     responses:
 *       '200':
 *         description: "Food intake added successfully"
 *         content:
 *           application/json:
 *             example:
 *               meal:
 *                 owner: "user_id"
 *                 mealType: "breakfast"
 *                 foods: [...list of foods]
 *                 totalCarbohydrates: 30
 *                 totalProtein: 15
 *                 totalFat: 10
 *                 totalConsumedCarbohydratesPerDay: 30
 *                 totalConsumedProteinPerDay: 15
 *                 totalConsumedFatPerDay: 10
 *                 totalConsumedCaloriesPerDay: 250
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete Food Intake
 *     description: |
 *       Delete a food intake entry for a user. This will update the user's daily food intake diary.
 *
 *       Request body:
 *       - <b>mealType</b> (string, required): Type of the meal for the food intake. Choose from values: ['breakfast', 'lunch', 'dinner', 'snack'].
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mealType:
 *                 type: string
 *                 description: "Type of the meal to delete. Choose from values: ['breakfast', 'lunch', 'dinner', 'snack']."
 *                 enum: ['breakfast', 'lunch', 'dinner', 'snack']
 *
 *     responses:
 *       '200':
 *         description: "Food intake deleted successfully"
 *         content:
 *           application/json:
 *             example:
 *               meal:
 *                 owner: "user_id"
 *                 mealType: "breakfast"
 *                 foods: []
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *       '404':
 *         description: "Food intake not found"
 *         content:
 *           application/json:
 *             example:
 *               message: "Food intake not found"
 * /api/user/water-intake:
 *   post:
 *     tags:
 *       - User
 *     summary: Add Water Intake
 *     description: |
 *       Add a water intake entry for a user. This will update the user's daily water intake diary.
 *
 *       Request body:
 *       - **ml** (*number*): Amount of water intake in milliliters.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ml:
 *                 type: number
 *                 description: "Amount of water intake in milliliters."
 *                 minimum: 0
 *                 example: 500
 *
 *     responses:
 *       '201':
 *         description: "Water intake added successfully"
 *         content:
 *           application/json:
 *             example:
 *               waterIntake:
 *                 owner: "user_id"
 *                 ml: 500
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *   delete:
 *       tags:
 *         - User
 *       summary: Delete Water Intake
 *       description: "Delete a water intake entry for a user. This will update the user's daily water intake diary."
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '201':
 *           description: "Water intake deleted successfully"
 *           content:
 *             application/json:
 *               example:
 *                 waterIntake:
 *                   owner: "user_id"
 *                   ml: 500
 *         '401':
 *           description: "Unauthorized"
 *           content:
 *             application/json:
 *               example:
 *                 message: "Unauthorized"
 * /api/user/food-intake/{foodId}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update Food Intake
 *     description: |
 *       Update a food intake entry for a user. This will update the user's daily food intake diary.
 *
 *       Request body:
 *       - **foodId** (*object*): ID of the food intake to update.
 *       - <b>mealType</b> (string, required): Type of the meal for the food intake. Choose from values: ['breakfast', 'lunch', 'dinner', 'snack'].
 *       - <b>foodDetails</b> (object, required): Details of the consumed food.
 *         - <b>name</b> (string): Name of the food.
 *         - <b>nutrition</b> (object): Nutritional information of the food.
 *           - <b>carbohydrates</b> (number): Carbohydrates content in grams.
 *           - <b>protein</b> (number): Protein content in grams.
 *           - <b>fat</b> (number): Fat content in grams.
 *         - <b>calories</b> (number): Calories content of the food.
 *
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: foodId
 *         in: path
 *         description: "ID of the food intake to update."
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mealType:
 *                 type: string
 *                 description: "Type of the meal for the food intake. Choose from values: ['breakfast', 'lunch', 'dinner', 'snack']."
 *                 enum: ['breakfast', 'lunch', 'dinner', 'snack']
 *               foodDetails:
 *                 type: object
 *                 description: "Details of the updated food intake."
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: "Name of the food."
 *                   calories:
 *                     type: number
 *                     description: "Calories in the food."
 *                   nutrition:
 *                     type: object
 *                     description: "Nutritional information of the food."
 *                     properties:
 *                       carbohydrates:
 *                         type: number
 *                         description: "Carbohydrates in grams."
 *                       protein:
 *                         type: number
 *                         description: "Protein in grams."
 *                       fat:
 *                         type: number
 *                         description: "Fat in grams."
 *
 *     responses:
 *       '200':
 *         description: "Food intake updated successfully"
 *         content:
 *           application/json:
 *             example:
 *               meal:
 *                 owner: "user_id"
 *                 mealType: "breakfast"
 *                 foods:
 *                   - _id: "food_id"
 *                     name: "Updated Food"
 *                     calories: 300
 *                     nutrition:
 *                       carbohydrates: 20
 *                       protein: 10
 *                       fat: 15
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *       '404':
 *         description: "Food intake not found"
 *         content:
 *           application/json:
 *             example:
 *               message: "Food intake not found"
 * /api/user/avatar:
 *   post:
 *     tags:
 *       - User
 *     summary: Add User Avatar
 *     description: |
 *       Add the avatar for a user.
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: "Avatar image file."
 *
 *     responses:
 *       '200':
 *         description: "Avatar added successfully"
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 _id: "user_id"
 *                 avatarURL: "https://example.com/avatar.jpg"
 *       '401':
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *       '500':
 *         description: "Internal Server Error"
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
