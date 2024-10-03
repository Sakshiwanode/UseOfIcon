import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, Product} from '../redux/cartSlice';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigation/DrawerNavigator';
import {RootState} from '../redux/store';

// Product List array
const products: Omit<Product, 'quantity'>[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    image: require('../assets/product_image.png'),
  },
  {
    id: 2,
    name: 'Product 2',
    price: 150,
    image: require('../assets/product_image.png'),
  },
  {
    id: 3,
    name: 'Product 3',
    price: 100,
    image: require('../assets/product_image.png'),
  },
];

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const cart = useSelector((state: RootState) => state.cart.items);

  const handleAddToCart = (product: Omit<Product, 'quantity'>) => {
    dispatch(addToCart({...product, quantity: 1}));
    Alert.alert('Success', `${product.name} added to cart!`);
  };

  const isProductInCart = (productId: number) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === productId) {
        return true;
      }
    }
    return false;
  };

  const renderProductItem = ({item}: {item: Omit<Product, 'quantity'>}) => {
    const isAdded = isProductInCart(item.id);

    return (
      <View style={styles.productBox}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.imageName}>{item.name}</Text>
        <Text style={styles.price}>Rs {item.price}</Text>
        <TouchableOpacity
          style={[styles.button, isAdded && styles.buttonDisabled]}
          onPress={() => handleAddToCart(item)}
          disabled={isAdded}>
          <Text style={styles.buttonText}>
            {isAdded ? 'Added to Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product List</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.buttonText}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#7b3db6',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  productBox: {
    borderWidth: 3,
    borderColor: '#d0a7e7',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#ecf2f3',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  imageName: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  price: {
    color: 'black',
  },
  list: {
    flex: 1,
  },
  button: {
    backgroundColor: '#d79ddf',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a9a9a9',
  },
  cartButton: {
    backgroundColor: '#d79ddf',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default ProfileScreen;
