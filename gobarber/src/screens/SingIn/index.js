import React, { useRef } from 'react';
import { Image } from 'react-native';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignText,
} from './styles';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

export default function SingIn({ navigation }) {
    const passwordRef = useRef();

    function handleSubmit() {}

    return (
        <Background>
            <Container>
                <Image source={logo} />
                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyBoardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            passwordRef.current.focus();
                        }}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />
                </Form>
                <SubmitButton onPress={() => {}}>Acessar</SubmitButton>

                <SignLink onPress={() => navigation.navigate('SingUp')}>
                    <SignText>Criar conta </SignText>
                </SignLink>
            </Container>
        </Background>
    );
}
