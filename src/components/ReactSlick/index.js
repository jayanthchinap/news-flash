import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
// import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {Card, Row} from 'react-bootstrap'

import HeaderContext from '../../HeaderContext/HeaderContext'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   responsive: [
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// }

class ReactSlick extends Component {
  state = {topRatedList: [], dataStatus: 'loading'}

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async () => {
//     const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7e3f2f26c797454dbc5b6e16c9c2382a`
//     const request = new Request(url)
    const options = {
      method: 'GET',
      'mode': 'cors',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Access-Control-Allow-Origin': '*'
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({
        dataStatus: 'success',
      })
      // console.log(data.articles, 'art')
      const formattedData = data?.articles?.map(i => ({
        id: i.publishedAt,
        author: i.author,
        description: i.description,
        coverPic: i.urlToImage,
        title: i.title,
        url: i.url,
      }))
      // console.log(formattedData, 'data')
      this.setState(
        {
          topRatedList: formattedData,
        },
        this.getSuccessData,
      )
    } else {
      this.setState({
        dataStatus: 'failure',
      })
    }
  }

  renderSlider = () => {
    const {topRatedList} = this.state
    console.log(topRatedList, 'url')

    return (
      <HeaderContext.Consumer>
        {value => {
          const {theme} = value
          const heading = theme ? 'h1-dark' : ''
          const para = theme
          return (
            <div className="slick-list">
              {topRatedList.map(eachLogo => {
                const {id, coverPic, description, author, title, url} = eachLogo
                console.log(`"${url}"`)
                return (
                  <Row>
                    <li key={id}>
                      {/* <Link to={`/books/${id}`}> */}
                      <a href={url} target="_blank" rel="noreferrer">
                        <Card className="mt-3" style={{width: '315px'}}>
                          <div className="slick-item ">
                            <img
                              className="slick-logo-image"
                              src={coverPic}
                              alt={title}
                            />
                            <h1 className={`book-title ${heading}`}>{title}</h1>
                            <p className={`author-name ${para}`}>{author}</p>

                            <p className={`author-name ${para}`}>
                              {description}
                            </p>

                            <p className={`parag ${para}`}>{id}</p>
                          </div>
                        </Card>
                      </a>
                      {/* </Link> */}
                    </li>
                  </Row>
                )
              })}
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  getSuccessData = () => (
    <HeaderContext.Consumer>
      {value => {
        const {theme} = value
        const slickCont = theme ? 'slick-dark' : ''
        return (
          <ul className={`slick-container ${slickCont}`}>
            {this.renderSlider()}
          </ul>
        )
      }}
    </HeaderContext.Consumer>
  )

  getLoadingSpinner = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onclickTryAgainBtn = () => {
    this.getBooksData()
  }

  getErrorImage = () => (
    <div>
      <img
        src="https://res.cloudinary.com/harira/image/upload/v1650042814/BookHub/Group_7522_uhwe2g.jpg"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.onclickTryAgainBtn}>
        Try Again
      </button>
    </div>
  )

  getDataBasedOnStatus = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case 'loading':
        return this.getLoadingSpinner()
      case 'success':
        return this.getSuccessData()
      case 'failure':
        return this.getErrorImage()
      default:
        return null
    }
  }

  render() {
    return (
      <HeaderContext.Consumer>
        {value => {
          const {theme} = value

          const slickCont = theme ? 'slick-dark' : ''
          const heading = theme ? 'h1-dark' : ''
          return (
            <div className={`main-container ${slickCont}`}>
              <div className="heading-button-cont">
                <h1 className={`topRated-books-text ${heading}`}>
                  Top Rated Books
                </h1>

                <div className="find-books-slick">
                  <Link to="/shelf">
                    <button type="button" className="topRated-btn">
                      Find Books
                    </button>
                  </Link>
                </div>
              </div>
              <h1 className="break-head">Breaking News</h1>
              {this.getDataBasedOnStatus()}
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default ReactSlick
