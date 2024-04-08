import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import customTheme from "./styles/theme";
import { ApiService } from './service';
import PropTypes from 'prop-types';

const FormularioConta = ({ idConta }) => {
  const [nomeConta, setNomeConta] = useState('');
  const [dataPagamento, setDataPagamento] = useState('');
  const [taxaJurosPorDia, setTaxaJurosPorDia] = useState('');
  const [valorConta, setValorConta] = useState('');
  const [vencimento, setVencimento] = useState('');

  const apiService = new ApiService();

  const handleTaxaJurosChange = (e) => {
    let value = e.target.value;
    // Remove qualquer caractere não numérico
    value = value.replace(/[^\d.]/g, '');

    // Converte o valor para um número
    let numericValue = parseFloat(value).toFixed(2);

    // Verifica se o valor está dentro do intervalo permitido (0 a 100)
    numericValue = Math.min(Math.max(0, numericValue), 100);

    // Atualiza o estado
    setTaxaJurosPorDia(numericValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aqui você pode lidar com o envio do formulário, como enviar os dados para o backend
    const dadosAtualizados = {
        nomeConta,
        dataPagamento,
        taxaJurosPorDia,
        valorConta,
        vencimento,
    };
    try {
        if (idConta) {
            await apiService.atualizarConta(idConta, dadosAtualizados);
        } else {
            await apiService.criarConta(dadosAtualizados);
        }
        console.log('Conta atualizada com sucesso!');
        // Recarrega a página após o sucesso do envio do formulário
        window.location.reload();
    } catch (error) {
        console.error('Erro ao atualizar conta:', error);
    }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const conta = await apiService.buscarConta(idConta);
        setNomeConta(conta.nome);
        setDataPagamento(conta.paymentDate);
        setTaxaJurosPorDia(conta.interestRatePerDay);
        setValorConta(conta.valor);
        setVencimento(conta.vencimento);
      } catch (error) {
        console.error('Erro ao buscar dados da conta:', error);
      }
    };

    if (idConta) {
      fetchData();
    }
    console.log("passou");
  }, [idConta]);

  return (
    <ChakraProvider theme={customTheme}>
      <Box width="400px" margin="auto" marginTop="50px">
        <form onSubmit={handleSubmit}>
          <FormControl id="nomeConta" marginBottom="20px">
            <FormLabel>Nome da Conta</FormLabel>
            <Input
              type="text"
              value={nomeConta}
              onChange={(e) => setNomeConta(e.target.value)}
            />
          </FormControl>
          <FormControl id="dataPagamento" marginBottom="20px">
            <FormLabel>Data de Pagamento</FormLabel>
            <Input
              type="date"
              value={dataPagamento}
              onChange={(e) => setDataPagamento(e.target.value)}
            />
          </FormControl>
          <FormControl id="taxaJurosPorDia" marginBottom="20px">
            <FormLabel>Taxa de Juros por Dia</FormLabel>
            <Input
              type="number"
              value={taxaJurosPorDia}
              onChange={handleTaxaJurosChange}
            />
          </FormControl>
          <FormControl id="valorConta" marginBottom="20px">
            <FormLabel>Valor da Conta</FormLabel>
            <Input
              type="number"
              value={valorConta}
              onChange={(e) => setValorConta(e.target.value)}
            />
          </FormControl>
          <FormControl id="vencimento" marginBottom="20px">
            <FormLabel>Vencimento</FormLabel>
            <Input
              type="date"
              value={vencimento}
              onChange={(e) => setVencimento(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">Enviar</Button>
        </form>
      </Box>
    </ChakraProvider>
  );
}

FormularioConta.propTypes = {
  idConta: PropTypes.string,
};

export default FormularioConta;
