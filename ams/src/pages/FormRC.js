import React, { Component } from 'react'
import { createForm } from 'rc-form'
class FormRC extends Component{
    constructor(props){
        super(props)
        const { getFieldDecorator } = props.form
        this.requiredDecorator = getFieldDecorator('required', {
          rules: [
                {
                    required: true
                }
            ],
        })
    }
    render() {
        let errors
        const { getFieldProps, getFieldError } = this.props.form
        return (
            <div style={{padding:30}}>
                <div>rc form</div>
                <input { ...getFieldProps('normal') } />&nbsp;
                <input { ...getFieldProps('required', {
                        onChange(){ // have to write original onChange here if you need
                            debugger
                        }, 
                        rules: [
                            {
                                required: true
                            }
                        ],
                    }
                )} />
                &nbsp;<button onClick={this.submit.bind(this)}>submit</button>
                { 
                    errors = getFieldError('required') ? errors.join(',') : null
                }
            </div>
        )
    }
    submit() {
        const { form } = this.props
        const { validateFields } = form
        debugger
        form.validateFields((error, value) => {
            debugger
            console.log(error, value)
        })
    }
}
export default createForm()(FormRC)