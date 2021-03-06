//import liraries
import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const MessageBubble = (props) => (
    <View style={[styles.bubble, props.isOwnMessage && styles.ownBubble]}>
        <Text style={[styles.messageText, props.isOwnMessage && styles.ownMssageText]}>
            {props.message}
        </Text>
    </View>
);

MessageBubble.propTypes = {
    message: PropTypes.string.isRequired,
    isOwnMessage: PropTypes.bool.isRequired,
}

// define your styles
const styles = StyleSheet.create({
    bubble: {
        width: 250,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#ececec',
        borderRadius: 10,
    },
    ownBubble: {
        backgroundColor: '#457de5ff',
        alignSelf: 'flex-end',
    },
    messageText: {
        color: '#333',
    },
    ownMssageText: {
        color: '#fff',
    },
});

//make this component available to the app
export default MessageBubble;
