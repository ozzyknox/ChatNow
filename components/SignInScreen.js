//import liraries
import React, { Component, PropTypes } from 'react';
import { 
    View,
    Text, 
    TextInput, 
    TouchableOpacity, 
    Linking,
    StyleSheet,
    AsyncStorage,
} from 'react-native';

import { setCustomerInfo } from '../storageManager';

// create a component
const SignInScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.label}>My Name:</Text>
                <TextInput 
                    style={styles.textbox} 
                    underlineColorAndroid="#fff" 
                    value={props.name}
                    onChangeText={props.onNameUpdate}
                />

                <Text style={styles.label}>My Account Number:</Text>
                <TextInput 
                    style={styles.textbox} 
                    keyboardType="numeric" 
                    underlineColorAndroid="#fff" 
                    value={props.accountNumber}
                    onChangeText={props.onAccountNumberUpdate}
                />

                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => { goPressHandler(props.navHandler, props.name, props.accountNumber) }}
                >
                    <Text style={styles.actionButtonText}>Go</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.externalLink} onPress={openHelpPage}>Forgot your account number?</Text>
        </View>
    );
};

SignInScreen.propTypes = {
    name: PropTypes.string,
    accountNumber: PropTypes.string,
    onNameUpdate: PropTypes.func.isRequired,
    onAccountNumberUpdate: PropTypes.func.isRequired,
    navHandler: PropTypes.func.isRequired,
}

function goPressHandler(navHandler, name, accountNumber) {
    setCustomerInfo(name, accountNumber)
        .then(() => navHandler())
        .catch(ex => {
            console.log('Error storing customer name and account, proceeding anyway. Details: ', ex);
            navHandler();
        });

}

function openHelpPage() {
    Linking.openURL('https://www.google.co.uk');
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#68b8db',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontSize: 20,
        marginTop: 36,
        marginBottom: 6,
        color: '#fff',
        fontWeight: 'bold',
    },
    textbox: {
        height: 40,
        width: 300,
        color: '#4ba3c9',
        borderWidth: 2,
        borderColor: '#4d96b5',
        borderRadius: 6,
        backgroundColor: '#fff',
        paddingHorizontal: 5
    },
    actionButton: {
        marginTop: 36,
        alignSelf: 'flex-end',
        backgroundColor: '#cb3b27',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 20
    },
    externalLink: {
        fontSize: 12,
        color: '#dfdfdf',
        textDecorationLine: 'underline',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 10,
    }
});

//make this component available to the app
export default SignInScreen;
