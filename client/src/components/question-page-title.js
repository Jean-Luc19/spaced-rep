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
            ,100)

    }

    componentDidMount(){
        this.changeClass()
    }

    render() {
        const style2 = {transform: `translate(${0}px, ${0}px)`};
        const title = this.props.title.toUpperCase().split('').map((x,i) => <span key={i} style={this.state.hidden ? {transform: `translate(${Math.floor(Math.random() * - 800) + 400}px, ${Math.floor(Math.random() * - 800) + 400}px)`} : style2}>{x}</span>)
        return (
            <div>
                <div className={`fly-in-text ${this.state.hidden}`}>
                    {title}
                </div>
            </div>
        )
    }
}



export default QuestionPageTitle
