// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'
import ActorDetail from './ActorDetail'

class FilmList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
  }

  _displayDetailForActor = (actorId) => {
    this.props.navigation.navigate("Acteur", { actorId: actorId })
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.actors}
          extraData={this.props.favoritesFilm}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (          
            <ActorDetail actor={item} displayDetailForActor={this._displayDetailForActor} />                                    
        )}  
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.props.page < this.props.totalPages) {
              // On appelle la méthode loadFilm du component Search pour charger plus de films
              this.props.loadActors()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmList)