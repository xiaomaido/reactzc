
export default class CurrentRoutes extends Quyou{
	render(){
        // document.title='趣游崇明'
		return (
            <div style={{padding:'50px 20px',}}>
                { Object.keys(pageMapRoute).map(d=>(<div  key={d}><a href={`${window.isHashHistory}/${d}`} >{d}</a></div>)) }
            </div>
        )
	}
} 