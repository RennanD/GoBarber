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

export default function SingUp({ navigation }) {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit() {}

    return (
        <Background>
            <Container>
                <Image source={logo} />
                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        placeholder="Digite seu nome"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            emailRef.current.focus();
                        }}
                    />
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
                        ref={emailRef}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        ref={passwordRef}
                    />
                </Form>
                <SubmitButton onPress={() => {}}>Cadastrar-se</SubmitButton>

                <SignLink onPress={() => navigation.navigate('SingIn')}>
                    <SignText>Já tenho login</SignText>
                </SignLink>
            </Container>
        </Background>
    );
}
