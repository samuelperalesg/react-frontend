import { useState, useEffect, useRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

    const [people, setPeople] = useState(null)

    // const URL = "https://people-app-ai.herokuapp.com/people/";
    const URL = "http://localhost:4000/people/";
    const getPeopleRef = useRef();
    // fetch people data from backend
    const getPeople = async () => {
        if(!props.user) return;
        const token = await props.user.getIdToken();
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json(); // console.log(response.json);
        setPeople(data);
    }

    // Create people using fetch
    const createPeople = async (person) => {
        if(!props.user) return; // do not run any code in this function if there's no user
        const token = await props.user.getIdToken();
        await fetch (URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(person),
        });
        // Update list of people
        getPeople();

    };

    const updatePeople = async (person, id) => {
        // make put request to create people
        if(!props.user) return; // do not run any code in this function if there's no user
        await fetch(URL + id, {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(person),
        });
        // update list of people
        getPeople();
      }
    
      const deletePeople = async id => {
        // make delete request to create people
        if(!props.user) return; // do not run any code in this function if there's no user
        await fetch(URL + id, {
          method: "DELETE",
        })
        // update list of people
        getPeople();
      }
    
    useEffect(() => {
        getPeopleRef.current = getPeople;
    });

    useEffect(() => {
        if(props.user) {
            getPeopleRef.current();
        } else {
            setPeople(null);
        }
    }, [props.user]);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index user={props.user} people={people} createPeople={createPeople}/>
                </Route>
                <Route
                    path="/people/:id"
                    render={(rp) => (
                        props.user ?
                        <Show
                        people = {people}
                        updatePeople = {updatePeople}
                        deletePeople = {deletePeople}
                            {...rp}
                        />
                        :
                        <Redirect to="/" />
                    )}
                />
            </Switch>
        </main>
    );
}

export default Main;