import spin from './images/spin.gif'
import spin2 from './images/spin2.gif'
import './index.scss'
const Spin2 = (props) => {
    return <img className="spin2" src={spin2} />
}
const Index = (props) => {
    return <img className="spin" src={spin} />
}
Index.Spin2 = Spin2
export default Index