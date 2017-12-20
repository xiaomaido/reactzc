import './index.scss'
const Index = (props) => {
    const { location, objTitleBack } = props
    const current = location.pathname.split('/')
    const { search, query } = props.location
    const _t = query._t || 'EAT'
    let titleimg = current[1] + _t.toLowerCase()
    let backUrl = ''
    // window.locationFrom = window._location
    // if(window.locationFrom && typeof window.locationFrom === 'object'){
    //     backUrl = window.locationFrom.pathname
    // }else{
        backUrl = `/${current[1]}`
        backUrl = current.length === 3 ? backUrl : objTitleBack[backUrl]
        if(backUrl === '/'){
            if(_t === 'SLEEP') backUrl='/hotel'
            else if(_t === 'TOUR') backUrl='/trip'
        }
        else if(backUrl === '/posthot' || backUrl === '/videohot'){
            backUrl = backUrl + search
        }
        else if(backUrl === '/shophot'){
            if(_t === 'SLEEP') backUrl='/hotelhot'
            else if(_t === 'TOUR') backUrl='/triphot'
        }
    // }
    console.log(backUrl)
    return (
        <div className="titleBar">
            <div className="box">
                <a className="icon back" href={`${window.isHashHistory}${backUrl}`}></a>
                <i className={classnames({"icon":true,"title":true,[titleimg]:true})}  />
            </div>
            <div className="clearboth thinner-border"></div>
        </div>
    )
}
export default Index