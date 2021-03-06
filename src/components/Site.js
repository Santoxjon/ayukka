import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Columns from './Columns';
import CreateTask from './CreateTask';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";


export function Header() {
    return (
        <header>
            <Navbar variant="dark">
                <Navbar.Brand href="/">🗒 Ayukka</Navbar.Brand>
                <Form inline method="GET" className="mr-auto w-50">
                    <FormControl type="text" placeholder="Qué estamos buscando?" className="mr-sm-2 w-75" />
                    <Button variant="outline-light">Buscar <FontAwesomeIcon icon={faSearch} flip="horizontal" /></Button>
                </Form>
                <Nav className="w-25">
                    <Button id="addColumnBtn" className="mr-sm-2 w-50" href="/columns/create" rel="noreferrer">Nueva Columna</Button>
                    <Button id="addTask" className="mr-sm-2 w-50" href="/columns/tasks/create" rel="noreferrer">Nueva Tarea</Button>
                </Nav>
            </Navbar>
        </header>

    )
}
export function Main() {
    return (
        <Router>
            <main>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/columns" />
                    </Route>
                    <Route exact path="/columns">
                        <Columns />
                    </Route>
                    <Route path="/columns/create">
                        <p>Crear columna</p>
                    </Route>
                    <Route exact path="/columns/tasks">
                        <Redirect to="/columns" />
                    </Route>
                    <Route path="/columns/tasks/create">
                        <CreateTask />
                    </Route>
                    <Route path="/columns/tasks/:id">
                        <p>Detalles yo qué sé tío XDD</p>
                    </Route>
                </Switch>
            </main>
        </Router>
    )
}
export function Footer() {
    return (
        <footer>
            <a href="https://github.com/santoxjon/ayukka" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} />
                Every line of code is available here and free to use
            </a>
        </footer>
    )
}
