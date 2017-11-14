import './index.scss'
const Index = (props) => {
    const { activeNav,arrNav } = props
    return (
        <div className="navListBox">
            {
                arrNav.map(d=>(
                    <a key={d.nav} href={`${window.isHashHistory}${d.url}`}>
                        <i className={classnames({"icon":true,[d.nav]:true,"active":activeNav===d.nav})} />
                        <div>{d.name}</div>
                    </a>
                ))
            }
        </div>
    )
}
export default Index