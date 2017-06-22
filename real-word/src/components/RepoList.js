import React, { Component } from 'react'
import Repo from '../components/Repo'

class RepoList extends Component {
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
            return (<h2>没有数据哦</h2>)
        return (
            <div>
                <ol style={{paddingLeft:'15px'}}>
                    { items.map(([repo,owner])=>(
                              <Repo repo={repo} key={repo.fullName} owner={owner} />
                            )) }
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
        }
        const {
            isFetching
            ,handleLoadMore
        } = this.props
        return (
            <div style={style} onClick={handleLoadMore}>
            { isFetching?'打星项目加载中...':'加载更多打星项目' }
            </div>
        )
    }

}

RepoList.defaultProps={
    isFetching:true,
    loadingFlag:'打星项目加载中...'
}

export default RepoList
