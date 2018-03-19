import './index.scss'
const Index = (props) => {
    const { location, objTitleBack } = props
    const current = location.pathname.split('/')
    const { search, query } = props.location
    const _t = query._t || 'EAT'
    let titleimg = current[1] + _t.toLowerCase()
    // if(titleimg === 'hotelhoteat' && query.tagname){
    //     titleimg = query.tagname
    // }
    // console.log('titleimg',titleimg)
    let backUrl = `/${current[1]}`
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
    window.locationFrom = window._location
    if(locationFrom && typeof locationFrom === 'object'){
        const pathnameFrom = locationFrom.pathname + locationFrom.search
        const pathnameNow = location.pathname + location.search
        console.log('pathnameFrom', pathnameFrom)
        console.log('pathnameNow', pathnameNow)
        if( 
            pathnameFrom === '/seasonhot'
            || (~pathnameNow.indexOf('/shophot/') && pathnameFrom === '/')
            || (~pathnameNow.indexOf('/shophot/') && pathnameFrom === '/hotel')
            || (~pathnameNow.indexOf('/shophot/') && ~pathnameFrom.indexOf('/hotelhot'))
            || (~pathnameNow.indexOf('/shophot/') && ~pathnameFrom.indexOf('/triphot'))
            || (~pathnameNow.indexOf('/shophot/') && ~pathnameFrom.indexOf('/foodhot/'))
            || (~pathnameNow.indexOf('/shophot/') && ~pathnameFrom.indexOf('/guidance/'))
            || (~pathnameNow.indexOf('/shophot/') && ~pathnameFrom.indexOf('/mallfuli'))
            || (~pathnameNow.indexOf('/videohot/') && pathnameFrom === '/')
            || (~pathnameNow.indexOf('/videohot/') && pathnameFrom === '/hotel')
            || (~pathnameNow.indexOf('/posthot/') && pathnameFrom === '/')
            || (~pathnameNow.indexOf('/posthot/') && pathnameFrom === '/trip')
            || (~pathnameNow.indexOf('/posthot/') && pathnameFrom === '/hotel')
        ) {
            backUrl = pathnameFrom
        }
    }
    console.log('backUrl', backUrl)
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