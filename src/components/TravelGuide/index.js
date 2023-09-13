import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    inProgress: 'IN_PROGRESS'

}

class TravelGuide extends Component{
    state = {
        travelGuideData: [],
        apiStatus: apiConstants.initial
    }


    componentDidMount(){
        this.getTravelGuides()
    }

    getTravelGuides = async () => {
        this.setState({apiStatus: apiConstants.inProgress})

        const url = 'https://apis.ccbp.in/tg/packages'

        const response = await fetch(url)

        if (response.ok === true){
            const data = await response.json()

            const updatedData = data.packages.map(item => ({
                description: item.description,
                id: item.id,
                name: item.name,
                imageUrl: item.image_url
            }))

            this.setState({travelGuideData: updatedData, apiStatus: apiConstants.success})
        }

    }

    renderTravelGuideItem = details => {
        const {id, imageUrl, name, description} = details

        return(
            <li key={id} className='travel-guide'>
                <img className="img" src={imageUrl} alt={name} />
                <div className="details-container">
                    <h1 className="title"> {name} </h1>
                    <p className="description"> {description} </p>
                </div>
            </li>
        )
    }


    renderTravelGuide = () => {
        const {travelGuideData, apiStatus} = this.state

        if(apiStatus === apiConstants.success){
            return(
                <ul className="travel-guide-list-container">
                    {travelGuideData.map(item => this.renderTravelGuideItem(item))}
                </ul>
            )
        }
        else{
            return(
                <div data-testid="loader" className="loader-container">
                    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
                </div>
            )
        }
        
    }


    render(){
        return(
            <div className='bg-container'>
                <div className="responsive-container">
                    <h1 className="heading"> Travel Guide </h1>
                    {this.renderTravelGuide()}
                </div>
            </div>
        )
    }
}

export default TravelGuide