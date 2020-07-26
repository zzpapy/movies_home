// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, ActivityIndicator,ScrollView,Text,Image,Button,TouchableOpacity } from 'react-native'
import { getFilmDetail,getImageFromApi} from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import FilmCast from './FilmCast'
import Search from './Search'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabNav from './TabNav'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
      isLoading: true,
      update:false // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      // Si isLoading vaut true, on affiche le chargement à l'écran
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    if(this.props.route.params.idFilm === nextProps.route.params.idFilm && this.state.update === true){
     this.setState({
       update:false
     })
      return false
    }
    else{
      // console.log(this.props.route.params.idFilm,"tete",this.state.update)
      getFilmDetail(this.props.route.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false,
          update: true
        })
      })
      return true
    }

  }
  componentDidMount() {
    getFilmDetail(this.props.route.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }
  _afficheImg() {
    const { film } = this.state
    if(film.poster_path !== null){
      if(film.backdrop_path !== null){
      }
      let img = getImageFromApi(film.backdrop_path)
      return (
        <Image
            style={styles.image}
            source={{uri: img}}
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
    _displayCast = () => {
      const { film } = this.state
      this.props.navigation.navigate("FilmCast", { cast: film.credits })
    }
    _displayFilm() {
        const { film } = this.state
        if (this.state.film != undefined) {
            return (
              <ScrollView style={styles.scrollview_container}>
                {this._afficheImg()}
                {/* <Image
                  style={styles.image}
                  source={{uri: getImageFromApi(film.backdrop_path)}}
                /> */}
                <Text style={styles.title_text}>{film.title}</Text>
                <View style={{flex:1, flexDirection:'row',justifyContent:'space-around'}}>
                  <TouchableOpacity
                      style={styles.favorite_container}
                      onPress={() => this._toggleFavorite()}>
                      {this._displayFavoriteImage()}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this._displayCast()}>
                    <Image
                      style={styles.cast_image}
                      source={require('../Images/casting.png')}
                    />                  
                  </TouchableOpacity>
                </View>
                <Text style={styles.description_text}>{film.overview}</Text>
                <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                    return genre.name;
                  }).join(" / ")}
                </Text>
                <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                    return company.name;
                  }).join(" / ")}
                </Text>
                <TabNav />
              </ScrollView>
            )
        }
    }
    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
          // Film dans nos favoris
          sourceImage = require('../Images/ic_favorite.png')
        }
        return (
          <Image
            style={styles.favorite_image}
            source={sourceImage}
          />
        )
    }
    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }
    componentDidUpdate() {
        
      }

  render() {
    const Tab = createBottomTabNavigator()
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    main_container: {
      flex: 1
    },
    cast_image : {
      width: 50,
      height: 50
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    scrollview_container: {
      flex: 1
    },
    image: {
      height: 169,
      margin: 5
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 35,
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 10,
      color: '#000000',
      textAlign: 'center'
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666',
      margin: 5,
      marginBottom: 15
    },
    default_text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
    }
  })

  const mapStateToProps = (state) => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }
  
  
  export default connect(mapStateToProps)(FilmDetail)