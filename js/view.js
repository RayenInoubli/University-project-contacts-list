function toggleViewDetails() {
    try {
        const contactDetails = document.getElementById('view_contact_container')
        const createEditForm = document.getElementById('create_update_form_container')

        contactDetails.style.display = 'block'
        createEditForm.style.display = 'none'
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

        // console.log('contcat', contact);

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

displayContacts();