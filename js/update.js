function toggleEditForm() {
    try {
        const createEditForm = document.getElementById('create_update_form_container')
        const contactDetails = document.getElementById('view_contact_container')

        createEditForm.style.display = 'block'
        contactDetails.style.display = 'none'
        
        document.getElementById('civility').value = 'monsieur';
        document.getElementById('nom_contact').value = '';
        document.getElementById('prenom_contact').value = '';
        document.getElementById('telephone').value = '';

        const createButton = document.getElementById('submit_btn');
        createButton.setAttribute('data-telephone', '');
        createButton.addEventListener('click', createContact);
    } catch (error) {
        alert(error)
    }
}

function findContcat(telephone) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    for (let contact of contacts) {
        if (contact.telephone === telephone) return contact;
    }
    return null;
}

function updateContactDetails(event) {
    try {
        event.preventDefault();

        let currentTelephone = event.currentTarget.getAttribute('data-telephone');

        const civilite = document.getElementById('civility').value;
        const nom = document.getElementById('nom_contact').value;
        const prenom = document.getElementById('prenom_contact').value;
        const telephone = document.getElementById('telephone').value;

        const exist = findContcat(telephone);
        // console.log(civilite, nom, prenom, telephone);
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
        if (telephone !== currentTelephone && exist) {
            alert('Ce numéro déja existeeeeeeeeeeeeeeeeee!');
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

function showEditForm(event) {
    try {
        toggleEditForm();
        let telephone = event.currentTarget.getAttribute('data-telephone');
        const contact = findContcat(telephone);

        const createButton = document.getElementById('submit_btn');
        createButton.removeEventListener('click', createContact);
        createButton.setAttribute('data-telephone', telephone);
        createButton.addEventListener('click', updateContactDetails);

        document.getElementById('civility').value = contact.civilite;
        document.getElementById('nom_contact').value = contact.nom;
        document.getElementById('prenom_contact').value = contact.prenom;
        document.getElementById('telephone').value = contact.telephone;

    } catch (error) {
        alert(error);
    }
}