import gjxl from '../../images/quyou/trip/gjxl.png'

export default class Index extends Quyou{
	renderContent(){
        document.title='公交时刻表'
        return (
            <div className="trip-busline">
                <img className="gjxl" src={gjxl} />
                <div className="line-table"></div> 
            </div>
        )
    }
}