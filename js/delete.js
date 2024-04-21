function deleteAllContacts() {
    try {
        localStorage.removeItem('contacts');
        location.reload();
    } catch (error) {
        alert(error)
    }
}

const deleteAllButton = document.getElementById('delete_all_btn');
deleteAllButton.addEventListener('click', deleteAllContacts);