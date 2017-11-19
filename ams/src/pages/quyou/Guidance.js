import guidancemap from '../../images/quyou/banner/guidancemap.png'

export default class Index extends Quyou{
	render(){
        document.title='导览图'
        return (
            <div className="mall trip-guidance">
                <ul className="ad-list">
                    <li>
                        <a href={`${window.isHashHistory}/guidance/1`} className="icon big" style={{backgroundImage:`url(${guidancemap})`}}></a>
                    </li>
                    <li>
                        <a href={`${window.isHashHistory}/guidance/2`} className="icon big" style={{backgroundImage:`url(${guidancemap})`}}></a>
                    </li>
                    <li>
                        <a href={`${window.isHashHistory}/guidance/3`} className="icon big" style={{backgroundImage:`url(${guidancemap})`}}></a>
                    </li>
                </ul>
            </div>
        )
    }
}