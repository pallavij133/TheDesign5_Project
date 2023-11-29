import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const FeedScreen = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

// Using axios we have fetched API and will call at a time of Mounting screen 
   
useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    // Search the post 
    const handleSearchChange = (text) => {
        setSearchQuery(text);
    };

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleButtonPress = () => {
        // Navigate to the 'Add Post' screen
        navigation.navigate('Add Post');
    };
    return (
        <View>
              {/* Text Input to search Post */}
            <View style={styles.containerinput}> 
                <TextInput
                    style={styles.input}
                    placeholder="Search posts"
                    onChangeText={handleSearchChange}
                />
            </View>

            {/* Created Button Using TouchableOpacity to navigate Add to post Screen */}
            
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>Add Post</Text>
            </TouchableOpacity>
            
            {/* Used FlatList to display Api data */}

            <FlatList
                data={filteredPosts}
                keyExtractor={(post) => post.id}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text style={styles.textTitle}>{item.title}</Text>
                        <Text style={styles.textBody}>{item.body}</Text>
                    </View>
                )}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    containerinput: {
        padding: 16,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 20,
        marginBottom:15
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    textBody: {
        fontSize: 12,
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginTop: 5,
        paddingBottom: 20

    },
    textTitle: {
        marginTop: 10,
        fontSize: 15,
        color: 'blue',
        marginRight: 20
    }
});

export default FeedScreen;

