import './index.scss'
 const Index = (props) => {
    const { 
        maxLength = 100,
        textPlaceholder = '发表评论是搭讪成功的第一步哦~',
        textTitle = '写评论',
        textCancel = '取消',
        textOkay = '确定',
        handleClickCancel = (e) => {
            alert('cancel')
        },
        handleClickOkay = (e) => {
            alert('okay')
        },
        handleChangeInput = (e) => {
            alert(e.target.value)
        },
    } = props
    return (
        <div>
            <Mask />
            <div className="createComment">
                <div className="topp">
                    <div className="cancel" onClick={handleClickCancel}>{textCancel}</div>
                    <div className="title">{textTitle}</div>
                    <div className="okay" onClick={handleClickOkay}>{textOkay}</div>
                </div>
                <div className="write">
                    <textarea 
                        onChange={handleChangeInput} 
                        placeholder={textPlaceholder} 
                        maxLength={maxLength}></textarea>
                </div>
            </div>
        </div>
    )
}
export default Index