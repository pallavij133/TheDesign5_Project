import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPostScreen = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

// In handleSavePost you are getting title and body to save it to local storage we are using AsyncStorage
    
const handleSavePost = async () => {
        if (!title || !body) {
            return;
        }

        const newPost = {
            title,
            body,
        };

        try {
            const posts = await AsyncStorage.getItem('posts');
            console.log("post check",posts)
            const existingPosts = JSON.parse(posts) || [];
            existingPosts.push(newPost);
            console.log("existing post check --",existingPosts)
            await AsyncStorage.setItem('posts', JSON.stringify(existingPosts));
            alert('Post saved successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <View style={styles.containerinput}>
                <TextInput
                    style={styles.input}
                    placeholder="Post Title"
                    onChangeText={setTitle}
                    value={title}
                />
            </View>

            <View style={styles.containerinput}>
                <TextInput
                    style={styles.input}
                    placeholder="Post Body"
                    onChangeText={setBody}
                    value={body}
                    multiline={true}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSavePost}>
                <Text style={styles.buttonText}>Save Post</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    containerinput: {
        padding: 16,
    }, button: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 20
    },

});
export default AddPostScreen;
