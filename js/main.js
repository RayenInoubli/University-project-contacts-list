function Contact(civilite, nom, prenom, telephone) {
    this.civilite = civilite
    this.prenom = prenom
    this.nom = nom
    this.telephone = telephone
}

function toggleCreateEditForm() {
    try {
        const createEditForm = document.getElementById('create_update_form_container')
        const contactDetails = document.getElementById('view_contact_container')

        isVisible = createEditForm.style.display == 'block'

        if (!isVisible) {
            createEditForm.style.display = 'block'
            contactDetails.style.display = 'none'
        }

        document.getElementById('civility').value = 'monsieur';
        document.getElementById('nom_contact').value = '';
        document.getElementById('prenom_contact').value = '';
        document.getElementById('telephone').value = '';

        const createForm = document.getElementById('create_update_contact_form');
        createForm.setAttribute('data-telephone', '');
        createForm.addEventListener('submit', createContact);
    } catch (error) {
        alert(error)
    }
}

function toggleViewDetails() {
    try {
        const contactDetails = document.getElementById('view_contact_container')
        const createEditForm = document.getElementById('create_update_form_container')

        isVisible = contactDetails.style.display == 'block'

        if (!isVisible) {
            contactDetails.style.display = 'block'
            createEditForm.style.display = 'none'
        }
    } catch (error) {
        alert(error)
    }
}

function deleteAllContacts() {
    try {
        localStorage.removeItem('contacts');
        location.reload();
    } catch (error) {
        alert(error)
    }
}

function deleteOneContact(event) {
    let telephone = event.currentTarget.getAttribute('data-telephone');

    if (telephone) {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        let updatedContacts = contacts.filter(c => c.telephone !== telephone);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        location.reload();
    }
}

function findContcat(telephone) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    for (let contact of contacts) {
        if (contact.telephone == telephone) return contact;
    }
    return null;
}

function createContact(event) {
    try {
        event.preventDefault();


        const civilite = document.getElementById('civility').value
        const nom = document.getElementById('nom_contact').value
        const prenom = document.getElementById('prenom_contact').value
        const telephone = document.getElementById('telephone').value

        console.log(civilite, nom, prenom, telephone);
        if (!civilite) {
            alert('civilité est requis!');
            return;
        }
        if (!nom) {
            alert('nom est requis!');
            return;
        }
        if (!prenom) {
            alert('prenom est requis!');
            return;
        }
        if (!telephone) {
            alert('numéro est requis!');
            return;
        }
        if (!/^\d{8}$/.test(telephone)) {
            alert('Number must be exactly 8 digits long and contain only digits!');
            return;
        }

        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const c = new Contact(civilite, nom, prenom, telephone);
        contacts.push(c);
        console.log('contact: ',c);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        alert('Contact added!');

        document.getElementById('civility').value = '';
        document.getElementById('nom_contact').value = '';
        document.getElementById('prenom_contact').value = '';
        document.getElementById('telephone').value = '';

        document.getElementById('create_update_form_container').style.display = 'none';

        location.reload();
    } catch (error) {
        alert(error)
    }
}

function displayContactDetails(event) {
    try {
        let telephone = event.currentTarget.getAttribute('data-telephone');
        let viewContactContainer = document.getElementById('view_contact_container');

        let allLiElements = document.getElementsByTagName('li');
        for (let li of allLiElements) {
            li.classList.remove('selected');
        }

        event.currentTarget.classList.add('selected');

        toggleViewDetails();

        const contact = findContcat(telephone);

        console.log('contcat', contact);

        let existingContactCard = document.getElementById('contact_card');
        if (existingContactCard) {
            existingContactCard.remove();
        }

        let detailsDiv = document.createElement('div');
        detailsDiv.innerHTML = `
            <h3>Détail du contact</h3>
            <div id="detail_grp">
                <b> ${contact.nom} ${contact.prenom} </b>
                <p>Tél: ${contact.telephone}</p>
            </div>
        `;

        let showEditFormButton = document.createElement('button');
        showEditFormButton.textContent = 'Editer ce contact';
        showEditFormButton.setAttribute('id', 'edit_btn');
        showEditFormButton.setAttribute('data-telephone', contact.telephone)
        showEditFormButton.addEventListener('click', (event) => showEditForm(event))
        detailsDiv.appendChild(showEditFormButton);

        detailsDiv.setAttribute('id', 'contact_card')
        viewContactContainer.appendChild(detailsDiv);
    } catch (error) {
        alert(error);
    }
}

