import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Navbar extends React.Component {
    render(){
        return (
          <div className='navbar-fixed'>
            <nav>
              <div className="nav-wrapper">
                  <Link className="brand-logo" to='/'> Array of Sunshine </Link>
                    <ul className="right hide-on-med-and-down">

                    <div>
                      <li><Link to='/ads'>Projects</Link></li>
                      <li><Link to='/ads'>Resume</Link></li>
                      <li><Link to='/ads'>Blog</Link></li>
                      <li><Link to='/ads'>Contact</Link></li>
                    </div>

                  </ul>
              </div>
            </nav>
          </div>
        )
    }
}

export default Navbar;
