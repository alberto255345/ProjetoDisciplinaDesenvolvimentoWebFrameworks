import axios from 'axios';

export class ApiService {
    static formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Os meses começam do zero, então é necessário adicionar 1
        const year = date.getFullYear();

        // Adiciona um zero à esquerda se o dia ou mês for menor que 10
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        // Retorna a data formatada no formato "dd/mm/yyyy"
        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    async listarContas() {
        try {
            // Faça uma chamada para a API externa
            const response = await axios.get('http://localhost:8080/contas');
            // Manipule os dados conforme necessário
            const formattedData = response.data.map(item => {
                // Verifica se a conta está vencida, paga ou a pagar
                let status = 'a pagar';
                let paymentDate = item.data_pagamento;
                if (!paymentDate) {
                    // Se não houver data de pagamento, calcula os dias de atraso
                    status = item.vencimento && new Date(item.vencimento) < new Date() ? 'vencida' : 'a pagar';
                    paymentDate = null; // Define paymentDate como nulo para indicar que o pagamento ainda não foi feito
                } else {
                    status = 'paga';
                }
    
                return {
                    id: item.idContas, // Alteração para corresponder ao formato fornecido
                    nome: item.nome_conta, // Alteração para corresponder ao formato fornecido
                    valor: item.valor_conta, // Adicione mais manipulações conforme necessário
                    vencimento: ApiService.formatDate(item.vencimento), // Alteração para corresponder ao formato fornecido
                    status: status, // Adiciona o campo de status
                    paymentDate: paymentDate, // Alteração para corresponder ao formato fornecido
                    interestRatePerDay: item.taxaJurosPorDia // Alteração para corresponder ao formato fornecido
                };
            });
            return formattedData; // Retorna os dados manipulados
        } catch (error) {
            throw new Error('Falha ao buscar dados da API externa');
        }
    }
    

    async atualizarConta(idConta, dadosAtualizados) {
        try {
            // Convertendo as chaves do objeto para o formato desejado
            const dadosFormatados = {
                nome_conta: dadosAtualizados.nomeConta,
                data_pagamento: dadosAtualizados.dataPagamento,
                taxaJurosPorDia: dadosAtualizados.taxaJurosPorDia,
                valor_conta: dadosAtualizados.valorConta,
                vencimento: dadosAtualizados.vencimento
            };
    
            // Converte os dados atualizados em uma string JSON
            const dadosJSON = JSON.stringify(dadosFormatados);
    
            // Faça uma chamada para a API externa para atualizar os dados da conta
            await axios.put(`http://localhost:8080/contas/${idConta}`, dadosJSON, {
                headers: {
                    'Content-Type': 'application/json' // Define o cabeçalho Content-Type para indicar que os dados são JSON
                }
            });
        } catch (error) {
            throw new Error('Falha ao atualizar conta');
        }
    }
    
    
    async buscarConta(idConta) {
        try {
            // Faça uma chamada para a API externa para buscar os dados da conta pelo ID
            const response = await axios.get(`http://localhost:8080/contas/${idConta}`);
    
            // Manipule os dados conforme necessário
            const dadosConta = response.data;
    
            // Verifique se a conta está vencida, paga ou a pagar
            let status = 'a pagar';
            let paymentDate = dadosConta.data_pagamento;
            if (!paymentDate) {
                // Se não houver data de pagamento, calcula os dias de atraso
                status = dadosConta.vencimento && new Date(dadosConta.vencimento) < new Date() ? 'vencida' : 'a pagar';
                paymentDate = null; // Define paymentDate como nulo para indicar que o pagamento ainda não foi feito
            } else {
                status = 'paga';
            }
    
            // Formate os dados conforme necessário
            const contaFormatada = {
                id: dadosConta.idContas, // Alteração para corresponder ao formato fornecido
                nome: dadosConta.nome_conta, // Alteração para corresponder ao formato fornecido
                valor: dadosConta.valor_conta, // Adicione mais manipulações conforme necessário
                vencimento: dadosConta.vencimento, // Alteração para corresponder ao formato fornecido
                status: status, // Adiciona o campo de status
                paymentDate: paymentDate, // Alteração para corresponder ao formato fornecido
                interestRatePerDay: dadosConta.taxaJurosPorDia // Alteração para corresponder ao formato fornecido
            };
    
            return contaFormatada; // Retorna os dados formatados da conta
        } catch (error) {
            throw new Error('Falha ao buscar conta');
        }
    }

    async criarConta(novaConta) {
        try {
            // Convertendo as chaves do objeto para o formato desejado
            const dadosFormatados = {
                nome_conta: novaConta.nomeConta,
                data_pagamento: novaConta.dataPagamento,
                taxaJurosPorDia: novaConta.taxaJurosPorDia,
                valor_conta: novaConta.valorConta,
                vencimento: novaConta.vencimento
            };
    
            // Converte os dados da nova conta em uma string JSON
            const dadosJSON = JSON.stringify(dadosFormatados);
    
            // Faça uma chamada para a API externa para criar uma nova conta
            const response = await axios.post('http://localhost:8080/contas', dadosJSON, {
                headers: {
                    'Content-Type': 'application/json' // Define o cabeçalho Content-Type para indicar que os dados são JSON
                }
            });
    
            // Retorna os dados da nova conta criada
            return response.data;
        } catch (error) {
            throw new Error('Falha ao criar conta');
        }
    }
    

    async deletarConta(idConta) {
        try {
            // Faça uma chamada para a API externa para deletar a conta com o ID fornecido
            await axios.delete(`http://localhost:8080/contas/${idConta}`);
            
            // Se a exclusão for bem-sucedida, não há necessidade de retornar dados
            // Você pode apenas deixar o método finalizar sem um retorno explícito
        } catch (error) {
            throw new Error('Falha ao deletar conta');
        }
    }
        
    async marcarPago(idConta) {
        try {
            // Busca os dados da conta pelo ID
            const conta = await this.buscarConta(idConta);
    
            // Verifica se o status da conta não é 'pago'
            if (conta.status !== 'paga') {
                // Define a data de pagamento como a data atual
                const dataAtual = new Date();
                const ano = dataAtual.getFullYear();
                let mes = dataAtual.getMonth() + 1;
                let dia = dataAtual.getDate();
                // Adiciona um zero à esquerda se o mês ou o dia for menor que 10
                mes = mes < 10 ? `0${mes}` : mes;
                dia = dia < 10 ? `0${dia}` : dia;
                const dataPagamentoFormatada = `${ano}-${mes}-${dia}`;
                conta.data_pagamento = dataPagamentoFormatada;
            } else {
                // Define a data de pagamento como null
                conta.data_pagamento = null;
            }
    
            // Criando um objeto com os dados necessários para marcar a conta como paga
            const dadosAtualizados = {
                data_pagamento: conta.data_pagamento,
                taxaJurosPorDia: conta.interestRatePerDay,
                nome_conta: conta.nome,
                valor_conta: conta.valor,
                vencimento: conta.vencimento
            };
    
            // Faça uma chamada para a API externa para atualizar os dados da conta
            await axios.put(`http://localhost:8080/contas/${idConta}`, dadosAtualizados, {
                headers: {
                    'Content-Type': 'application/json' // Define o cabeçalho Content-Type para indicar que os dados são JSON
                }
            });
        } catch (error) {
            throw new Error('Falha ao marcar conta como paga');
        }
    }
    
    
    
}
