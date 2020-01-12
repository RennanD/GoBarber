import React from 'react';
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

export default function SingIn() {
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
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                    />
                </Form>
                <SubmitButton onPress={() => {}}>Acessar</SubmitButton>

                <SignLink onPress={() => {}}>
                    <SignText>Criar conta </SignText>
                </SignLink>
            </Container>
        </Background>
    );
}
