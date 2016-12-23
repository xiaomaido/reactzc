import React, { Component } from 'react'
import { AppRegistry, View, Text, Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	blue:{
		color:"blue"
	},
	red:{
		color:"red"
	},
	bold:{
		fontWeight:"bold"
	},
	large:{
		fontSize:"15"
	},
	powderblue:{
		backgroundColor: "powderblue"
	},
	skyblue:{
		backgroundColor: "skyblue"
	},
	flex1:{
		flex:1
	},
	flex2:{
		flex:2
	}
})

class Blink extends Component {
	constructor(props){
		super(props)
		this.state={show:true}
		setInterval(()=>{
			this.setState({show:!this.state.show})
		},1000)
	}
	render(){
		let showText=this.state.show?this.props.content:""
		return (
			<Text style={{marginTop:10}}>{showText}</Text>
		)
	}
}

class Player extends Component {
	render(){
		return (
			<Text>{this.props.name} {this.props.number} </Text>
		)
	}
}

class HelloWordApp extends Component {
	render(){
		let picture = {
	    	uri: 'http://st-prod.b0.upaiyun.com/zeus/2016/12/15/79485354befeeea7c0bf3d9a57249c0d!/format/jpg'
	    };
		return (
			<View style={{alignItems: 'center'}}>
				<Text>It's React Native App</Text>
				<Text style={[styles.red, styles.bold]}>'View' and 'Text'</Text>
                <Text style={styles.blue}>instead of 'div' and 'span'</Text>
				<Player name="James Harden" number="13"/>
				<Player name="Eric Gorden" number="10"/>
				<Player name="Ryan Anderson" number="3"/>
				<Player name="Trevor Ariza" number="1"/>
				<Image source={picture} style={{marginTop:30,width: 200, height: 200}}/>
				<Blink content="亮了" />
			</View>
		)
	}
}
AppRegistry.registerComponent('HelloWordApp',() => HelloWordApp)