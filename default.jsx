import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ImageBackground,
TouchableHighlight, Alert, Dimensions } from 'react-native';
import Constants from 'expo-constants';

//Note - the only functionality is in transitioning from titleScreen to mainScreen
//so that the layout of both screens is accessible

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
let conversions = [[0.94,19.75,1.36,0.0000575],[59.33,1.45,0.000061, 1.06],
[0.069,0.0000029,0.051,0.048],[0.000042,0.73,0.69,14.50],[17386.40,16333.70,343874.86,23718.22]];
let symbols = [['€','$','$','₿'],['$','$','₿','$'],['$','₿','$','€'],['₿','$','€','$'],['$','€','$','$']];

export default class App extends Component {
    state = {
        inputMoney: 0,
        outputMoney: 0,
        outputSymbol: '$',
        outputText: 'USD',
        //$ - USD, Dollar, Peso
        //€ - Euro
        //₿ - Bitcoin
        appState: 0,
        inputPrompt: 'USD',
        zerothButtonText: 'USD',
        firstButtonText: 'Euro',
        secondButtonText: 'Mexican Peso',
        thirdButtonText: 'Canadian Dollar',
        fourthButtonText: 'Bitcoin',
        titlePage: 'flex',
        mainPage: 'none'
    }
    
    handlePagePress = (inputCurrency) => {
        this.setState({titlePage: 'none'})
        this.setState({mainPage: 'flex'})
        this.mainState(inputCurrency)
    }
    
    
    
    
    
    
    render() {
        return (
            <View style = {{height: deviceHeight, width: deviceWidth, alignItems: 'center',
             backgroundColor: 'aquamarine', flexDirection: 'column'}}>
                
                {/*App Title*/}    
                <View style = {{height: deviceHeight*0.14, width: deviceWidth,
                justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {{fontSize: deviceHeight/16, color: 'darkgreen', textAlign: 'center', fontWeight: 'bold'}}>
                    CURRENCY CONVERTER
                    </Text>
                </View>
                
                <View style = {{display: this.state.titlePage}}>
                
                
                
                {/*User message to choose input currency at start of runtime*/}
                <View style = {{height: deviceHeight*0.12, width: deviceWidth}}>
                <Text style = {{textAlign: 'center', fontSize: deviceHeight/18, fontWeight: 'bold'}}>
                Choose your input currency to begin.
                </Text>
                </View>
                
                <TouchableHighlight style={styles.titleButton}
                    onPress={() => this.handlePagePress(this.state.zerothButtonText)}
                    >
                        <Text style={{fontSize: deviceHeight/30, textAlign: 'center', color: 'darkblue'}}>
                            {this.state.zerothButtonText}
                        </Text>
                    </TouchableHighlight>
                
                <TouchableHighlight style={styles.titleButton}
                    onPress={() => this.handlePagePress(this.state.firstButtonText)}
                    >
                        <Text style={{fontSize: deviceHeight/30, textAlign: 'center', color: 'darkblue'}}>
                            {this.state.firstButtonText}
                        </Text>
                    </TouchableHighlight>
                
                
                <TouchableHighlight style={styles.titleButton}
                    onPress={() => this.handlePagePress(this.state.secondButtonText)}
                    >
                        <Text style={{fontSize: deviceHeight/30, textAlign: 'center', color: 'darkblue'}}>
                            {this.state.secondButtonText}
                        </Text>
                    </TouchableHighlight>
                    
                        
                    
                <TouchableHighlight style={styles.titleButton}
                    onPress={() => this.handlePagePress(this.state.thirdButtonText)}
                >
                    <Text style={{fontSize: deviceHeight/30, textAlign: 'center', color: 'darkblue'}}>
                        {this.state.thirdButtonText}
                    </Text>
                </TouchableHighlight>
                
                <TouchableHighlight style={styles.titleButton}
                    onPress={() => this.handlePagePress(this.state.fourthButtonText)}
                >
                    <Text style={{fontSize: deviceHeight/30, textAlign: 'center', color: 'darkblue'}}>
                        {this.state.fourthButtonText}
                    </Text>
                </TouchableHighlight>
                
                </View>
                
                <View style = {{display: this.state.mainPage}}>
                
                <View style = {{height: deviceHeight*0.07, width: deviceWidth,
                justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {{fontSize: deviceHeight/25, color: 'darkgreen', textAlign: 'center', fontWeight: 'bold'}}>
                    Converted Value:
                    </Text>
                </View>
                
                {/*Conversion Result*/}
                <View style = {{height: deviceHeight*0.07, width: deviceWidth,
                justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {{fontSize: deviceHeight/20, color: 'darkgreen', textAlign: 'center', fontWeight: 'bold'}}>
                    {this.state.outputSymbol}{this.state.outputMoney} {'\n'} {this.state.outputText}
                    </Text>
                </View>
                
                        
                {/*Subheader to ask user to enter value in input currency*/}
                <View style = {{height: deviceHeight*0.10, width: deviceWidth, justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{textAlign: 'center', fontSize: deviceHeight/19, fontWeight: 'bold'}}>
                {this.state.inputPrompt} Value
                </Text>
                </View>
                    
                {/*Text input for money to be converted*/}
                <View style = {{height: deviceHeight*0.07, width: deviceWidth, justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput style={{textAlign: 'center', fontSize: deviceHeight/24, borderWidth: 2}}
                            onChangeText={(inputMoney) => this.setState({inputMoney})}
                            value={this.state.inputMoney}
                    />
                </View>
                
                    
                {/*First Button Row*/}
                <View style = {{height: deviceHeight*0.12, flexDirection: 'row', //borderWidth: 2,
                alignItems: 'center', justifyContent: 'center'}}>
                    
                    {/*First Convert Button*/}
                    <TouchableHighlight
                        onPress = {() => this.conversionPress(0)}
                        style = {styles.buttonView}
                    >
                    
                    <Text style = {{textAlign: 'center', color: 'aqua', fontSize: deviceHeight/30,
                    lineHeight: deviceHeight/24}}>
                    {this.state.firstButtonText}
                    </Text>
                    
                    </TouchableHighlight>
                    
                    
                    {/*Third Convert Button*/}
                    <TouchableHighlight
                        onPress = {() => this.conversionPress(2)}
                        style = {styles.buttonView}
                    >
                    
                    <Text style = {{textAlign: 'center', color: 'aqua', fontSize: deviceHeight/30,
                    lineHeight: deviceHeight/24}}>
                    {this.state.thirdButtonText}
                    </Text>
                    
                    </TouchableHighlight>

                </View>
                        
                        
                {/*Second Button Row*/}    
                <View style = {{height: deviceHeight*0.12, flexDirection: 'row', //borderWidth: 2,
                alignItems: 'center', justifyContent: 'center'}}>
                    
                    {/*Second Convert Button*/}
                    <TouchableHighlight
                        onPress = {() => this.conversionPress(1)}
                        style = {styles.buttonView}
                    >
                    
                    <Text style = {{textAlign: 'center', color: 'aqua', fontSize: deviceHeight/30,
                    lineHeight: deviceHeight/24}}>
                    {this.state.secondButtonText}
                    </Text>
                    
                    </TouchableHighlight>
                    
                    {/*Fourth Convert Button*/}
                    <TouchableHighlight
                        onPress = {() => this.conversionPress(3)}
                        style = {styles.buttonView}
                    >
                    
                    <Text style = {{textAlign: 'center', color: 'aqua', fontSize: deviceHeight/30,
                    lineHeight: deviceHeight/24}}>
                    {this.state.fourthButtonText}
                    </Text>
                    
                    </TouchableHighlight>
                    
                </View>
                    
                    
                    
                

                
                
                
                {/*Bottom NavBar Layout*/}
                <View style={styles.navbarContainer}>
                
                <View style = {{height: deviceHeight*0.03, width:deviceWidth}}>
                <Text style = {{textAlign: 'center', fontSize: deviceHeight/24, fontWeight: 'bold'}}>
                Mode
                </Text>
                </View>
                
                <View style = {{flexDirection: 'row'}}>
                    <TouchableHighlight style={styles.navButton}
                    onPress={() => this.mainState(this.state.firstButtonText)}
                    >
                        <Text style={{fontSize: deviceHeight/30, textAlign: 'center', color: 'darkblue'}}>
                            {this.state.firstButtonText}
                        </Text>
                    </TouchableHighlight>
                    
                    
                    <TouchableHighlight style={styles.navButton}
                    onPress={() => this.mainState(this.state.thirdButtonText)}
                    >
                        <Text style={{fontSize: deviceHeight/30, textAlign: 'center', color: 'darkblue'}}>
                            {this.state.thirdButtonText}
                        </Text>
                    </TouchableHighlight>
                </View>
                
                <View style = {{flexDirection: 'row'}}>
                    <TouchableHighlight style={styles.navButton}
                    onPress={() => this.mainState(this.state.secondButtonText)}
                    >
                        <Text style={{fontSize: deviceHeight/30, textAlign: 'center', color: 'darkblue'}}>
                            {this.state.secondButtonText}
                        </Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight style={styles.navButton}
                    onPress={() => this.mainState(this.state.fourthButtonText)}
                    >
                        <Text style={{fontSize: deviceHeight/30, textAlign: 'center', color: 'darkblue'}}>
                            {this.state.fourthButtonText}
                        </Text>
                    </TouchableHighlight>
                </View>
                
                </View>
                
                
            </View>    
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    buttonView: {
        height: deviceHeight/10,
        width: deviceWidth/2.5,
        backgroundColor: 'darkcyan',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: deviceWidth/20,
        marginRight: deviceWidth/20
    },
    navbarContainer: {
        height: deviceHeight*0.29,
        width: deviceWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: 3,
        borderColor: 'brown',
    },
    navButton: {
        height: deviceHeight/10,
        width: deviceWidth/2.5,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: deviceWidth/20,
        marginRight: deviceWidth/20
    },
    titleButton: {
        height: deviceHeight/10,
        width: deviceWidth,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: deviceHeight/25
        //marginLeft: deviceWidth/20,
        //marginRight: deviceWidth/20
    }
});
