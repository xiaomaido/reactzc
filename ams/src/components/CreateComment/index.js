import './index.scss'
// import Confirm from '../../components/Confirm';
 const Index = (props) => {
    const { 
        type = 'textarea',
        defaultValue = '',
        maxLength = 50,
        textPlaceholder = '发表评论是搭讪成功的第一步哦~',
        textTitle = '写评论',
        textCancel = '取消',
        textOkay = '确定',
        handleClickCancel = (e) => {
            // Confirm.show({
            //     title: 'cancel',
            // })
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
                    {
                        type === 'password' ? (
                            <input 
                                onChange={handleChangeInput} 
                                placeholder={textPlaceholder} 
                                maxLength={maxLength}
                                defaultValue={defaultValue}
                                type="password" />
                        ) : <textarea 
                                onChange={handleChangeInput} 
                                placeholder={textPlaceholder} 
                                maxLength={maxLength} defaultValue={defaultValue}></textarea>
                    }
                </div>
            </div>
        </div>
    )
}
export default Index