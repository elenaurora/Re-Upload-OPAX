import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { appConfig } from '../config';

const Menu = ({commands, position}) => {

  const LOGTAG = "Menu";
  
  console.log(LOGTAG + ": commands=" + JSON.stringify(commands));

  const renderMenuItems = () => {

    const menuItems = [];

    for(let i = 0; i < commands.length; i++) {
        const command = commands[i];
        console.log(LOGTAG + ": adding command " + command.name);
        menuItems.push(
            <TouchableOpacity 
                style={styles.menuItemTouchable}
                onPress={command.callback}
                key={"menuItem-" + i}
            >
                <View style={styles.menuItemView}>
                <Image
                source={require('../assets/images/LOGO_APP.png')}  
                style={styles.menu_el_Icon}
            />
                    <Text style={styles.menuItemText}>  </Text>
                    <Text style={styles.menuItemText}>{command.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return menuItems;
  }

  return (
    <View style={[styles.container, { 
        position: 'absolute',
        top: position.top,
        right: position.right,
        zIndex: 999
        }]}>

        {renderMenuItems()}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: appConfig.backgroundColor_1,
    borderWidth: 1,
    borderColor: appConfig.fontColor_1
  },
  menuItemTouchable: {
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  menuItemView: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  menuItemText: {
    fontFamily: appConfig.fontFamily_1,
    color: appConfig.fontColor_1,
    fontSize: 30
  },
  
  menu_el_Icon: {
    width: 35,
    height: 35,
    left: 10,
    top: 5
  },
});

export default Menu;