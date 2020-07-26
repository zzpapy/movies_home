// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity,FlatList,ScrollView } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import ActorDetail from './ActorDetail'
import TabNav from './TabNav'

class FilmCast extends React.Component {
    _displayDetailForActor = (actorId) => {
        this.props.navigation.navigate("Acteur", { actorId: actorId })
      }
  render() {

    return (
          <FlatList
                  numColumns={3}
                  data={this.props.route.params.cast.cast}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (          
                      <ActorDetail actor={item} displayDetailForActor={this._displayDetailForActor} />                                    
                  )}                            
              />
    )
  }
}


export default FilmCast