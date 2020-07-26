import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Search from './Search'
import FilmDetail from './FilmDetail'
import FilmCast from './FilmCast'
import Acteur from './Acteur'
import ResultFilms from './ResultFilms'



const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
function TabNav() {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Recherche" component={Search} />
        <Stack.Screen name="ResultFilms" component={ResultFilms} />
        <Stack.Screen name="FilmDetail" component={FilmDetail} />
        <Stack.Screen name="FilmCast" component={FilmCast} />
        <Stack.Screen name="Acteur" component={Acteur} />
      </Stack.Navigator>
    );
  }

  export default TabNav