# auth-server
Server side implementation of authentication

## API Doc
### Authentication API
- **POST /users - Create User**
    - post `{ email: your@email.com, password: yourpassword }`
    - will create a new user with that email
    - will send verification email to user
- **GET /users/verify/:userID/:emailKey - Verify New User**
    -   this verifies that the email belongs to that user
    -   **:userID** - the user id that was sent to your email
    -   **:emailKey** - the email key that was sent to the email
- **GET /users/sendVerificationEmail/:email - Resend verification email**
    -  **:email** - the email to send the verification email to
- **GET /users/resetPassword/:email - Reset Password Link**
    - Send reset password link to **:email**   
- **PUT /users/resetPassword - Reset Password**
    - reset your forgotten password   
    - put `{ id: userIDFromEmail, resetKey: resetKeyFromEmail, newPassword: yourNewPassword              }`   
- **POST /authentication - Authenticate User**
    - post `{ email: yourEmail, password: yourPassword }`   
    - return a new JWT token, that you can use to make authenticated requests
