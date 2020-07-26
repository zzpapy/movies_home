// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi, getActor } from '../API/TMDBApi'
import TabNav from './TabNav'

class ActorDetail extends React.Component {  
    
  render() {
    const { actor, displayDetailForActor} = this.props
    return (
    <TouchableOpacity
        onPress={() => displayDetailForActor(actor.id)}>
       
                <Text>{actor.name}</Text>
                <Image
                    style={styles.image}
                    source={{uri: getImageFromApi(actor.profile_path)}}
                />
                {/* <TabNav /> */}
     </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
   
    image: {
      width: 120,
      height: 180,
      margin: 5
    }
})

export default ActorDetail