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
 *       user parameters in JSON format through the request body. Request parameters:
 *
 *       - <b>name</b> (string): User's name.
 *       - <b>email</b> (string): User's email.
 *       - <b>password</b> (string): User's password.
 *       - <b>age</b> (integer): User's age.
 *       - <b>weight</b> (integer): User's weight.
 *       - <b>height</b> (integer): User's height.
 *       - <b>gender</b> (string): User's gender. Choose from values: ['male', 'female'].
 *       - <b>coefficientOfActivity</b> (integer): User's activity coefficient. Choose from values: [1.2, 1.375, 1.55, 1.725, 1.9].
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
 *                 type: integer
 *                 description: "User's age."
 *               weight:
 *                 type: integer
 *                 description: "User's weight."
 *               height:
 *                 type: integer
 *                 description: "User's height."
 *               gender:
 *                 type: string
 *                 description: "User's gender."
 *                 enum: ['male', 'female']
 *               coefficientOfActivity:
 *                  type: integer
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
 *             example:
 *               token: "your_token_here"
 *               user:
 *                 name: "John Doe"
 *                 email: "john@example.com"
 * /api/auth/signin:
 *     post:
 *       tags:
 *         - Authorization
 *       summary: User Login
 *       description: |
 *         Authenticate the user in the system. To successfully log in, you need to pass
 *         the user's credentials in JSON format through the request body. Request parameters:
 *
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
 *                 token: "your_token_here"
 *                 user:
 *                   name: "Ivan Petrov"
 *                   email: "ivan@example.com"
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
 *       Request parameters:
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
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: month
 *         in: query
 *         description: "The month for which to retrieve statistics. Should be a number between 1 and 12."
 *         required: true
 *         schema:
 *           type: integer
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
 */
