import React from "react";

class App extends React.Component {

  // Constructor
  constructor(props) {
    super(props);
    this.contactsURL = "https://jsonplaceholder.typicode.com/users";
    this.state = {
      contacts: [],
      DataisLoaded: false
    };
    this.addNewContact = this.addNewContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
  }

  // fetching data from url
  componentDidMount() {
    fetch(this.contactsURL)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          contacts: json,
          DataisLoaded: true
        });
      });
  }


  // Deleting a contact
  deleteContact(id) {
    let newContacts = this.state.contacts.filter(contact => contact.id !== id);
    this.setState({
      contacts: newContacts,
      DataisLoaded: true
    });
    let newURL = this.contactsURL + '/' + id;
    fetch(newURL, {
      method: 'DELETE',
    });
  }

  // Adding a new contact
  addNewContact(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.username.value;
    const name = target.name.value;
    const phone = target.phone.value;
    const email = target.email.value;

    var contact = {
      id: new Date().getTime(),
      username: username,
      name: name,
      phone: phone,
      email: email
    };

    let newContacts = this.state.contacts;
    newContacts.push(contact);

    this.setState({
      contacts: newContacts,
      DataisLoaded: true
    });

    let newURL = this.contactsURL + '/' + contact.id;
    fetch(newURL, {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }


  // Updating an existing contact
  updateContact(event) {
    event.preventDefault();
    const target = event.target;
    const id = target.idofcontact.value;

    let { DataisLoaded, contacts } = this.state;
    let newContacts = contacts;
    let objIndex = newContacts.findIndex((obj => obj.id == id));

    if (target.newusername.value !== '') {
      newContacts[objIndex]['username'] = target.newusername.value;
    }
    if (target.newname.value !== '') {
      newContacts[objIndex]['name'] = target.newname.value;
    }
    if (target.newphone.value !== '') {
      newContacts[objIndex]['phone'] = target.newphone.value;
    }
    if (target.newemail.value !== '') {
      newContacts[objIndex]['email'] = target.newemail.value;
    }

    this.setState({
      contacts: newContacts,
      DataisLoaded: DataisLoaded
    });

    let newURL = this.contactsURL + '/' + id;
    fetch(newURL, {
      method: 'PUT',
      body: JSON.stringify(newContacts[objIndex]),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

  }

  render() {

    const { DataisLoaded, contacts } = this.state;

    if (!DataisLoaded) return <div>
      <h1> Loading </h1> </div>;

    return (
      <div className="App">
        <h1 style={{ textAlign: "center" }}>React Contact List App</h1>
        <br />
        <h2 style={{ textAlign: "center" }}>Add New Contact</h2>
        <form className="form-inline" onSubmit={this.addNewContact}>
          <div className="form-group row">
            <div className="col-md-2">
              <input type="text" className="form-control" id="username" placeholder="Enter Username" required></input>
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" id="name" placeholder="Enter fullname" required></input>
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" id="phone" placeholder="Enter Phone" required />
            </div>
            <div className="col-md-2">
              <input type="email" className="form-control" id="email" placeholder="Enter email" required></input>
            </div>

            <div className="col-md-3">
              <button type="submit" className="btn btn-primary"><i className="bi bi-plus"></i> Add</button>
            </div>
          </div>
        </form>
        <br />
        <h2 style={{ textAlign: "center" }}>Update Contact</h2>
        <form className="form-inline" onSubmit={this.updateContact}>
          <div className="form-group row">
            <div className="col-md-2">
              <input type="text" className="form-control" id="idofcontact" placeholder="Enter ID" required />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" id="newusername" placeholder="Enter Username"></input>
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" id="newname" placeholder="Enter fullname"></input>
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" id="newphone" placeholder="Enter Phone" />
            </div>
            <div className="col-md-2">
              <input type="email" className="form-control" id="newemail" placeholder="Enter email"></input>
            </div>
            <div className="col-md-3">
              <button type="submit" className="btn btn-primary"><i className="bi bi-sliders"></i> Update</button>
            </div>
          </div>
        </form>
        <br />
        <h2 style={{ textAlign: "center" }}>List of Contacts</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col"><i className="bi bi-person-fill"></i> User Name</th>
              <th scope="col"><i className="bi bi-person-circle"></i> Full Name</th>
              <th scope="col"><i className="bi bi-telephone-fill"></i> Phone</th>
              <th scope="col"><i className="bi bi-envelope-fill"></i> Email</th>

            </tr>
          </thead>
          <tbody>
            {
              contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.username}</td>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>

                  <td><button className="btn btn-danger"
                    onClick={() => this.deleteContact(contact.id)}
                  ><i className="bi bi-trash3-fill"></i></button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
