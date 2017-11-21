import './index.scss'
const Index = (props) => {
    const { 
        maxLength,
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
                    <div className="cancel" onClick={handleClickCancel}>取消</div>
                    <div className="title">写评论</div>
                    <div className="okay" onClick={handleClickOkay}>发布</div>
                </div>
                <div className="write">
                    <textarea onChange={handleChangeInput} placeholder="发表评论是搭讪成功的第一步哦~" maxLength={maxLength}></textarea>
                </div>
            </div>
        </div>
    )
}
export default Index