package com.example.contas.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ContasRecordDto(
        String nome_conta,
        LocalDate data_pagamento,
        Double taxaJurosPorDia, // Troque @NotBlank por @NotNull
        BigDecimal valor_conta,
        LocalDate vencimento) {
}
