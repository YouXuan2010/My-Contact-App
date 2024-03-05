// Importing the `useState` hook from the React library
import { useState } from "react";

// Defining the functional component `ContactForm` with destructuring assignment for props (though not used in this case)
const ContactForm = ({existingContact = {}, updateCallback}) => {

    // Using the `useState` hook to create state variables `firstName`, `lastName`, and `email` with their respective setter functions
    const [firstName, setFirstName] = useState(existingContact.firstName || '');
    const [lastName, setLastName] = useState(existingContact.lastName || '');
    const [email, setEmail] = useState(existingContact.email || '');

    // Checking if the `existingContact` object is not empty, which means that the form is being used to update an existing contact
    const updating = Object.entries(existingContact).length !== 0

    // Handling the form submission
    const onSubmit = async (e) => {
        // Preventing the default form submission behavior
        e.preventDefault();

        // Creating an object `data` with the form input values
        const data = {
            firstName,
            lastName,
            email
        };

        // Setting the URL for the API endpoint
        // If the form is being used to update an existing contact, the URL will be `update_contact/${existingContact.id}`
        const url = 'http://127.0.0.1:5000/' + (updating ? `update_contact/${existingContact.id}` : 'create_contact');

        // Creating options for the fetch request (method, headers, and body)
        const options = {
            method: updating ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        // Making an asynchronous request to the server using `fetch`
        const response = await fetch(url, options);

        // Checking if the response status is not successful (not 201 or 200)
        if (response.status !== 201 && response.status !== 200) {
            // Parsing the response data as JSON
            const responseData = await response.json();
            
            // Displaying an alert with the error message from the server
            alert(responseData.message);
        } else {
            updateCallback()
        }
    };

    // Returning the JSX for the form, with input fields and a submit button
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

// Exporting the `ContactForm` component as the default export
export default ContactForm;
