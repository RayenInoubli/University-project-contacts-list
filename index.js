function Contact(id, nom, numero) {
    this.id = id;
    this.nom = nom;
    this.numero = numero;
}

let submitButton = document.getElementById('submit_btn');

submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    let nom = document.getElementById('nom_contact').value;
    let numero = document.getElementById('numero_contact').value;

    if (!nom || !numero) {
        alert('Name and number are required!');
        return;
    }

    if (!/^\d{8}$/.test(numero)) {
        alert('Number must be exactly 8 digits long and contain only digits!');
        return;
    }

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let highestId = contacts.reduce((maxId, contact) => Math.max(maxId, contact.id), 0);

    let newContact = new Contact(highestId + 1, nom, numero);

    contacts.push(newContact);

    localStorage.setItem('contacts', JSON.stringify(contacts));

    alert('Contact added!');

    document.getElementById('nom_contact').value = '';
    document.getElementById('numero_contact').value = '';

    displayContacts();
});

function displayContacts() {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let listeContacts = document.getElementById('liste_contacts');

    let updateFormContainer = document.getElementById('updateFormContainer');
    let createFormContainer = document.getElementById('createFormContainer');

    let updateNomInput = document.getElementById('update_nom_contact');
    let updateNumeroInput = document.getElementById('update_numero_contact');

    listeContacts.innerHTML = '';

    contacts.forEach(function(contact) {
        let li = document.createElement('li');
        li.textContent = `ID: ${contact.id}, Name: ${contact.nom}, Number: ${contact.numero}`;

        // delete
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteContact(contact.id);
        });
        li.appendChild(deleteButton);

        // update
        let updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', function() {
            updateFormContainer.style.display = 'block';
            createFormContainer.style.display = 'none';

            updateNomInput.value = contact.nom;
            updateNumeroInput.value = contact.numero;

            // Update contact on form submit
            let updateSubmitButton = document.getElementById('update_submit_btn');
            updateSubmitButton.addEventListener('click', function() {
                contacts.forEach(function(c) {
                    if (c.id === contact.id) {
                        c.nom = updateNomInput.value;
                        c.numero = updateNumeroInput.value;
                    }
                });

                localStorage.setItem('contacts', JSON.stringify(contacts));
                alert('Contact updated!');
                displayContacts();
            });
        });
        li.appendChild(updateButton);

        listeContacts.appendChild(li);
    });
}

function deleteContact(id) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
}

displayContacts();

let exit = document.getElementById('exit')
exit.addEventListener('click', function () {
    updateFormContainer.style.display = 'none';
    createFormContainer.style.display = 'block';
})