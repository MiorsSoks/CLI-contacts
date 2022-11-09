const fs = require("fs");

const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// fs.readFile(contactsPath, 'utf-8', (err, res) => {
//     if (err) {
//         console.log('ERROR',err);
//         return
//     }
//     console.log(res);
// })

const invoke = async (action, path, text) => {
  // const data1 = await fs.promises.readFile(contactsPath, "utf-8");
  // const data3 = await fs.promises.appendFile(contactsPath, "utf-8");
  // const data4 = await fs.promises.writeFile(contactsPath, "utf-8");
  // const data5 = await fs.promises.unlink(contactsPath, "utf-8");
  switch (action) {
    case "read":
      const data1 = await fs.promises.readFile(path, "utf-8");
      console.log("read\n", data1);
      break;
    case "add":
      await fs.promises.appendFile(path, text);
      break;
    case "rewrite":
      await fs.promises.writeFile(path, text);
      break;
    case "delete":
      await fs.promises.unlink(path, text);
      break;
    default:
      break;
  }
};

invoke("add", contactsPath, 'text').catch(err=>console.log(err.message));
