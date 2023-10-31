import { useState } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator, RefreshControl } from 'react-native';
import { Header } from '../../components/Header';
import { InputAddTodo } from '../../components/InputAddTodo';
import { Infos } from '../../components/Infos';
import { EmptyList } from '../../components/EmptyList';
import { Cards } from '../../components/Cards';
import { useUserContext } from '../../context/useUserContext';
import { useQuery } from 'react-query';
import { getAllTodo } from '../../services/todos';

interface TodoProps {
  isCheked: boolean;
  name: string;
  id: number;
}

export function Home() {
  const { user } = useUserContext();

  const { isLoading, data, refetch } = useQuery('todos', async () => {
    const response = await getAllTodo(user.id);
    return response;
  })

  return (
    <View style={styles.container}>
      <Header />
      <InputAddTodo />
      <Infos count={data?.count} checked={data?.checked} />
      <FlatList
        style={styles.content}
        data={data?.todos} renderItem={(item) => <Cards {...item.item} />}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={() => <EmptyList />}
        refreshControl={<RefreshControl tintColor={'#4EA8DE'} refreshing={isLoading} onRefresh={refetch} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  content: {
    flex: 1,
    width: '94%',
    alignSelf: 'center',
    marginTop: 21
  }
});
