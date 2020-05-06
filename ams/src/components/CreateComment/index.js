import './index.scss'
// import Confirm from '../../components/Confirm';
 const Index = (props) => {
    const {
        needNote = false,
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
        handleChangeNote = (e) => {
            alert(e.target.value)
        },
        
    } = props
    const styleObj = type === 'password' ? {
        height: '3.75rem'
    } : {}
    return (
        <div>
            <Mask />
            <div className="createComment">
                <div className="topp">
                    <div className="cancel" onClick={handleClickCancel}>{textCancel}</div>
                    <div className="title">{textTitle}</div>
                    <div className="okay" onClick={handleClickOkay}>{textOkay}</div>
                </div>
                <div
                    className="write"
                    style={styleObj}
                >
                    {
                        type === 'password' ? (
                            <input
                                onBlur={() => { document.documentElement.scrollTop=document.body.scrollTop=0 }}
                                onChange={handleChangeInput} 
                                placeholder={textPlaceholder} 
                                maxLength={maxLength}
                                defaultValue={defaultValue}
                                type="password" />
                        ) : <textarea
                                onBlur={() => { document.documentElement.scrollTop=document.body.scrollTop=0 }}
                                onChange={handleChangeInput} 
                                placeholder={textPlaceholder} 
                                maxLength={maxLength} defaultValue={defaultValue}></textarea>
                    }
                </div>
                {
                    needNote ? (
                        <div
                            className="write"
                            style={styleObj}
                        >
                            <input 
                                onChange={handleChangeNote} 
                                placeholder={'请输入备注'} 
                                maxLength={maxLength}
                                defaultValue={defaultValue}
                                type="text" />
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}
export default Index