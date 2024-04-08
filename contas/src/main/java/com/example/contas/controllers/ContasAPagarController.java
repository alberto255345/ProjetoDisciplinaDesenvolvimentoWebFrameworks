package com.example.contas.controllers;

import com.example.contas.dtos.ContasRecordDto;
import com.example.contas.models.ContasAPagarModel;
import com.example.contas.models.ContasAPagarModel;
import com.example.contas.repositories.ContasRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class ContasAPagarController {

    @Autowired
    ContasRepository ContasRepository;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/contas")
    public ResponseEntity<List<ContasAPagarModel>> getAllContas(){
        return ResponseEntity.status(HttpStatus.OK).body(ContasRepository.findAll());
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/contas/{id}")
    public ResponseEntity<Object> getOneContas(@PathVariable(value="id") UUID id){
        Optional<ContasAPagarModel> ContasO = ContasRepository.findById(id);
        if(ContasO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contas not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(ContasO.get());
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/contas")
    public ResponseEntity<ContasAPagarModel> saveContas(@RequestBody @Valid ContasRecordDto ContasRecordDto) {
        var ContasAPagarModel = new ContasAPagarModel();

        // Verifica se taxaJurosPorDia não é nulo antes de copiar
        if (ContasRecordDto.taxaJurosPorDia() != null) {
            ContasAPagarModel.setTaxaJurosPorDia(ContasRecordDto.taxaJurosPorDia());
        }

        // Copia as demais propriedades
        BeanUtils.copyProperties(ContasRecordDto, ContasAPagarModel);

        return ResponseEntity.status(HttpStatus.CREATED).body(ContasRepository.save(ContasAPagarModel));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/contas/{id}")
    public ResponseEntity<Object> deleteContas(@PathVariable(value="id") UUID id) {
        Optional<ContasAPagarModel> ContasO = ContasRepository.findById(id);
        if(ContasO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contas not found.");
        }
        ContasRepository.delete(ContasO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Contas deleted successfully.");
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/contas/{id}")
    public ResponseEntity<Object> updateContas(@PathVariable(value="id") UUID id,
                                               @RequestBody @Valid ContasRecordDto ContasRecordDto) {
        Optional<ContasAPagarModel> ContasO = ContasRepository.findById(id);
        if(ContasO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contas not found.");
        }
        var ContasAPagarModel = ContasO.get();

        // Verifica se taxaJurosPorDia não é nulo antes de copiar
        if (ContasRecordDto.taxaJurosPorDia() != null) {
            ContasAPagarModel.setTaxaJurosPorDia(ContasRecordDto.taxaJurosPorDia());
        }

        // Copia as demais propriedades
        BeanUtils.copyProperties(ContasRecordDto, ContasAPagarModel);

        return ResponseEntity.status(HttpStatus.OK).body(ContasRepository.save(ContasAPagarModel));
    }

}
