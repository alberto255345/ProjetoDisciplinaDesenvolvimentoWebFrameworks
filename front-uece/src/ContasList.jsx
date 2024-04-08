import React from 'react';
import { Container } from '@chakra-ui/react';
import ContaItem from './ContaItem';

const ContasList = ({ contas, onEdit, onDelete, onMarkPaid }) => { // Adicione onEdit como uma propriedade
  return (
    <Container maxW="container.lg">
      {contas.map((conta, index) => (
        <ContaItem
          key={index}
          conta={conta}
          onEdit={onEdit} // Passe a função onEdit para o componente ContaItem
          onDelete={onDelete} 
          onMarkPaid={onMarkPaid} 
        />
      ))}
    </Container>
  );
};

export default ContasList;
