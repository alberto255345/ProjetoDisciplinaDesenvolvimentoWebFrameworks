import React from 'react';
import {
  Box,
  Badge,
  Button,
  IconButton,
  Stack,
  Text,
  Flex,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';

const ContaItem = ({ conta, onDelete, onEdit, onMarkPaid }) => {
  const { id, nome, valor, vencimento, status, paymentDate } = conta;

  const vencimentoInfo = vencimento ? `Vencimento: ${vencimento}` : '';

  const getStatusBadge = () => {
    if (status === 'paga') {
      return <Badge colorScheme="green">Pago</Badge>;
    } else if (status === 'vencida') {
      return <Badge colorScheme="red">Vencida</Badge>;
    } else {
      return <Badge colorScheme="blue">A pagar</Badge>;
    }
  };

  const daysOverdue = () => {
    if (status === 'vencida') {
      const today = new Date();
      const vencimentoDate = new Date(vencimento);
      const diffTime = Math.abs(today - vencimentoDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Vencida há ${diffDays} dias`;
    } else if (status === 'paga' && paymentDate) {
      const today = new Date();
      const paymentDateObj = new Date(paymentDate);
      const diffTime = Math.abs(today - paymentDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Pago há ${diffDays} dias`;
    }
    return '';
  };
  

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Stack spacing={3}>
        <Flex justifyContent="space-between">
          <Text fontSize="xl">{nome}</Text>
          <Flex>
            <IconButton
              icon={<EditIcon />}
              colorScheme="blue"
              aria-label="Editar"
              onClick={() => onEdit(id)} // Chama onEdit passando o ID da conta como argumento
              mr={2}
            />
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              aria-label="Deletar"
              onClick={() => onDelete(id)}
              mr={2}
            />
            {status !== 'paga' && (
              <IconButton
                icon={<CheckIcon />}
                colorScheme="green"
                aria-label="Marcar como pago"
                onClick={() => onMarkPaid(id)}
              />
            )}
          </Flex>
        </Flex>
        <Text>{`Valor: R$ ${valor}`}</Text>
        <Text>{vencimentoInfo}</Text>
        <Text>{daysOverdue()}</Text>
        <Stack direction="row">{getStatusBadge()}</Stack>
      </Stack>
    </Box>
  );
};

export default ContaItem;
