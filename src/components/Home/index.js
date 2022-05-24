import {Component} from 'react'
import {Link} from 'react-router-dom'
import {Carousel} from 'react-bootstrap'
import Header from '../Header'
import SmallNavCont from '../SmallNavCont'
import ReactSlick from '../ReactSlick'
import HeaderContext from '../../HeaderContext/HeaderContext'
import './index.css'

class Home extends Component {
  render() {
    return (
      <HeaderContext.Consumer>
        {value => {
          const {theme, showNavCont} = value

          const homeCont = theme ? 'dark-home' : ''
          const heading = theme ? 'h1-dark' : ''
          const para = theme ? 'p-dark' : ''
          return (
            <>
              <Header />
              {showNavCont ? <SmallNavCont /> : ''}
              <div className={`home-cont ${homeCont}`}>
                <h1 className={`home-heading ${heading}`}>
                  Find Your Next Favorite Books?
                </h1>
                <p className={`home-desc ${para}`}>
                  You are in the right place. Tell us what titles or genres you
                  have enjoyed in the past, and we will give you surprisingly
                  insightful recommendations.
                </p>
                <div className="find-books-cont">
                  <Link to="/shelf">
                    <button type="button" className="topRated-btn">
                      Find Books
                    </button>
                  </Link>
                </div>
                <div>
                  <Carousel className="carousel-con">
                    <Carousel.Item>
                      <img
                        className="d-block w-100 cor-img"
                        src="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 cor-img "
                        src="https://c4.wallpaperflare.com/wallpaper/816/223/588/spider-man-comics-green-goblin-movies-wallpaper-preview.jpg"
                        alt="Second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 cor-img"
                        src="https://c0.wallpaperflare.com/preview/160/22/548/stock-exchange-boom-economy-pay.jpg"
                        alt="Third slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 cor-img"
                        src="https://c4.wallpaperflare.com/wallpaper/993/19/712/sachin-tendulkar-god-of-cricket-wallpaper-preview.jpg"
                        alt="Third slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 cor-img"
                        src="https://c4.wallpaperflare.com/wallpaper/335/936/967/antibiotic-capsules-close-up-cure-wallpaper-preview.jpg"
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>
              <div className="mt-4">
                <ReactSlick />
              </div>
            </>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default Home
