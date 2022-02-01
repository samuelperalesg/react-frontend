import { useState } from "react"

function Show(props) {
  const id = props.match.params.id
  const people = props.people
  const person = people.find(p => p._id === id) // .find is predicate function, return boolean, will return first object in array if true
  
  // set state for editing form with person object in place
  const [ editForm, setEditForm ] = useState(person)

  // handle function for changes to form when events are happening
  const handleChange = evt => {
    setEditForm({...editForm, [evt.target.name]: evt.target.value }) // sets state of edit form, and targets specfic place
  }

  // handle function for form submission
  const handleSubmit = evt => {
    evt.preventDefault()
    props.updatePeople(editForm, person._id) // edits specific person by accesing person's id
    // redirect people object back to index
    props.history.push("/")
  }

  const removePerson = () => {
    props.deletePeople(person._id);
    props.history.push("/");
  }

  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
      
      <button id="delete" onClick={removePerson}>DELETE</button>

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input 
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input 
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    </div>
  )
}

export default Show