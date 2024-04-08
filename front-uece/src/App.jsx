import { useEffect, useState } from 'react';
import { Button, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import FormularioConta from './FormularioConta'; // Importe o componente FormularioConta aqui
import { ApiService } from './service';
import ContasList from './ContasList'; // Importe o componente ContasList aqui

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contas, setContas] = useState([]); // Adicione o estado para armazenar as contas
  const [contaParaEditar, setContaParaEditar] = useState(null); // Estado para armazenar a conta que será editada

  const apiService = new ApiService();

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setContaParaEditar(null); // Limpa a conta para edição ao fechar o modal
  };

  const handleEditClick = (conta) => {
    setContaParaEditar(conta); // Define a conta que será editada
    setIsModalOpen(true); // Abre o modal de edição
  };

  const handleDeleteClick = async (id) => {
    await apiService.deletarConta(id);
    initApi();
  }

  const handleMarkPaidClick = async (id) => {
    await apiService.marcarPago(id);
    initApi();
  }

  const initApi = async () => {
    const response = await apiService.listarContas();
    setContas(response); // Atualiza o estado das contas com os dados obtidos da API
    console.log(response);
  };

  useEffect(() => {
    initApi();
  }, []);

  return (
      <Box 
        bg="brand.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        flexDirection="column"
      >
        
        <Button onClick={handleButtonClick}>Criar um novo pagamento</Button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Formulário de Conta</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Passa a conta para edição como propriedade para o componente FormularioConta */}
              <FormularioConta idConta={contaParaEditar} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleCloseModal}>Fechar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* Renderiza o componente ContasList e passa as contas como propriedade */}
        <ContasList contas={contas} onEdit={handleEditClick} onDelete={handleDeleteClick} onMarkPaid={handleMarkPaidClick}/>
      </Box>
  );
}

export default App;
