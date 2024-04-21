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

function createContact(event) {
    try {
        event.preventDefault();

        const civilite = document.getElementById('civility').value
        const nom = document.getElementById('nom_contact').value
        const prenom = document.getElementById('prenom_contact').value
        const telephone = document.getElementById('telephone').value

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
        if (exist) {
            alert('Ce numéro déjaaaaaaaaaaaaaaaa existe!');
            return;
        }

        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const c = new Contact(civilite, nom, prenom, telephone);
        contacts.push(c);
        // console.log('contact: ',c);
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

const addButton = document.getElementById('add_btn');
addButton.addEventListener('click', toggleCreateEditForm);