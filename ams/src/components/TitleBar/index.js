import './index.scss'
const Index = (props) => {
    const { location, objTitleBack } = props
    const current = location.pathname.split('/')
    let backUrl = `/${current[1]}`
    backUrl = current.length === 3 ? backUrl : objTitleBack[backUrl]
    return (
        <div className="titleBar">
            <div className="box">
                <a className="icon back" href={`${window.isHashHistory}${backUrl}`}></a>
                <i className={classnames({"icon":true,"title":true,[current[1]]:true})}  />
            </div>
            <div className="clearboth thinner-border"></div>
        </div>
    )
}
export default Index