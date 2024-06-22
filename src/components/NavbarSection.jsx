import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { currencyOfCountry } from '../state/actions';
import { myCurrencies } from '../static-data/fake-data';
import './Navbar.css';
import SearchBox from './SearchBox';

function NavbarSection() {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state) => state.currentCountry);
  
  const selectCurrency = (selectedCurrency) => {
    dispatch(currencyOfCountry(selectedCurrency));
  };

  return (
    <div className='nav-section'>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-4 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <select className='p-3 min-xl:ml-3 rounded-xl mr-4 w-full' value={selectedCurrency} onChange={(e) => selectCurrency(e.target.value)}>
                {myCurrencies.map((item, id) => (
                  <option key={id} value={item}>{item}</option>
                ))}
              </select>
              <SearchBox />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarSection;
