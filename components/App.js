//import liraries
import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, Platform } from 'react-native';

import routes from '../routes';
import MainScreen from './MainScreen';
import SignInContainer from '../containers/SignInContainer';
import ChatContainer from '../containers/ChatContainer';
import NavBarRouteMapper from './NavBarRouteMapper';

import { getCustomerInfo } from '../storageManager';

// create a component
class App extends Component {
    constructor(props) {
        super(props);
        this._renderScene = this._renderScene.bind(this);
    }

    componentDidMount() {
        getCustomerInfo()
            .then(data => {
                if (data.name && data.accountNumber) {
                    console.log('Going to restore from storage: ', data);
                    this.props.onRehydrateFromLocalStorage(data.name, data.accountNumber);
                }
            });
    }

    _renderScene(route, navigator) {
        switch (route.name) {
            case 'SignInScreen':
                return <SignInContainer navHandler={() => { navigator.push(routes.chat) }} />;
            case 'ChatScreen':
                return <ChatContainer />;
            case 'MainScreen':
            default:
                if (this.props.name.length && this.props.accountNumber.length) {
                    return <MainScreen getHelpPressHandler={() => { navigator.push(routes.chat) }} />;
                }
                return <MainScreen getHelpPressHandler={() => { navigator.push(routes.signIn) }} />;
        }
    }

    render() {
        return (
            <Navigator 
                initialRoute={routes.main}
                renderScene={this._renderScene}
                style={styles.container}
                sceneStyle={styles.sceneContainer}
                navigationBar={<Navigator.NavigationBar
                    routeMapper={NavBarRouteMapper}
                    style={styles.navBar}
                    navigationStyles={Navigator.NavigationBar.StylesIOS}
                />}
            />
        );
    }
}

App.propTypes = {
    name: PropTypes.string,
    accountNumber: PropTypes.string,
    onRehydrateFromLocalStorage: PropTypes.func.isRequired,
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sceneContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: Platform.OS === 'ios' ? 64 : 64,
    },
    navBar: {
        backgroundColor: '#efefef',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#494949',
        // height: 40,
    }
});

//make this component available to the app
export default App;
