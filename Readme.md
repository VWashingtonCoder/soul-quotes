# Soul Quotes App
## Highlights
- Built Using Vite: React + TypeScript
- App uses react-router for page navigation, react-toast for user-friendly notifications, json-server for database information and sass for styling.
- App includes a homepage which shows up to three different quotes at a time. 
    - The quotes can be changed individually using the reload icon or all together by using the filter by category feature.
- App contains an account page that allows for a user to join the community or login using a form. 
    - The join and login forms also contain validation processes that require the active form to be filled out and valid.
        - Submit button is disabled until length requirements are met
        - An error box with the current errors will appear above the join form
        - For the login page, react-hot-toast will give a notification. 
    - Once logged in the account link will turn into a logout button link.
- Once logged in, user gains access to favorites page which contains a list of the user’s favorite quotes along with editing tools as well (unlike/delete if user is creator)
- Once logged in, the user gains access to create a page which contains a form to create a new quote and a list of the quotes that are already added by the current user.
    - Users also gain the control to delete their created quotes from this list.

## Developer Notes
- Run ‘npm run server’ to start the json-server
- Run ‘npm run dev’ to start the app
- Run ‘npm run seed’ to re-seed app to default state

## Technologies Utilized
- React (^18.2.0)
- Json-server (^0.17.3)
- React-hot-toast (^2.4.1)
- React-icons (^4.11.0)
- React-router-dom (^6.16.0)
- Sass (^1.69.3)

## Main Developer Information
- Vincent Andre Washington
    - Email: vincentwashington202@gmail.com
    - Github: VWCoder