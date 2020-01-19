import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container } from './styles';

import Background from '~/components/Background';
import DateTimeInput from '~/components/DateTimeInput';

export default function SelectDateTime() {
    const [date, setDate] = useState(new Date());

    return (
        <Background>
            <Container>
                <DateTimeInput date={date} onChange={setDate} />
            </Container>
        </Background>
    );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
    title: 'Data do agendamento',
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
    ),
});
