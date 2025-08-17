
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const login = async () => {
    if (!username) return;
    await AsyncStorage.setItem('user', username);
    navigation.replace('Home');
  };
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding:24 }}>
      <Text style={{ fontSize:24, marginBottom:12 }}>Tuma Login</Text>
      <TextInput placeholder="Enter username" value={username} onChangeText={setUsername}
        style={{ borderWidth:1, padding:10, margin:10, width:'100%', maxWidth:360 }} />
      <Button title="Login" onPress={login} />
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('user');
      setName(user || '');
    })();
  }, []);
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', gap:12 }}>
      <Text style={{ fontSize:24 }}>Welcome, {name}</Text>
      <Button title="Send Money" onPress={() => navigation.navigate('SendMoney')} />
      <Button title="Transactions" onPress={() => navigation.navigate('Transactions')} />
    </View>
  );
}

function SendMoneyScreen({ navigation }) {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const send = async () => {
    if (!receiver || !amount) return;
    let txs = JSON.parse(await AsyncStorage.getItem('transactions')) || [];
    const newTx = { id: Date.now(), receiver, amount, status:'sent' };
    txs.unshift(newTx);
    await AsyncStorage.setItem('transactions', JSON.stringify(txs));
    navigation.navigate('Transactions');
  };
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding:24 }}>
      <Text style={{ fontSize:20, marginBottom:8 }}>Send Money</Text>
      <TextInput placeholder="Receiver" value={receiver} onChangeText={setReceiver}
        style={{ borderWidth:1, padding:10, margin:10, width:'100%', maxWidth:360 }} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount}
        style={{ borderWidth:1, padding:10, margin:10, width:'100%', maxWidth:360 }} keyboardType="numeric" />
      <Button title="Send" onPress={send} />
    </View>
  );
}

function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const load = async () => {
      const txs = JSON.parse(await AsyncStorage.getItem('transactions')) || [];
      setTransactions(txs);
    };
    load();
    const id = setInterval(load, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:20, marginBottom:10 }}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ paddingVertical:6 }}>{item.receiver}  —  ${item.amount}  —  {item.status}</Text>
        )}
        ListEmptyComponent={<Text>No transactions yet</Text>}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
