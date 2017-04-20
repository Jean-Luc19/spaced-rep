import React, { Component } from 'react';

class QuestionPageTitle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            hidden: 'hidden'
        }
    }

    changeClass() {
        const timeOut = setTimeout(
            () => this.setState({hidden: ''})
            ,500)

    }

    componentDidMount(){
        this.changeClass()
    }

    render() {
        const style2 = {transform: `translate(${0}px, ${0}px)`};
        const title = this.props.title.split('').map((x,i) => <li key={i} style={this.state.hidden ? {transform: `translate(${Math.floor(Math.random() * 400) - 200}px, ${Math.floor(Math.random() * 400) - 200}px)`} : style2}>{x}</li>)
        return (
            <div>
                <ul className={`fly-in-text ${this.state.hidden}`}>
                    {title}
                </ul>
            </div>
        )
    }
}



export default QuestionPageTitle
