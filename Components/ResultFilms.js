import React from 'react'
import { StyleSheet, FlatList,View,Text,ActivityIndicator } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'
import { getFilmsFromApiWithSearchedText, getActorByName } from '../API/TMDBApi'
import { ScrollView } from 'react-native-gesture-handler'


class ResultFilms extends React.Component {
    constructor(props) {
        super(props)
        
        this.totalPages = 0,
        this.page = 0,
        this.text = this.props.route.params.text,
        this.state = {
          films: [],
          isLoading: false
        }
      }
    _displayLoading() {
    if (this.state.isLoading) {
        return (
        <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
        </View>
        )
    }
    }

    componentDidMount() {
        this._searchFilms()
      }
    _loadFilms = () => {
        if (this.text.length > 0) {
          this.setState({ isLoading: true })
          getFilmsFromApiWithSearchedText(this.text, this.page+1).then(data => {
            this.page = data.page
            this.totalPages = data.total_pages
            this.setState({
                isLoading: false,
                films : [ ...this.films, ...data.results ]
            })
          })
        }
      }
    _searchFilms() {    
        this.films = []
        this._loadFilms()
    }
    render() {
        return ( 
            <ScrollView> 
                <Text>{this.page} {this.totalPages}</Text>         
                <FilmList  
                    films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages}
                    text={this.text} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                /> 
            </ScrollView>              
        )
    }
}

const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})
export default ResultFilms