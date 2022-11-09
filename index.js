const operations = require("./contacts.js");
// console.log(operations);

// // path to contacts:
// const contactsPath = path.join(__dirname, "db", "contacts.json");

const dataContact = {
  name: "Myros",
  email: "dkjsfhdasf@adsf.co",
  phone: "1232342345",
};

const process = require('process');
// const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      return await operations.getAllContacts();
      break;

    case "get":
      return await operations.getContactById(id);
      break;

    case "add":
      return await operations.createContact(name, email, phone);
      break;

    case "remove":
      return await operations.deleteContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv)
//   .then((promise) => console.table(promise))
//   .catch((err) => console.log(err.message));

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const {argv} = yargs(hideBin(process.argv))


  invokeAction(argv).then((promise) => console.table(promise))
  .catch((err) => console.log(err.message));

// {action: valueIndex, id:'', dataContact}
console.log(argv);