import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Product, removeCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';

const CartScreen = ({ navigation }:any) => {
  const dispatch = useDispatch();
  const cart = useSelector((state:any)=> state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);

  // Function to handle remove, increment, and decrement
  const handleAction = (productId: number, actionType: 'increment' | 'decrement' | 'remove') => {
    if (actionType === 'remove') {
      Alert.alert(
        'Confirm Remove',
        'Are you sure you want to remove this item from the cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Remove',
            onPress: () => dispatch(removeCart(productId)),
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    } else if (actionType === 'increment') {
      dispatch(incrementQuantity(productId));
    } else if (actionType === 'decrement') {
      dispatch(decrementQuantity(productId));
    }
  };

  const renderCartItem = ({ item }: { item: Product }) => (
    <View style={styles.cartItem} key={item.id}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text>{item.name}</Text>
        <Text>Quantity: {item.quantity}</Text>
        <Text>Rs{item.price}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleAction(item.id, 'increment')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleAction(item.id, 'decrement')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleAction(item.id, 'remove')}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart List</Text>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      <Text style={styles.total}>Total: Rs{total}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Product')}>
        <Text style={styles.buttonText}>Back to Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#7b3db6',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#d79ddf',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#d9534f', // Red color for delete button
  },
  total: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    backgroundColor: '#d79ddf',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default CartScreen;
