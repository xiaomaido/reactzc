import './index.css'
import star from './images/star.png'
const Index = (props) => {
	const { number = 5 } = props
	const length = Math.floor(number)
	const ds = Array.apply(null, { length })
	return (
		<div className="stars-show">
			{
				ds.map((d, i)=> <div key={i} ><img src={star} /></div>)
			}
			{
				(number - length) >= 0.5 ? <div className="half"><img src={star} /></div> : null
			}
		</div>
	)
}
export default Index