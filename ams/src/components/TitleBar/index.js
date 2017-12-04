import './index.scss'
const Index = (props) => {
    const { location, objTitleBack } = props
    const current = location.pathname.split('/')
    let backUrl = `/${current[1]}`
    backUrl = current.length === 3 ? backUrl : objTitleBack[backUrl]
    const { search, query } = props.location
    const _t = query._t || 'EAT'
    if(backUrl === '/'){
        if(_t === 'SLEEP') backUrl='/hotel'
        else if(_t === 'TOUR') backUrl='/trip'
    }
    else if(backUrl === '/posthot' || backUrl === '/videohot'){
        backUrl = backUrl + search
    }
    else if(backUrl === '/shophot'){
        if(_t === 'SLEEP') backUrl='/hotelhot'
        else if(_t === 'TOUR') backUrl='/hotelhot'
    }        
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