function displayContacts() {
    try {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        let listeContacts = document.getElementById('contacts_list');

        if (contacts.length == 0) {
            let li = document.createElement('p');
            li.textContent = "Aucun contact enregistré";
            listeContacts.appendChild(li);
        } else {
            // Sort contacts array by nom then prenom
            contacts.sort((a, b) => {
                if (a.nom !== b.nom) {
                    return a.nom.localeCompare(b.nom);
                } else {
                    return a.prenom.localeCompare(b.prenom);
                }
            });

            contacts.forEach(contact => {
                let li = document.createElement('li');
                let iconSrc = contact.civilite === 'monsieur' ? './assets/male.svg' : './assets/female.svg';
                li.innerHTML = `
                    <div class="contact_icon">
                        <img src="${iconSrc}" alt="img not found" width="25">
                    </div>
                    <p class="contact_name">${contact.nom} ${contact.prenom}</p>
                `;
                li.setAttribute('data-telephone', contact.telephone);
                li.addEventListener('click', displayContactDetails);
                listeContacts.appendChild(li);
            });
        }
    } catch (error) {
        alert(error);
    }
}


function showEditForm(event) {
    try {
        toggleCreateEditForm();
        let telephone = event.currentTarget.getAttribute('data-telephone');
        const contact = findContcat(telephone);

        console.log('show edit form', contact);
        let form = document.getElementById('create_update_contact_form');
        if (form) {
            form.removeEventListener('submit', createContact);
            form.setAttribute('data-telephone', telephone);
            form.addEventListener('submit', updateContactDetails);
        }

        document.getElementById('civility').value = contact.civilite;
        document.getElementById('nom_contact').value = contact.nom;
        document.getElementById('prenom_contact').value = contact.prenom;
        document.getElementById('telephone').value = contact.telephone;

        let deleteButton = document.getElementById('delete_contact_btn');
        deleteButton.setAttribute('data-telephone', telephone);
        // deleteButton.addEventListener('click', deleteOneContact(telephone));
    } catch (error) {
        alert(error);
    }
}

function updateContactDetails(event) {
    try {
        event.preventDefault();

        let currentTelephone = event.currentTarget.getAttribute('data-telephone');

        const civilite = document.getElementById('civility').value;
        const nom = document.getElementById('nom_contact').value;
        const prenom = document.getElementById('prenom_contact').value;
        const telephone = document.getElementById('telephone').value;

        console.log(civilite, nom, prenom, telephone);
        if (!civilite) {
            alert('civilité est requis!');
            return;
        }
        if (!nom) {
            alert('nom est requis!');
            return;
        }
        if (!prenom) {
            alert('prenom est requis!');
            return;
        }
        if (!telephone) {
            alert('numéro est requis!');
            return;
        }
        if (!/^\d{8}$/.test(telephone)) {
            alert('Number must be exactly 8 digits long and contain only digits!');
            return;
        }

        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        let updatedContacts = contacts.map(contact => {
            if (contact.telephone === currentTelephone) {
                return { civilite, nom, prenom, telephone };
            }
            return contact;
        });

        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        alert('Contact updated!');
        location.reload();
    } catch (error) {
        alert(error);
    }
}

const addButton = document.getElementById('add_btn');
addButton.addEventListener('click', toggleCreateEditForm);

const deleteAllButton = document.getElementById('delete_all_btn', deleteAllContacts);
deleteAllButton.addEventListener('click', deleteAllContacts);

const deleteOneContactButton = document.getElementById('delete_contact_btn')
deleteOneContactButton.addEventListener('click', deleteOneContact);

displayContacts();