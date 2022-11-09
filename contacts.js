const fs = require("fs").promises;

const uuid = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function getAllContacts() {
  const dataString = await fs.readFile(contactsPath, "utf-8");
  const data = JSON.parse(dataString);
  return data;
}

async function getContactById(id) {
  const allContacts = await getAllContacts(contactsPath);
  const contact = allContacts.find((contact) => contact.id === id);
  return contact ?? null;
}

async function createContact(name, email, phone) {
  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  const allContacts = await getAllContacts(contactsPath);
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return allContacts;
}

async function updateById(id, name, email, phone) {
  const allContacts = await getAllContacts(contactsPath);
  const contactIndex = allContacts.findIndex((contact) => contact.id === id);
  if (contactIndex !== -1) {
    allContacts[contactIndex].name = name;
    allContacts[contactIndex].email = email;
    allContacts[contactIndex].phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts;
  } else {
    return null;
  }
}

async function deleteContact(id) {
  const allContacts = await getAllContacts(contactsPath);
  const contactIndex = allContacts.findIndex((contact) => contact.id === id);
    if (contactIndex === -1) {
       return null;
    }
    else {
    allContacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts;
  }
}

// deleteContact("be82c97d-5468-43e6-84d6-fbee671b4b23")
//   .then((promise) => console.log(promise))
//   .catch((err) => console.log(err.message));

module.exports = {
    getAllContacts, getContactById, createContact, updateById, deleteContact
}