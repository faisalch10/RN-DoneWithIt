import { useState } from 'react';
import { FlatList } from 'react-native';

import Screen from '../components/Screen';
import ListItem from '../components/lists/ListItem';
import ListItemSeperator from '../components/lists/ListIemSeperator';
import ListItemDeleteAction from '../components/lists/ListItemDeleteAction';
import AppText from '../components/AppText';

const MessagesList = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: 'Mosh Hamedani',
      description: 'Hey! is this item still available?',
      image: require('../assets/mosh.jpg'),
    },
    {
      id: 2,
      title: 'Faisal Chaudhry',
      description:
        "I'm intrested in this item. When will you be able to post it?",
      image: require('../assets/mosh.jpg'),
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = message => {
    const newMessages = messages.filter(m => m.id !== message.id);
    setMessages(newMessages);
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={msg => msg.id.toString()}
        renderItem={({ item, index, separators }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log('Message selected', item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={() => <ListItemSeperator />}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);

          setTimeout(() => {
            setMessages([
              ...messages,
              {
                id: 3,
                title: 'T3',
                description: 'D3',
                image: require('../assets/mosh.jpg'),
              },
            ]);

            setRefreshing(false);
          }, 5000);
        }}
      />
    </Screen>
  );
};

export default MessagesList;
