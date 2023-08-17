import {Text, Alert} from 'react-native';
import React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';


const PostMenu = () => {
  const onDeleteOptionPressed = () => {};
  const onEditOptionPressed = () => {};
  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.threeDots}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>
      <MenuOptions customStyles={{optionText: styles.optionText}}>
        <MenuOption text='Report' onSelect={() => Alert.alert(`Reporting`)} />
        <MenuOption text='Delete' onSelect={onDeleteOptionPressed} customStyles={{optionText: styles.optionDelete}}/>
        <MenuOption onSelect={onEditOptionPressed} text="Edit"/>
      </MenuOptions>
    </Menu>
  );
};

export default PostMenu;

