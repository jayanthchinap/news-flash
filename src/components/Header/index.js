import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaBars} from 'react-icons/fa'

import './index.css'
import HeaderContext from '../../HeaderContext/HeaderContext'

class Header extends Component {
  render() {
    return (
      <HeaderContext.Consumer>
        {value => {
          const {
            activeLink,
            onClickBookShelves,
            onClickBookBolly,
            onClickBookBusiness,
            onClickBookSports,
            onClickBookHealth,
            onClickHome,
            theme,

            onClickNavIcon,
          } = value

          const onClickNavButton = () => {
            onClickNavIcon()
          }

          const onClickLogout = () => {
            const {history} = this.props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          const onClickHomeLink = () => {
            onClickHome()
          }

          const onClickShelf = () => {
            onClickBookShelves()
          }

          const onClickBolly = () => {
            onClickBookBolly()
          }

          const onClickBusiness = () => {
            onClickBookBusiness()
          }

          const onClickSports = () => {
            onClickBookSports()
          }

          const onClickHealth = () => {
            onClickBookHealth()
          }

          const headerCont = theme ? 'dark' : ''
          const iconColor = theme ? 'white' : 'black'
          return (
            <div className={`nav-cont ${headerCont}`}>
              <Link to="/">
                {theme ? (
                  <h1 className="navbar-logo-dark">Book Hub</h1>
                ) : (
                  <img
                    src="https://i.ibb.co/VxXZcV2/logo-272x90.png"
                    alt="website logo"
                    className="navbar-logo"
                  />
                )}
              </Link>
              <div className="nav-icon">
                <button
                  type="button"
                  className="nav-btn"
                  onClick={onClickNavButton}
                >
                  <FaBars color={iconColor} />
                </button>
              </div>

              <ul className="nav-links-cont">
                <li className="nav-links">
                  <Link
                    to="/"
                    className={
                      activeLink === 'home' ? 'nav-links active' : 'nav-links'
                    }
                    onClick={onClickHomeLink}
                  >
                    <p>Home</p>
                  </Link>
                </li>
                <li className="nav-links">
                  <Link
                    to="/shelf"
                    className={
                      activeLink === 'bookShelf'
                        ? 'nav-links active'
                        : 'nav-links'
                    }
                    onClick={onClickShelf}
                  >
                    <p>Bookshelves</p>
                  </Link>
                </li>
                <li className="nav-links">
                  <Link
                    to="/entertainment"
                    className={
                      activeLink === 'entertainment'
                        ? 'nav-links active'
                        : 'nav-links'
                    }
                    onClick={onClickBolly}
                  >
                    <p>Entertainment</p>
                  </Link>
                </li>

                <li className="nav-links">
                  <Link
                    to="/business"
                    className={
                      activeLink === 'business'
                        ? 'nav-links active'
                        : 'nav-links'
                    }
                    onClick={onClickBusiness}
                  >
                    <p>Business</p>
                  </Link>
                </li>

                <li className="nav-links">
                  <Link
                    to="/sports"
                    className={
                      activeLink === 'sports' ? 'nav-links active' : 'nav-links'
                    }
                    onClick={onClickSports}
                  >
                    <p>Sports</p>
                  </Link>
                </li>

                <li className="nav-links">
                  <Link
                    to="/health"
                    className={
                      activeLink === 'health' ? 'nav-links active' : 'nav-links'
                    }
                    onClick={onClickHealth}
                  >
                    <p>Health</p>
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    className="logout-btn"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default withRouter(Header)
