import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';


/**
 title,
 desc,
 callBacks: [
   {text, onClick}
 ]
 */

class Confirm extends React.PureComponent {

    state = {
        active: 0,
        close: false,
    }

    close () {
        this.setState({close: true});
    }

    render () {
        const {
            title,
            desc,
            subDesc,
            callBacks=[],
        } = this.props.content

        let closeClass = '';
        if (this.state.close) {
            closeClass = 'close';
        }
        return (
            <div className={`qy-confirm-parent ${closeClass}`}>

                <div className="qy-confirm">
                    <div className="close" onClick={()=> this.setState({close: true})}>

                    </div>
                    <div className="content">
                        <div className="title">{title}</div>
                        <div className="desc">{desc}</div>
                        <div className="buttons">
                            {
                                callBacks.map((item, index) => {
                                    let activeClass = '';
                                    if (index === this.state.active) {
                                        activeClass = 'active';
                                    }
                                    return <div key={index} className={`button ${activeClass}`} onClick={()=> {
                                        this.setState({active: index});
                                        item.onClick(index);
                                    }}>{item.text}</div>
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

let model = null;

export default {
    show(content) {
        const div = document.createElement('div');
        document.body.appendChild(div);
        ReactDOM.render(<Confirm ref={t => model = t} content={content} />, div);
    },
    close() {
        model.close();
    }
}
