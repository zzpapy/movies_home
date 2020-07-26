// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity,StackActions } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'


class FilmItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }
  
  
  _afficheImg() {
    const { film, displayDetailForFilm } = this.props
    if(film.poster_path !== null){
      return (
        <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
      )
    }
    else{
      return(
        <Image
            style={styles.image}
            source={require('../Images/cine.jpg')}
          />
      )
    }
  }
  render() {
    const { film, displayDetailForFilm } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForFilm(film.id)}>
        {this._afficheImg()}
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            {this._displayFavoriteImage()}
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.date_container}>
          <Text>{moment(film.release_date).format('DD-MM-YYYY')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

export default FilmItem