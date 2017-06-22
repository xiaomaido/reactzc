import React, { Component } from 'react'
import User from '../components/User'

class UserList extends Component {
    render() {
        const { 
            isFetching
            ,loadingFlag
            ,items 
            ,pageCount
            ,nextPageUrl
        } = this.props
        if(!items.length && isFetching)
            return (<h2>{loadingFlag}</h2>)
        if(!items.length && !nextPageUrl) 
            return (<h2>没有人打星哦！</h2>)
        return (
            <div>
                <ol style={{paddingLeft:'15px'}}>
                    { items.map(user=>(<User user={user} key={user.login} ></User>)) }
                </ol>
                {pageCount && nextPageUrl && this.renderLoadMore()}
            </div>
        )
    }
    renderLoadMore(){
        const style={
            backgroundColor:'#202020'
            ,color:'#fff'
            ,width:'220px'
            ,textAlign: 'center'
            ,padding: '10px 0'
            ,margin: '1rem auto'
        }
        const {
            isFetching
            ,handleLoadMore
        } = this.props
        return (
            <div style={style} onClick={handleLoadMore}>
            { isFetching?'打星用户加载中...':'加载更多打星用户' }
            </div>
        )
    }

}

UserList.defaultProps={
    isFetching:true,
    loadingFlag:'打星用户加载中...'
}

export default UserList
